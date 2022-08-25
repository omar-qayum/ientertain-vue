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
    movieQuota: 0,
    gameQuote: 0,
    musicQuota: 0,
    bookQuota: 0,
    moviePreferences: new Set(),
    gamePreferences: new Set(),
    musicPreferences: new Set(),
    bookPreferences: new Set(),
    movieRecords: new Map(),
    gameRecords: new Map(),
    musicRecords: new Map(),
    bookRecords: new Map(),
  },
  getters: {
    getMoviePreferences(state) {
      return new Map(
        Array.from(state.movieRecords).filter(([key]) => {
          if (state.moviePreferences.has(key)) {
            return true;
          }
          return false;
        }),
      );
    },
    getGamePreferences(state) {
      return new Map(
        Array.from(state.gameRecords).filter(([key]) => {
          if (state.gamePreferences.has(key)) {
            return true;
          }
          return false;
        }),
      );
    },
    getMusicPreferences(state) {
      return new Map(
        Array.from(state.musicRecords).filter(([key]) => {
          if (state.musicPreferences.has(key)) {
            return true;
          }
          return false;
        }),
      );
    }, 
    getBookPreferences(state) {
      return new Map(
        Array.from(state.bookRecords).filter(([key]) => {
          if (state.bookPreferences.has(key)) {
            return true;
          }
          return false;
        }),
      );
    }
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
    setMovieQuota(state, payload) {
      state.movieQuota = payload;
    },
    setGameQuota(state, payload) {
      state.gameQuota = payload;
    },
    setMusicQuota(state, payload) {
      state.musicQuota = payload;
    },
    setBookQuota(state, payload) {
      state.bookQuota = payload;
    },
    setMoviePreferences(state, payload) {
      state.moviePreferences = payload;
    },
    setGamePreferences(state, payload) {
      state.gamePreferences = payload;
    },
    setMusicPreferences(state, payload) {
      state.musicPreferences = payload;
    },
    setBookPreferences(state, payload) {
      state.bookPreferences = payload;
    },
    setMovieRecords(state, payload) {
      state.movieRecords = payload;
    },
    setGameRecords(state, payload) {
      state.gameRecords = payload;
    },
    setMusicRecords(state, payload) {
      state.musicRecords = payload;
    },
    setBookRecords(state, payload) {
      state.bookRecords = payload;
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
        await Promise.all([registerUser, updateUserProfile]);
        context.commit("setUser", user);
        context.commit("setEmail", user.email);
        await Promise.all([store.dispatch("getMovieRecords"), store.dispatch("getGameRecords"), store.dispatch("getMusicRecords"), store.dispatch("getBookRecords")]);
        store.dispatch("getUserData");
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async login(context, { email, password }) {
      try {
        let token = await signInWithEmailAndPassword(auth, email, password);
        context.commit("setUser", token.user);
        await Promise.all([store.dispatch("getMovieRecords"), store.dispatch("getGameRecords"), store.dispatch("getMusicRecords"), store.dispatch("getBookRecords")]);
        store.dispatch("getUserData");
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
    async getUserData(context) {
      const userData = (await getDoc(doc(firestore, "Users", context.state.email))).data();
      store.commit("setPlan", userData.plan);
      store.commit("setMovieQuota", userData.movieQuota);
      store.commit("setGameQuota", userData.gameQuota);
      store.commit("setMusicQuota", userData.musicQuota);
      store.commit("setBookQuota", userData.bookQuota);
      store.commit("setMoviePreferences", new Set(userData.moviePreferences));
      store.commit("setGamePreferences", new Set(userData.gamePreferences));
      store.commit("setMusicPreferences", new Set(userData.musicPreferences));
      store.commit("setBookPreferences", new Set(userData.bookPreferences));
    },
    async getMovieRecords(context) {
      const categoryGenres = await getDocs(collection(firestore, "Movies"));
      categoryGenres.forEach(async (genre) => {
        context.state.movieRecords.set(genre.data().genre, []);
        const recordsByGenre = await getDocs(collection(firestore, `Movies/${genre.id}/Records`));
        recordsByGenre.forEach((record) => {
          context.state.movieRecords.get(genre.data().genre).push(record.data());
        });
      });
    },
    async getGameRecords(context) {
      const categoryGenres = await getDocs(collection(firestore, "Games"));
      categoryGenres.forEach(async (genre) => {
        context.state.gameRecords.set(genre.data().genre, []);
        const recordsByGenre = await getDocs(collection(firestore, `Games/${genre.id}/Records`));
        recordsByGenre.forEach((record) => {
          context.state.gameRecords.get(genre.data().genre).push(record.data());
        });
      });
    },
    async getMusicRecords(context) {
      const categoryGenres = await getDocs(collection(firestore, "Music"));
      categoryGenres.forEach(async (genre) => {
        context.state.musicRecords.set(genre.data().genre, []);
        const recordsByGenre = await getDocs(collection(firestore, `Music/${genre.id}/Records`));
        recordsByGenre.forEach((record) => {
          context.state.musicRecords.get(genre.data().genre).push(record.data());
        });
      });
    },
    async getBookRecords(context) {
      const categoryGenres = await getDocs(collection(firestore, "Books"));
      categoryGenres.forEach(async (genre) => {
        context.state.bookRecords.set(genre.data().genre, []);
        const recordsByGenre = await getDocs(collection(firestore, `Books/${genre.id}/Records`));
        recordsByGenre.forEach((record) => {
          context.state.bookRecords.get(genre.data(0).genre).push(record.data());
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
        store.commit("setUser", user);
        store.commit("setDisplayName", user.displayName);
        store.commit("setEmail", user.email);
        store.commit("setPhotoURL", user.photoURL);
        await Promise.all([store.dispatch("getMovieRecords"), store.dispatch("getGameRecords"), store.dispatch("getMusicRecords"), store.dispatch("getBookRecords")]);
        store.dispatch("getUserData");
        console.log(user);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  })();
});

export default store;
