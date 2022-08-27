import { createStore } from "vuex";
import {
  createUserWithEmailAndPassword, getIdToken,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut, updateProfile,
} from "@firebase/auth";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/index.js";
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import axios from "axios";

const store = createStore({
  state: {
    user: null,
    plan: "",
    movieQuota: 0,
    gameQuota: 0,
    musicQuota: 0,
    bookQuota: 0,
    moviePreferences: new Set(),
    gamePreferences: new Set(),
    musicPreferences: new Set(),
    bookPreferences: new Set(),
    categoryRecords: new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]),
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
    async register({commit, dispatch}, { displayName, email, password, plan }) {
      try {
        const storage = getStorage();
        const photoURL = await getDownloadURL(storageRef(storage, 'site/avatars/1.png'));
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const userAccountData = axios.post("http://localhost:5000/api/v1/user/account/register-user", { plan }, { headers: { Authorization: "Bearer " + await getIdToken(user) } });
        const updateUserProfile = dispatch("updateUserProfile", { user, displayName, photoURL });
        await Promise.all([userAccountData, updateUserProfile]);
        commit("setUser", user);
        await dispatch("getCategoryRecords");
        dispatch("getUserData");
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async login({ commit, dispatch }, { email, password }) {
      try {
        let token = await signInWithEmailAndPassword(auth, email, password);
        commit("setUser", token.user);
        await dispatch("getCategoryRecords");
        dispatch("getUserData");
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async logout({ commit }) {
      try {
        signOut(auth);
        commit("setUser", null);
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
    async getUserData({ commit, state }) {
      const userData = (await getDoc(doc(firestore, "users", state.user.email))).data();
      commit("setPlan", userData.plan);
      commit("setMovieQuota", userData.movieQuota);
      commit("setGameQuota", userData.gameQuota);
      commit("setMusicQuota", userData.musicQuota);
      commit("setBookQuota", userData.bookQuota);
      commit("setMoviePreferences", new Set(userData.moviePreferences));
      commit("setGamePreferences", new Set(userData.gamePreferences));
      commit("setMusicPreferences", new Set(userData.musicPreferences));
      commit("setBookPreferences", new Set(userData.bookPreferences));
    },
    async getCategoryRecords({ state }) {
      state.categoryRecords.forEach(async (categoryRecords, category) => {
        const categoryGenres = await getDocs(collection(firestore, category));
        categoryGenres.forEach(async (categoryGenre) => {
          categoryRecords.set(categoryGenre.data().genre, []);
          const recordsByGenre = await getDocs(collection(firestore, `${category}/${categoryGenre.id}/records`));
          recordsByGenre.forEach((record) => {
            categoryRecords.get(categoryGenre.data().genre).push(record.data());
          });
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
        await store.dispatch("getCategoryRecords");
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
