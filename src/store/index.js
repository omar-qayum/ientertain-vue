import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword, getIdToken,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut, updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  signInWithPopup
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
    categoryRecords: new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]),
    quotas: new Map([["books", 0], ["games", 0], ["movies", 0], ["music", 0]]),
    preferences: new Map([["books", new Set()], ["games", new Set()], ["movies", new Set()], ["music", new Set()]]),
    shoppingCarts: new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]),
    wishLists: new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]),
  }),
  actions: {
    getShoppingCartSize() {
      let sum = 0;
      this.shoppingCarts.forEach((records, category) => {
        sum += this.shoppingCarts.get(category).size;
      });
      return sum;
    },
    getWishListSize() {
      let sum = 0;
      this.wishLists.forEach((records, category) => {
        sum += this.wishLists.get(category).size;
      });
      return sum;
    },
    setPreferences(preferences) {
      Object.entries(preferences).forEach(([category, preference]) => {
        this.preferences.set(category, new Set(preference));
      });
    },
    setQuotas(quotas) {
      Object.entries(quotas).forEach(([category, quota]) => {
        this.quotas.set(category, quota);
      });
    },
    setShoppingCarts(shoppingCarts) {
      Object.entries(shoppingCarts).forEach(([category, shoppingCart]) => {
        shoppingCart.forEach((record) => {
          this.shoppingCarts.get(category).set(record.id, record);
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
    async register(requestType, displayName, email, password, plan) {
      try {
        switch (requestType) {
          case "google":
            this.user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
            displayName = this.user.displayName;
            break;
          case "facebook":
            this.user = (await signInWithPopup(auth, new FacebookAuthProvider())).user;
            displayName = this.user.displayName;
            break;
          case "twitter":
            this.user = (await signInWithPopup(auth, new TwitterAuthProvider())).user;
            displayName = this.user.displayName;
            break;
          case "github":
            this.user = (await signInWithPopup(auth, new GithubAuthProvider())).user;
            displayName = this.user.displayName;
            break;
          default:
            this.user = (await createUserWithEmailAndPassword(auth, email, password)).user;
            break;
        }

        const photoURL = await getDownloadURL(storageRef(getStorage(), 'site/avatars/1.png'));
        const userAccountData = axios.post("http://localhost:5000/api/v1/user/account/register-user", { plan }, { headers: { Authorization: "Bearer " + await getIdToken(this.user) } });
        const updateUserProfile = this.updateUserProfile(this.user, displayName, photoURL);
        await Promise.all([userAccountData, updateUserProfile]);
        await this.setCategoryRecords(["books", "games", "movies", "music"]);
        await this.setUserData(this.user);
        this.router.push("/categories/home");
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async login({ email, password }) {
      try {
        this.user = (await signInWithEmailAndPassword(auth, email, password)).user;
        await this.setCategoryRecords(["books", "games", "movies", "music"]);
        await this.setUserData(this.user);
        this.router.push("/categories/home");
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
    async updateUserProfile(user, displayName, photoURL) {
      try {
        await updateProfile(user, { displayName, photoURL });
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    },
    async setUserData(user) {
      try {
        const userData = (await getDoc(doc(firestore, "users", user.email))).data();
        this.plan = userData.plan;
        this.expiry = userData.expiry;
        this.setPreferences(userData.preferences);
        this.setQuotas(userData.quotas);
        this.setShoppingCarts(userData.shoppingCarts);
        this.setWishLists(userData.wishLists);
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    },
    async setCategoryRecords(categories) {
      try {
        await Promise.all(categories.map(async (category) => {
          (await getDocs(collection(firestore, category))).docs.forEach((genre) => {
            this.categoryRecords.get(category).set(genre.id, genre.data().records);
          });
        }));
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    },
    async addToShoppingCart(category, id, record) {
      try {
        this.shoppingCarts.get(category).set(id, record);
        this.removeFromWishList(category, id);
        this.quotas.set(category, this.quotas.get(category) - 1);
        await updateDoc(doc(firestore, "users", this.user.email), { [`shoppingCarts.${category}`]: Array.from(this.shoppingCarts.get(category).values()) })
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    },
    async removeFromShoppingCart(category, id) {
      try {
        this.shoppingCarts.get(category).delete(id);
        this.quotas.set(category, this.quotas.get(category) + 1);
        await updateDoc(doc(firestore, "users", this.user.email), { [`shoppingCarts.${category}`]: Array.from(this.shoppingCarts.get(category).values()) })
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    },
    async addToWishList(category, id, record) {
      try {
        this.wishLists.get(category).set(id, record);
        this.removeFromShoppingCart(category, id);
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
  },
});

// Verify user login state upon page reload (refresh)
export const userAuthorized = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
        const userStore = useUserStore();
        userStore.$patch({ user });
        await userStore.setCategoryRecords(["books", "games", "movies", "music"]);
        await userStore.setUserData(user);
        console.log(user);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  })();
});
