import { createStore } from "vuex";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut, updateProfile,
} from "@firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { auth, firestore, functions } from "@/firebase/index.js";

const store = createStore({
  state: {
    user: null,
    movies: [],
    games: [],
    music: [],
    books: [],
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setMovies(state, payload) {
      state.movies.push(payload);
    },
    setGames(state, payload) {
      state.games.push(payload);
    },
    setMusic(state, payload) {
      state.music.push(payload);
    },
    setBooks(state, payload) {
      state.books.push(payload);
    }
  },
  actions: {
    async register(context, { username, email, password, plan }) {
      try {
        let token = await createUserWithEmailAndPassword(auth, email, password);
        await httpsCallable(functions, "registerUser")({ plan });
        await store.dispatch("updateUserProfile", { user: token.user, username });
        context.commit("setUser", token.user);
        store.dispatch("getData");
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async login(context, { email, password }) {
      try {
        let token = await signInWithEmailAndPassword(auth, email, password);
        context.commit("setUser", token.user);
        store.dispatch("getData");
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
    async updateUserProfile(context, { user, username }) {
      await updateProfile(user, {
        displayName: username, 
        photoURL: "",
      });
    },
    async getData(context) {
      // Movies
      const movieGenres = await getDocs(collection(firestore, "Movies"));
      movieGenres.forEach(async (genre) => {
        const movies = [];
        const moviesByGenre = await getDocs(collection(firestore, `Movies/${genre.id}/Movie`));
        moviesByGenre.forEach((movieByGenre) => {
          movies.push(movieByGenre.data());
        })
        context.commit("setMovies", movies);
      });
      // Games
      const gameGenres = await getDocs(collection(firestore, "Games"));
      gameGenres.forEach(async (genre) => {
        const games = [];
        const gamesByGenre = await getDocs(collection(firestore, `Games/${genre.id}/Game`));
        gamesByGenre.forEach((movieByGenre) => {
          games.push(movieByGenre.data());
        })
        context.commit("setGames", games);
      });
      // Music
      const musicGenres = await getDocs(collection(firestore, "Music"));
      musicGenres.forEach(async (genre) => {
        const music = [];
        const musicByGenre = await getDocs(collection(firestore, `Music/${genre.id}/Albums`));
        musicByGenre.forEach((album) => {
          music.push(album.data());
        })
        context.commit("setMusic", music);
      });
      // Books
      const booksGenres = await getDocs(collection(firestore, "Books"));
      booksGenres.forEach(async (genre) => {
        const books = [];
        const booksByGenre = await getDocs(collection(firestore, `Books/${genre.id}/Book`));
        booksByGenre.forEach((genreBooks) => {
          books.push(genreBooks.data());
        })
        context.commit("setBooks", books);
      });
    }
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
