import { createStore } from "vuex";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut, updateProfile,
} from "@firebase/auth";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { auth, firestore, functions } from "../firebase/index.js";
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";

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
    moviesPreferences: new Set(),
    gamesPreferences: new Set(),
    musicPreferences: new Set(),
    booksPreferences: new Set(),
    moviesData: new Map(),
    gamesData: new Map(),
    musicData: new Map(),
    booksData: new Map(),
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
    setMoviesPreferences(state, payload) {
      state.moviesPreferences = payload;
    },
    setGamesPreferences(state, payload) {
      state.gamesPreferences = payload;
    },
    setMusicPreferences(state, payload) {
      state.musicPreferences = payload;
    },
    setBooksPreferences(state, payload) {
      state.booksPreferences = payload;
    },
    setMoviesData(state, payload) {
      state.moviesData = payload;
    },
    setGamesData(state, payload) {
      state.gamesData = payload;
    },
    setMusicData(state, payload) {
      state.musicData = payload;
    },
    setBooksData(state, payload) {
      state.booksData = payload;
    }
  },
  actions: {
    async register(context, { displayName, email, password, plan }) {
      try {
        const storage = getStorage();
        const photoURL = await getDownloadURL(storageRef(storage, 'site/avatars/1.png'));
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const registerUser = httpsCallable(functions, "registerUser")({ plan });
        const updateUserProfile = store.dispatch("updateUserProfile", { user, displayName, photoURL });
        const promises = await Promise.all([registerUser, updateUserProfile]);
        const userData = promises[0].data;
        context.commit("setUser", user);
        context.commit("setEmail", user.email);
        context.commit("setPlan", userData.plan);
        context.commit("setMoviesQuota", userData.moviesQuota);
        context.commit("setGamesQuota", userData.gamesQuota);
        context.commit("setMusicQuota", userData.musicQuota);
        context.commit("setBooksQuota", userData.booksQuota);
        context.commit("setMoviesPreferences", userData.moviesPreferences);
        context.commit("setGamesPreferences", userData.gamesPreferences);
        context.commit("setMusicPreferences", userData.musicPreferences);
        context.commit("setBooksPreferences", userData.booksPreferences);
        store.dispatch("getMoviesData");
        store.dispatch("getGamesData");
        store.dispatch("getMusicData");
        store.dispatch("getBooksData");
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async login(context, { email, password }) {
      try {
        let token = await signInWithEmailAndPassword(auth, email, password);
        context.commit("setUser", token.user);
        store.dispatch("getMoviesData");
        store.dispatch("getGamesData");
        store.dispatch("getMusicData");
        store.dispatch("getBooksData");
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
      context.commit("setDisplayName", user.displayName);
      context.commit("setPhotoURL", user.photoURL);
    },
    async getMoviesData(context) {
      const categoryGenres = await getDocs(collection(firestore, "Movies"));
      categoryGenres.forEach(async (genre) => {
        context.state.moviesData.set(genre.data().genre, []);
        const recordsByGenre = await getDocs(collection(firestore, `Movies/${genre.id}/Records`));
        recordsByGenre.forEach((record) => {
          context.state.moviesData.get(genre.data().genre).push(record.data());
        });
      });
    },
    async getGamesData(context) {
      const categoryGenres = await getDocs(collection(firestore, "Games"));
      categoryGenres.forEach(async (genre) => {
        context.state.gamesData.set(genre.data().genre, []);
        const recordsByGenre = await getDocs(collection(firestore, `Games/${genre.id}/Records`));
        recordsByGenre.forEach((record) => {
          context.state.gamesData.get(genre.data().genre).push(record.data());
        });
      });
    },
    async getMusicData(context) {
      const categoryGenres = await getDocs(collection(firestore, "Music"));
      categoryGenres.forEach(async (genre) => {
        context.state.musicData.set(genre.data().genre, []);
        const recordsByGenre = await getDocs(collection(firestore, `Music/${genre.id}/Records`));
        recordsByGenre.forEach((record) => {
          context.state.musicData.get(genre.data().genre).push(record.data());
        });
      });
    },
    async getBooksData(context) {
      const categoryGenres = await getDocs(collection(firestore, "Books"));
      categoryGenres.forEach(async (genre) => {
        context.state.booksData.set(genre.data().genre, []);
        const recordsByGenre = await getDocs(collection(firestore, `Books/${genre.id}/Records`));
        recordsByGenre.forEach((record) => {
          context.state.booksData.get(genre.data(0).genre).push(record.data());
        });
      });
    },
  },
});

// Verify user login state upon page reload (refresh)
export const userAuthorized = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
        const userData = (await getDoc(doc(firestore, "Users", user.email))).data();
        store.commit("setUser", user);
        store.commit("setDisplayName", user.displayName);
        store.commit("setEmail", user.email);
        store.commit("setPhotoURL", user.photoURL);
        store.commit("setPlan", userData.plan);
        store.commit("setMoviesQuota", userData.moviesQuota);
        store.commit("setGamesQuota", userData.gamesQuota);
        store.commit("setMusicQuota", userData.musicQuota);
        store.commit("setBooksQuota", userData.booksQuota);
        store.commit("setMoviesPreferences", userData.moviesPreferences);
        store.commit("setGamesPreferences", userData.gamesPreferences);
        store.commit("setMusicPreferences", userData.musicPreferences);
        store.commit("setBooksPreferences", userData.booksPreferences);
        store.dispatch("getMoviesData");
        store.dispatch("getGamesData");
        store.dispatch("getMusicData");
        store.dispatch("getBooksData");
        console.log(user);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  })();
});

export default store;
