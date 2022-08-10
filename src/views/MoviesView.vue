<template>
  <section>

  </section>
</template>

<script setup>
//import ItemCarousel from "../components/ItemCarousel.vue";
import axios from "axios";
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const categories = ref([]);

try {
  let getCategories = await axios({
    url: "http://localhost:5000/movies/genre/movie/list",
    method: "GET",
    headers: {
      Authorization: "Bearer " + store.state.idToken,
    },
    params: {
      language: "en",
    },
  });
  categories.value = getCategories.data.genres;
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
