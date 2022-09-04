<script setup>
import { useUserStore } from "@/store/index.js";
import ItemCarousel from "@/components/ItemCarousel.vue";
import MovieRecord from "@/components/MovieRecord.vue";

const userStore = useUserStore();
</script>

<template>
  <section v-for="genre in userStore.preferences.get('movies').keys()" :key="genre">
    <ItemCarousel :header="genre" :records="userStore.categoryRecords.get('movies').get(genre)">
      <template #modal="{ record }">
        <MovieRecord :record="record" :controls="true" />
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
