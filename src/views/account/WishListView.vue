<script setup>
import { useUserStore } from "@/store/index.js";
import CategoryCarousel from "@/components/carousel/CategoryCarousel.vue";
import WishListControls from "@/components/carousel/WishListControls.vue";
import BookRecord from "@/components/records/BookRecord.vue";
import GameRecord from "@/components/records/GameRecord.vue";
import MovieRecord from "@/components/records/MovieRecord.vue";
import MusicRecord from "@/components/records/MusicRecord.vue";

const userStore = useUserStore();
</script>
  
<template>
  <h1>Wish List</h1>
  <section v-for="category in ['books', 'games', 'movies', 'music']" :key="category">
    <CategoryCarousel :header="category" :records="Array.from(userStore.wishLists.get(category).values())">
      <template #modal="{ record }">
        <BookRecord v-if="category === 'books'" :record="record" :controls="false"/>
        <GameRecord v-else-if="category === 'games'" :record="record" :controls="false"/>
        <MovieRecord v-else-if="category === 'movies'" :record="record" :controls="false"/>
        <MusicRecord v-else :record="record" :controls="false"/>
      </template>
      <template #controls="{ record }">
        <WishListControls :category="category" :record="record" />
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