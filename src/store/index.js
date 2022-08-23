import { createStore } from "vuex";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut, updateProfile,
} from "@firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { auth, firestore, functions } from "../firebase/index.js";

const store = createStore({
  state: {
    user: null,
    displayName: "",
    email: "",
    photoURL: "",
    plan: "",
    moviesQuota: 0,
    gamesQuote: 0,
    musicQuota: 0,
    booksQuota: 0,
    moviesData: [],
    gamesData: [],
    musicData: [],
    booksData: [],
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setDisplayName(state, payload) {
      state.displayName = payload;
    },
    setEmail(state, payload) {
      state.email = payload;
    },
    setPhotoURL(state, payload) {
      state.photoURL = payload;
    },
    setPlan(state, payload) {
      state.plan = payload;
    },
    setMoviesQuota(state, payload) {
      state.moviesQuota = payload;
    },
    setGamesQuota(state, payload) {
      state.gamesQuota = payload;
    },
    setMusicQuota(state, payload) {
      state.musicQuota = payload;
    },
    setBooksQuota(state, payload) {
      state.booksQuota = payload;
    },
    setMoviesData(state, payload) {
      state.moviesData.push(payload);
    },
    setGamesData(state, payload) {
      state.gamesData.push(payload);
    },
    setMusicData(state, payload) {
      state.musicData.push(payload);
    },
    setBooksData(state, payload) {
      state.booksData.push(payload);
    }
  },
  actions: {
    async register(context, { displayName, email, password, plan }) {
      try {
        let { user } = await createUserWithEmailAndPassword(auth, email, password);
        let registerUser = httpsCallable(functions, "registerUser")({ plan });
        let updateUserProfile = store.dispatch("updateUserProfile", { user, displayName, photoURL: "../assets/img/avatars/1.png" });
        let promises = await Promise.all([registerUser, updateUserProfile]);
        let userData = promises[0].data;
        context.commit("setUser", user)
        context.commit("setDisplayName", user.displayName);
        context.commit("setEmail", user.email);
        context.commit("setPhotoURL", user.photoURL);
        context.commit("setPlan", userData.plan);
        context.commit("setMoviesQuota", userData.moviesQuota);
        context.commit("setGamesQuota", userData.gamesQuota);
        context.commit("setMusicQuota", userData.musicQuota);
        context.commit("setBooksQuota", userData.booksQuota);
        store.dispatch("getData");
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async login(context, { email, password }) {
      try {
        let token = await signInWithEmailAndPassword(auth, email, password);
        context.commit("setUser", token.user);
        store.dispatch("getData");
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async logout(context) {
      try {
        signOut(auth);
        context.commit("setUser", null);
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async updateUserProfile(context, { user, displayName, photoURL }) {
      await updateProfile(user, {
        displayName,
        photoURL,
      });
    },
    async getData(context) {
      const categories = ["Movies", "Games", "Music", "Books"];

      categories.forEach(async (category) => {
        const categoryGenres = await getDocs(collection(firestore, category));
        categoryGenres.forEach(async (genre) => {
          const categoryGenre = [];
          const recordsByGenre = await getDocs(collection(firestore, `${category}/${genre.id}/Records`));
          recordsByGenre.forEach((record) => {
            categoryGenre.push(record.data());
          })
          context.commit(`set${category}Data`, categoryGenre);
        });
      });
    }
  },
});

// Verify user login state upon page reload (refresh)
export const userAuthorized = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
        store.commit("setUser", user);
        store.commit("setDisplayName", user.displayName);
        store.commit("setEmail", user.email);
        store.commit("setPhotoURL", user.photoURL);
        let userData = await getDocs(query(collection(firestore, "Users"), where("email", "==", user.email)));
        userData.forEach((data) => {
          store.commit("setPlan", data.plan);
          store.commit("setMoviesQuota", data.moviesQuota);
          store.commit("setGamesQuota", data.gamesQuota);
          store.commit("setMusicQuota", data.musicQuota);
          store.commit("setBooksQuota", data.booksQuota);
        });
        store.dispatch("getData");
        console.log(user);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  })();
});

export default store;
