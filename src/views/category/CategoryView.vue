<script setup>
import { useUserStore } from "@/store/index.js";
import CategoryCarousel from "@/components/carousel/CategoryCarousel.vue";
import BookRecord from "@/components/records/BookRecord.vue";
import GameRecord from "@/components/records/GameRecord.vue";
import MovieRecord from "@/components/records/MovieRecord.vue";
import MusicRecord from "@/components/records/MusicRecord.vue";

const props = defineProps(["category"]);
const userStore = useUserStore();
</script>

<template>
  <section v-for="genre in userStore.preferences.get(props.category).keys()" :key="genre">
    <CategoryCarousel
      :header="genre"
      :records="userStore.categoryRecords.get(props.category).get(genre)"
    >
      <template #modal="{ record }">
        <BookRecord v-if="props.category === 'books'" :record="record" :controls="true" />
        <GameRecord v-else-if="props.category === 'games'" :record="record" :controls="true" />
        <MovieRecord v-else-if="props.category === 'movies'" :record="record" :controls="true" />
        <MusicRecord v-else :record="record" :controls="true" />
      </template>
    </CategoryCarousel>
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-bottom: 1rem;
}
</style>
