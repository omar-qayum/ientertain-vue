<template>
  <div v-if="isAdmin">
    <h1>Admin Settings</h1>
    <button @click="loadMovies">Movies</button>
    <button @click="loadGames">Games</button>
    <button @click="loadMusic">Music</button>
    <button @click="loadBooks">Books</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { useStore } from "vuex";
import { getIdToken } from "@firebase/auth";
import { ref } from "vue";

const store = useStore();
const isAdmin = ref(false);
isAdmin.value = (await store.state.user.getIdTokenResult(true)).claims.admin;

const loadMovies = async () => {
  try {
    await axios.get("http://localhost:5000/movies", {
      headers: { Authorization: "Bearer " + await getIdToken(store.state.user) },
    });
  } catch (error) {
    console.log(error.message);
  }
}

const loadGames = async () => {
  try {
    await axios.get("http://localhost:5000/games", {
      headers: { Authorization: "Bearer " + await getIdToken(store.state.user) },
    });
  } catch (error) {
    console.log(error.message);
  }
}

const loadMusic = async () => {
  try {
    await axios.get("http://localhost:5000/music", {
      headers: { Authorization: "Bearer " + await getIdToken(store.state.user) },
    });
  } catch (error) {
    console.log(error.message);
  }
}

const loadBooks = async () => {
  try {
    await axios.get("http://localhost:5000/books", {
      headers: { Authorization: "Bearer " + await getIdToken(store.state.user) },
    });
  } catch (error) {
    console.log(error.message);
  }
}
</script>

<style lang="scss" scoped>
.account-outer-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  background: #00000099;
}

</style>