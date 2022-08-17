<template>
  <section>
    <h1>Books!</h1>
    <h1 v-if="!gamesData.length">Page is loading... Please wait :)</h1>
    <!-- <ItemCarousel v-for="games in gamesData" :key="games.genre" :data="games"></ItemCarousel> -->
  </section>
</template>

<script setup>
//import ItemCarousel from "@/components/ItemCarousel.vue";
//import { useStore } from "vuex";
import { ref } from "vue";

//const store = useStore();
const gamesData = ref([]);

</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
