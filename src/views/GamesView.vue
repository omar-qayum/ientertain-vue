<template>
  <section>
    <ItemCarousel2 v-for="category in categories" :key="category.id" :category="category"></ItemCarousel2>
  </section>
</template>

<script setup>
import ItemCarousel2 from "../components/ItemCarousel2.vue";
import axios from "axios";
import { useStore } from "vuex";
import { ref } from "vue";

const categories = ref([]);
const store = useStore();

try {
  const getCategories = await axios({
    url: "http://localhost:5000/games/themes",
    method: "POST",
    headers: {
      Authorization: "Bearer " + store.state.idToken,
    },
    data: {
      query: "fields name; sort name asc; limit 100;",
    }
  });
  categories.value = getCategories.data;
  console.log(categories.value);
} catch (error) {
  console.log(error);
}
</script>

<style></style>
