<template>
  <section>
    <h1 v-if="!moviesData.length">Page is loading... Please wait :)</h1>
    <ItemCarousel v-for="movies in moviesData" :key="movies.genre" :data="movies">
      <template v-slot:test>
        <p>FUCK YOU!</p>
      </template>
    </ItemCarousel>
  </section>
</template>

<script setup>
import ItemCarousel from "@/components/ItemCarousel.vue";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/index.js";
// import { useStore } from "vuex";
import { ref } from "vue";

// const store = useStore();
const moviesData = ref([]);
const movieGenres = await getDocs(collection(firestore, "Movies"));
movieGenres.forEach(async (genre) => {
  const movies = [];
  const moviesByGenre = await getDocs(collection(firestore, `Movies/${genre.id}/Movie`));
  moviesByGenre.forEach((movieByGenre) => {
    movies.push(movieByGenre.data());
  })
  moviesData.value.push(movies);
});
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
