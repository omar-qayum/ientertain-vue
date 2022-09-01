import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword, getIdToken,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut, updateProfile,
} from "firebase/auth";
import { arrayRemove, arrayUnion, collection, doc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import axios from "axios";
import { auth, firestore } from "@/firebase/index.js";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    plan: "",
    expiry: null,
    cart: new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]),
    wishList: new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]),
    categoryQuotas: new Map([["books", 0], ["games", 0], ["movies", 0], ["music", 0]]),
    categoryPreferences: new Map([["books", new Set()], ["games", new Set()], ["movies", new Set()], ["music", new Set()]]),
    categoryRecords: new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]),
  }),
  actions: {
    async addToCart(category, id, record) {
      this.cart.get(category).set(id, record);
      this.removeFromWishList(category, id);
      this.categoryQuotas.set(category, this.categoryQuotas.get(category) - 1);
      await updateDoc(doc(firestore, "users", this.user.email), { [`cart.${category}`]: arrayUnion(id)})
    },
    async removeFromCart(category, id) {
      this.cart.get(category).delete(id);
      this.categoryQuotas.set(category, this.categoryQuotas.get(category) + 1);
      await updateDoc(doc(firestore, "users", this.user.email), { [`cart.${category}`]: arrayRemove(id)})
    },
    getCartSize() {
      let sum = 0;
      this.cart.forEach((records, category) => {
        sum += this.cart.get(category).size;
      });
      return sum;
    },
    async addToWishList(category, id, record) {
      this.wishList.get(category).set(id, record);
      this.removeFromCart(category, id);
      await updateDoc(doc(firestore, "users", this.user.email), { [`wishList.${category}`]: arrayUnion(id)})
    },
    async removeFromWishList(category, id) {
      this.wishList.get(category).delete(id);
      await updateDoc(doc(firestore, "users", this.user.email), { [`wishList.${category}`]: arrayRemove(id)})
    },
    getWishListSize() {
      let sum = 0;
      this.wishList.forEach((records, category) => {
        sum += this.wishList.get(category).size;
      });
      return sum;
    },
    setCategoryQuotas(categoryQuotas) {
      Object.entries(categoryQuotas).forEach(([category, quota]) => {
        this.categoryQuotas.set(category, quota);
      });
    },
    setCategoryPreferences(categoryPreferences) {
      Object.entries(categoryPreferences).forEach(([category, preference]) => {
        this.categoryPreferences.set(category, new Set(preference));
      });
    },
    setCategoryRecords(categoryRecords) {
      Object.entries(categoryRecords).forEach(([category, records]) => {
        this.categoryRecords.set(category, new Map(records));
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
        await this.getUserData(user);
        await this.getCategoryRecords(["books", "games", "movies", "music"]);
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async login({ email, password }) {
      try {
        let token = await signInWithEmailAndPassword(auth, email, password);
        this.user = token.user;
        await this.getUserData(token.user);
        await this.getCategoryRecords(["books", "games", "movies", "music"]);
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
      await updateProfile(user, {
        displayName,
        photoURL,
      });
    },
    async getUserData(user) {
      const userData = (await getDoc(doc(firestore, "users", user.email))).data();
      this.plan = userData.plan;
      this.expiry = userData.expiry;
      this.setCategoryPreferences(userData.categoryPreferences);
      this.setCategoryQuotas(userData.categoryQuotas);
    },
    async getCategoryRecords(categories) {
      let categoryRecords = await Promise.all(categories.map(async (category) => {
        const genreRecords = (await getDocs(collection(firestore, category))).docs.map((genre) => {
          return [genre.id, genre.data().records];
        });
        return { [category]: genreRecords };  
      }));
      this.setCategoryRecords(Object.assign({}, ...categoryRecords));
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
        await userStore.getUserData(user);
        await userStore.getCategoryRecords(["books", "games", "movies", "music"]);
        console.log(user);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  })();
});
