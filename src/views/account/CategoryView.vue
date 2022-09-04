<script setup>
import { useUserStore } from "@/store/index.js";
import ItemCarousel from "@/components/ItemCarousel.vue";
import BookRecord from "@/components/BookRecord.vue";
import GameRecord from "@/components/GameRecord.vue";
import MovieRecord from "@/components/MovieRecord.vue";
import MusicRecord from "@/components/MusicRecord.vue";

const props = defineProps(["category"]);
const userStore = useUserStore();
</script>
  
<template>
  <section v-for="genre in userStore.preferences.get(props.category).keys()" :key="genre">
    <ItemCarousel :header="genre" :records="userStore.categoryRecords.get(props.category).get(genre)">
      <template #modal="{ record }">
        <BookRecord v-if="props.category === 'books'" :record="record" :controls="true" />
        <GameRecord v-else-if="props.category === 'games'" :record="record" :controls="true" />
        <MovieRecord v-else-if="props.category === 'movies'" :record="record" :controls="true" />
        <MusicRecord v-else :record="record" :controls="true" />
      </template>
    </ItemCarousel>
  </section>
</template>
  
<style lang="scss" scoped>
section {
  display: flex;
  justify-content: left;
}
</style>
  