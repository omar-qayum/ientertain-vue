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
      Object.keys(payload).forEach((categoryPreference) => {
        state.categoryPreferences.set(categoryPreference, payload[categoryPreference]);
      })
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
        await dispatch("getCategoryRecords");
        await dispatch("getUserData");
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

      state.categoryPreferences.forEach((categoryPreferences, category) => {
        state.categoryPreferences.set(category, new Set(userData.categoryPreferences[category]));
      })
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
        await store.dispatch("getUserData");
        console.log(user);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  })();
});

export default store;
