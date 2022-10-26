import { defineStore } from "pinia";
import { getIdToken, onAuthStateChanged, signOut, updateProfile, updatePassword } from "firebase/auth";
import { collection, doc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import axios from "axios";
import { auth, firestore } from "@/firebase/index.js";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    idToken: null,
    igdbAccessToken: null,
    spotifyAccessToken: null,
    tiles: 0,
    plan: "",
    expiry: null,
    shipping: null,
    orders: null,
    categoryRecords: new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]),
    quotas: new Map([["books", 0], ["games", 0], ["movies", 0], ["music", 0]]),
    preferences: new Map([["books", new Set()], ["games", new Set()], ["movies", new Set()], ["music", new Set()]]),
    shoppingCarts: new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]),
    wishlists: new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]),
    searchResults: new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]),
  }),
  actions: {
    async register(user, plan) {
      try {
        await axios.post("http://localhost:5000/api/v1/user/account/register-user", { plan }, { headers: { Authorization: `Bearer ${await getIdToken(user)}` } });
        await this.setCategoryRecords(["books", "games", "movies", "music"]);
        await this.setUserData(user);
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async login(user) {
      try {
        await this.setCategoryRecords(["books", "games", "movies", "music"]);
        await this.setUserData(user);
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
    async setUserData(user) {
      try {
        this.user = user;
        this.idToken = await getIdToken(user);
        const userData = (await getDoc(doc(firestore, "users", user.email))).data();
        const ordersData = (await getDoc(doc(firestore, "orders", user.email))).data();
        this.igdbAccessToken = userData.tokens.igdbAccessToken;
        this.spotifyAccessToken = userData.tokens.spotifyAccessToken;
        this.plan = userData.plan;
        this.expiry = userData.expiry;
        this.shipping = userData.shipping,
        this.orders = ordersData.orders,
        this.setPreferences(userData.preferences);
        this.setQuotas(userData.quotas);
        this.setShoppingCarts(userData.shoppingCarts);
        this.setWishlists(userData.wishlists);
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
    setWishlists(wishlists) {
      Object.entries(wishlists).forEach(([category, wishlist]) => {
        wishlist.forEach((record) => {
          this.wishlists.get(category).set(record.id, record);
        })
      });
    },
    setSearchResults(results) {
      this.searchResults = new Map(results);
    },
    async updateUserProfile(displayName, photoURL) {
      try {
        await updateProfile(this.user, { displayName, photoURL });
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async updatePassword(password) {
      try {
        await updatePassword(this.user, password);
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async updatePreferences(preferences) {
      try {
        await updateDoc(doc(firestore, "users", this.user.email), {
          preferences: {
            books: Array.from(preferences.get("books").values()),
            games: Array.from(preferences.get("games").values()),
            movies: Array.from(preferences.get("movies").values()),
            music: Array.from(preferences.get("music").values()),
          },
        });
        this.setPreferences({
          books: preferences.get("books"),
          games: preferences.get("games"),
          movies: preferences.get("movies"),
          music: preferences.get("music"),
        });
      } catch (error) {
        throw new Error(error.code);
      }
    },
    getShoppingCartSize() {
      let sum = 0;
      this.shoppingCarts.forEach((records, category) => {
        sum += this.shoppingCarts.get(category).size;
      });
      return sum;
    },
    getWishlistSize() {
      let sum = 0;
      this.wishlists.forEach((records, category) => {
        sum += this.wishlists.get(category).size;
      });
      return sum;
    },
    async addToShoppingCart(category, id, record) {
      try {
        this.shoppingCarts.get(category).set(id, record);
        this.removeFromWishlist(category, id);
        await updateDoc(doc(firestore, "users", this.user.email), { [`shoppingCarts.${category}`]: Array.from(this.shoppingCarts.get(category).values()) })
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    },
    async removeFromShoppingCart(category, id) {
      try {
        this.shoppingCarts.get(category).delete(id);
        await updateDoc(doc(firestore, "users", this.user.email), { [`shoppingCarts.${category}`]: Array.from(this.shoppingCarts.get(category).values()) })
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    },
    async addToWishlist(category, id, record) {
      try {
        this.wishlists.get(category).set(id, record);
        this.removeFromShoppingCart(category, id);
        await updateDoc(doc(firestore, "users", this.user.email), { [`wishlists.${category}`]: Array.from(this.wishlists.get(category).values()) })
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    },
    async removeFromWishlist(category, id) {
      try {
        this.wishlists.get(category).delete(id);
        await updateDoc(doc(firestore, "users", this.user.email), { [`wishlists.${category}`]: Array.from(this.wishlists.get(category).values()) })
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
        await userStore.setCategoryRecords(["books", "games", "movies", "music"]);
        await userStore.setUserData(user);
        console.log(userStore.user);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  })();
});
