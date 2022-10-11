<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "@/store/index.js";
import CategoryCarousel from "@/components/carousel/CategoryCarousel.vue";
import BookRecord from "@/components/records/BookRecord.vue";
import GameRecord from "@/components/records/GameRecord.vue";
import MovieRecord from "@/components/records/MovieRecord.vue";
import MusicRecord from "@/components/records/MusicRecord.vue";

const props = defineProps(["query"]);
const userStore = useUserStore();
const searchResults = ref(
  new Map([
    ["books", new Map()],
    ["games", new Map()],
    ["movies", new Map()],
    ["music", new Map()],
  ])
);

watch(
  () => props.query,
  async (newQuery) => {
    search(newQuery);
  }
);

function search(criteria) {
  console.log("called");
  ["books", "games", "movies", "music"].forEach((category) => {
    searchResults.value.get(category).clear();
    userStore.categoryRecords.get(category).forEach((records, genre) => {
      if (userStore.preferences.get(category).has(genre)) {
        records.forEach((record) => {
          Object.entries(record).forEach(([field, value]) => {
            if (typeof value === "string" && value.toLowerCase().includes(criteria)) {
              searchResults.value.get(category).set(record.id, record);
            }
          });
        });
      }
    });
  });
}
search(props.query);
</script>

<template>
  <h1>Search Results</h1>
  <section v-for="category in ['books', 'games', 'movies', 'music']" :key="category">
    <CategoryCarousel :header="category" :records="Array.from(searchResults.get(category).values())">
      <template #modal="{ record }">
        <BookRecord v-if="category === 'books'" :record="record" :controls="true" />
        <GameRecord v-else-if="category === 'games'" :record="record" :controls="true" />
        <MovieRecord v-else-if="category === 'movies'" :record="record" :controls="true" />
        <MusicRecord v-else :record="record" :controls="true" />
      </template>
    </CategoryCarousel>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  justify-content: left;
}
</style>
