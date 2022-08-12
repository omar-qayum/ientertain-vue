<template>
  <section>
    <h1 v-if="!gamesData.length">Page is loading... Please wait :)</h1>
    <ItemCarousel v-for="games in gamesData" :key="games.genre" :data="games"></ItemCarousel>
  </section>
</template>

<script setup>
import ItemCarousel from "../components/ItemCarousel.vue";
import { useStore } from "vuex";
import axios from "axios";
import { ref } from "vue";

const store = useStore();
const gamesData = ref([]);

try {
  let getGamesData = await axios.get("http://localhost:5000/games", {
    headers: { Authorization: "Bearer " + store.state.idToken },
  });
  console.log(getGamesData.data);
  gamesData.value = getGamesData.data; 
} catch (error) {
  console.log(error.message);
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
