<template>
  <section>
    <h1 v-if="!gamesData.length">Page is loading... Please wait :)</h1>
    <ItemCarousel v-for="games in gamesData" :key="games.genre" :data="games"></ItemCarousel>
  </section>
</template>

<script setup>
import ItemCarousel from "@/components/ItemCarousel.vue";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/index.js";
//import { useStore } from "vuex";
import { ref } from "vue";

//const store = useStore();
const gamesData = ref([]);
const gameGenres = await getDocs(collection(firestore, "Games"));
gameGenres.forEach(async (genre) => {
  const games = [];
  const gamesByGenre = await getDocs(collection(firestore, `Games/${genre.id}/Game`));
  gamesByGenre.forEach((movieByGenre) => {
    games.push(movieByGenre.data());
  })
  gamesData.value.push(games);
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
