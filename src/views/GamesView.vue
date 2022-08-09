<template>
  <section>
    <ItemCarousel2 v-for="genre in genres" :key="genre.name" :genre="genre.name"></ItemCarousel2>
  </section>
</template>

<script setup>
import ItemCarousel2 from "../components/ItemCarousel2.vue";
import axios from "axios";
import { useStore } from "vuex";
import { ref } from "vue";

const genres = ref([]);

let store = useStore();
console.log(store.state.idToken);
try {
  let getGenres = await axios({
    url: "http://localhost:5000/games/themes",
    method: "POST",
    headers: {
      Authorization: "Bearer " + store.state.idToken,
    },
    data: {
      query: "fields checksum,created_at,name,slug,updated_at,url; sort name asc; limit 100;",
    }
  });
  genres.value = getGenres.data;
} catch (error) {
  console.log(error);
}
</script>

<style></style>
