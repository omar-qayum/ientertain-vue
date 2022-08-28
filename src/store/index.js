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
    categoryPreferences: new Map([["books", new Set()], ["games", new Set()], ["movies", new Set()], ["music", new Set()]]),
    categoryRecords: new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]),
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
    setCategoryPreferences(state, payload) {
      Object.entries(payload).forEach(([category, preference]) => {
        state.categoryPreferences.set(category, new Set(preference));
      });
    },
    setCategoryRecords(state, payload) {
      Object.entries(payload).forEach(([category, records]) => {
        state.categoryRecords.set(category, new Map(records));
      });
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
    async register({ commit, dispatch }, { displayName, email, password, plan }) {
      try {
        const storage = getStorage();
        const photoURL = await getDownloadURL(storageRef(storage, 'site/avatars/1.png'));
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const userAccountData = axios.post("http://localhost:5000/api/v1/user/account/register-user", { plan }, { headers: { Authorization: "Bearer " + await getIdToken(user) } });
        const updateUserProfile = dispatch("updateUserProfile", { user, displayName, photoURL });
        await Promise.all([userAccountData, updateUserProfile]);
        commit("setUser", user);
        await dispatch("getUserData", user);
        await dispatch("getCategoryRecords", ["books", "games", "movies", "music"]);
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async login({ commit, dispatch }, { email, password }) {
      try {
        let token = await signInWithEmailAndPassword(auth, email, password);
        commit("setUser", token.user);
        await dispatch("getUserData", token.user);
        await dispatch("getCategoryRecords", ["books", "games", "movies", "music"]);
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
    async getUserData({ commit }, user) {
      const userData = (await getDoc(doc(firestore, "users", user.email))).data();
      commit("setPlan", userData.plan);
      commit("setCategoryPreferences", userData.categoryPreferences);
      // commit("setMovieQuota", userData.movieQuota);
      // commit("setGameQuota", userData.gameQuota);
      // commit("setMusicQuota", userData.musicQuota);
      // commit("setBookQuota", userData.bookQuota);
    },
    async getCategoryRecords({ commit }, categories) {
      let categoryRecords = await Promise.all(categories.map(async (category) => {
        const categoryGenres = await Promise.all((await getDocs(collection(firestore, category))).docs.map(async (categoryGenre) => {
          const genreRecords = (await getDocs(collection(firestore, `${category}/${categoryGenre.id}/records`))).docs.map((genreRecord) => {
            return genreRecord.data();
          });
          return [categoryGenre.id, genreRecords];
        }));
        return { [category]: categoryGenres };
      }));
      commit("setCategoryRecords", Object.assign({}, ...categoryRecords));
    },
  },
});

// Verify user login state upon page reload (refresh)
export const userAuthorized = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
        store.commit("setUser", user);
        await store.dispatch("getUserData", user);
        await store.dispatch("getCategoryRecords", ["books", "games", "movies", "music"]);
        console.log(user);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  })();
});

export default store;
