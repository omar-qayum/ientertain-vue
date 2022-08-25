<template>
  <div v-if="isAdmin">
    <h1>Admin Settings</h1>
    <button @click="getMovieRecords()">Movies</button>
    <button @click="getGamesRecords()">Games</button>
    <button @click="getMusicRecords()">Music</button>
    <button @click="getBookRecords()">Books</button>
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

const getMovieRecords = async () => {
  try {
    await axios.get("http://localhost:5000/movie-records", {
      headers: { Authorization: "Bearer " + await getIdToken(store.state.user) },
    });
    store.dispatch("getMovieRecords");
  } catch (error) {
    console.log(error.message);
  }
}

const getGamesRecords = async () => {
  try {
    await axios.get("http://localhost:5000/game-records", {
      headers: { Authorization: "Bearer " + await getIdToken(store.state.user) },
    });
    store.dispatch("getGameRecords");
  } catch (error) {
    console.log(error.message);
  }
}

const getMusicRecords = async () => {
  try {
    await axios.get("http://localhost:5000/music-records", {
      headers: { Authorization: "Bearer " + await getIdToken(store.state.user) },
    });
    store.dispatch("getMusicRecords");
  } catch (error) {
    console.log(error.message);
  }
}

const getBookRecords = async () => {
  try {
    await axios.get("http://localhost:5000/book-records", {
      headers: { Authorization: "Bearer " + await getIdToken(store.state.user) },
    });
    store.dispatch("getBookRecords");
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