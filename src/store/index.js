import { createStore } from "vuex";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut, updateProfile,
} from "@firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { auth, firestore, functions } from "@/firebase/index.js";

const store = createStore({
  state: {
    user: null,
    movies: null,
    games: null,
    music: null,
    books: null,
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async register(context, { username, email, password, plan }) {
      try {
        let token = await createUserWithEmailAndPassword(auth, email, password);
        context.commit("setUser", token.user);
        await updateProfile(auth.currentUser, {
          displayName: username, // photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        await addDoc(collection(firestore, "Users"), {
          username: username,
          email: email,
          plan: plan,
        });
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async login(context, { email, password }) {
      try {
        let token = await signInWithEmailAndPassword(auth, email, password);
        context.commit("setUser", token.user);
        httpsCallable(functions, "setPlan")();
        // setPlanFunction({admin: true, plan: "sexy"});
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
        store.commit("setUser", user);
        console.log(user);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  })();
});

export default store;
