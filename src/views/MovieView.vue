<template>
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
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
