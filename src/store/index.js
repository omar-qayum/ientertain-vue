import { createStore } from "vuex";
import { auth } from "../firebase/index.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";

const store = createStore({
  state: {
    user: null,
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async register(context, { email, password }) {
      try {
        let token = await createUserWithEmailAndPassword(auth, email, password);
        context.commit("setUser", token.user);
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async login(context, { email, password }) {
      try {
        let token = await signInWithEmailAndPassword(auth, email, password);
        context.commit("setUser", token.user);
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

// export const x = new Promise((resolve) =>
//     onAuthStateChanged(auth, (user) => {
//       store.commit("setUser", user);
//       console.log("changed");
//       console.log(user.email);
//       resolve('Ready');
//     }
//     ));

export const userAuthorized = new Promise((resolve) => {
  (onAuthStateChanged(auth, (user) => {
    store.commit("setUser", user);
    resolve(user);
  }))();
});

export default store;
