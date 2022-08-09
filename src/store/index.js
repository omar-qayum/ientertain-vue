import { createStore } from "vuex";
import auth from "../firebase/index.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getIdToken,
} from "@firebase/auth";

const store = createStore({
  state: {
    user: null,
    idToken: null,
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setIdToken(state, payload) {
      state.idToken = payload;
    },
  },
  actions: {
    async register(context, { email, password }) {
      try {
        let token = await createUserWithEmailAndPassword(auth, email, password);
        let idToken = await getIdToken(token.user);
        context.commit("setUser", token.user);
        context.commit("setIdToken", idToken);
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async login(context, { email, password }) {
      try {
        let token = await signInWithEmailAndPassword(auth, email, password);
        let idToken = await getIdToken(token.user);
        context.commit("setUser", token.user);
        context.commit("setIdToken", idToken);
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
  },
});

// Verify user login state upon page reload (refresh)
export const userAuthorized = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
        let idToken = await getIdToken(user);
        store.commit("setUser", user);
        store.commit("setIdToken", idToken);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  })();
});

export default store;
