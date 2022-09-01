import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword, getIdToken,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut, updateProfile,
} from "firebase/auth";
import { collection, doc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import axios from "axios";
import { auth, firestore } from "@/firebase/index.js";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    plan: "",
    expiry: null,
    carts: new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]),
    wishLists: new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]),
    quotas: new Map([["books", 0], ["games", 0], ["movies", 0], ["music", 0]]),
    preferences: new Map([["books", new Set()], ["games", new Set()], ["movies", new Set()], ["music", new Set()]]),
    categoryRecords: new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]),
    searchResults: new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]),
  }),
  actions: {
    async addToCart(category, id, record) {
      try {
        this.carts.get(category).set(id, record);
        this.removeFromWishList(category, id);
        this.quotas.set(category, this.quotas.get(category) - 1);
        await updateDoc(doc(firestore, "users", this.user.email), { [`carts.${category}`]: Array.from(this.carts.get(category).values()) })
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    },
    async removeFromCart(category, id) {
      try {
        this.carts.get(category).delete(id);
        this.quotas.set(category, this.quotas.get(category) + 1);
        await updateDoc(doc(firestore, "users", this.user.email), { [`carts.${category}`]: Array.from(this.carts.get(category).values()) })
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    },
    getCartSize() {
      let sum = 0;
      this.carts.forEach((records, category) => {
        sum += this.carts.get(category).size;
      });
      return sum;
    },
    async addToWishList(category, id, record) {
      try {
        this.wishLists.get(category).set(id, record);
        this.removeFromCart(category, id);
        await updateDoc(doc(firestore, "users", this.user.email), { [`wishLists.${category}`]: Array.from(this.wishLists.get(category).values()) })
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    },
    async removeFromWishList(category, id) {
      try {
        this.wishLists.get(category).delete(id);
        await updateDoc(doc(firestore, "users", this.user.email), { [`wishLists.${category}`]: Array.from(this.wishLists.get(category).values()) })
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    },
    getWishListSize() {
      let sum = 0;
      this.wishLists.forEach((records, category) => {
        sum += this.wishLists.get(category).size;
      });
      return sum;
    },
    setQuotas(quotas) {
      Object.entries(quotas).forEach(([category, quota]) => {
        this.quotas.set(category, quota);
      });
    },
    setPreferences(preferences) {
      Object.entries(preferences).forEach(([category, preference]) => {
        this.preferences.set(category, new Set(preference));
      });
    },
    setCategoryRecords(categoryRecords) {
      Object.entries(categoryRecords).forEach(([category, records]) => {
        this.categoryRecords.set(category, new Map(records));
      });
    },
    setCarts(carts) {
      Object.entries(carts).forEach(([category, cart]) => {
        cart.forEach((record) => {
          this.carts.get(category).set(record.id, record);
        })
      });
    },
    setWishLists(wishLists) {
      Object.entries(wishLists).forEach(([category, wishList]) => {
        wishList.forEach((record) => {
          this.wishLists.get(category).set(record.id, record);
        })
      });
    },
    async register({ displayName, email, password, plan }) {
      try {
        const storage = getStorage();
        const photoURL = await getDownloadURL(storageRef(storage, 'site/avatars/1.png'));
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const userAccountData = axios.post("http://localhost:5000/api/v1/user/account/register-user", { plan }, { headers: { Authorization: "Bearer " + await getIdToken(user) } });
        const updateUserProfile = this.updateUserProfile({ user, displayName, photoURL });
        await Promise.all([userAccountData, updateUserProfile]);
        this.user = user;
        await this.getCategoryRecords(["books", "games", "movies", "music"]);
        await this.getUserData(user);
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async login({ email, password }) {
      try {
        let token = await signInWithEmailAndPassword(auth, email, password);
        this.user = token.user;
        await this.getCategoryRecords(["books", "games", "movies", "music"]);
        await this.getUserData(token.user);
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async logout() {
      try {
        await signOut(auth);
        this.user = null;
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async updateUserProfile({ user, displayName, photoURL }) {
      try {
        await updateProfile(user, {
          displayName,
          photoURL,
        });
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    },
    async getUserData(user) {
      try {
        const userData = (await getDoc(doc(firestore, "users", user.email))).data();
        this.plan = userData.plan;
        this.expiry = userData.expiry;
        this.setPreferences(userData.preferences);
        this.setQuotas(userData.quotas);
        this.setCarts(userData.carts);
        this.setWishLists(userData.wishLists);
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    },
    async getCategoryRecords(categories) {
      try {
        let categoryRecords = await Promise.all(categories.map(async (category) => {
          const genreRecords = (await getDocs(collection(firestore, category))).docs.map((genre) => {
            return [genre.id, genre.data().records];
          });
          return { [category]: genreRecords };
        }));
        this.setCategoryRecords(Object.assign({}, ...categoryRecords));
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    },
  },
});

// Verify user login state upon page reload (refresh)
export const userAuthorized = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
        const userStore = useUserStore();
        userStore.$patch({ user });
        await userStore.getCategoryRecords(["books", "games", "movies", "music"]);
        await userStore.getUserData(user);
        console.log(user);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  })();
});
