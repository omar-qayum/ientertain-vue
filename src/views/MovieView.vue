<template>
  <nav>
    <router-link to="/home">Home</router-link>
    <router-link to="/movies">Movies</router-link>
    <router-link to="/games">Games</router-link>
    <router-link to="/music">Music</router-link>
    <router-link to="/books">Books</router-link>
  </nav>
  <section>
    <ItemCarousel v-for="genre in genres" :key="genre.name" :genre="genre.name"></ItemCarousel>
  </section>
</template>

<script setup>
import ItemCarousel from "../components/ItemCarousel.vue";
import axios from "axios";
import { ref } from "vue";

const genres = ref([]);

try {
  let getGenres = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=4b2ec768b38ae5e3a536aed029b916c2&language=en-US"
  );
  genres.value = getGenres.data.genres;
} catch (error) {
  console.log(error);
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  gap: 20px;
  background: $red;
  height: 50px;
  align-items: center;
  a {
    text-decoration: none;
    padding: 10px;
    color: black;
  }
  a:hover {
    background: white;
  }
}
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
