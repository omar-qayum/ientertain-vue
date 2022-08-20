<template>
  <div>
    <button @click="loadMovies">Movies</button>
    <button @click="loadGames">Games</button>
    <button @click="loadMusic">Music</button>
    <button @click="loadBooks">Books</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { useStore } from "vuex";

const store = useStore();

const loadMovies = async () => {
  try {
    await axios.get("http://localhost:5000/movies", {
      headers: { Authorization: "Bearer " + store.state.idToken },
    });
  } catch (error) {
    console.log(error.message);
  }
}

const loadGames = async () => {
  try {
    await axios.get("http://localhost:5000/games", {
      headers: { Authorization: "Bearer " + store.state.idToken },
    });
  } catch (error) {
    console.log(error.message);
  }
}

const loadMusic = async () => {
  try {
    await axios.get("http://localhost:5000/music", {
      headers: { Authorization: "Bearer " + store.state.idToken },
    });
  } catch (error) {
    console.log(error.message);
  }
}

const loadBooks = async () => {
  try {
    await axios.get("http://localhost:5000/books", {
      headers: { Authorization: "Bearer " + store.state.idToken },
    });
  } catch (error) {
    console.log(error.message);
  }
}
</script>

<style lang="scss" scoped>
</style>