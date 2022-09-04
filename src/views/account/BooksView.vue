<script setup>
import { useUserStore } from "@/store/index.js";
import ItemCarousel from "@/components/ItemCarousel.vue";
import BookRecord from "@/components/BookRecord.vue";

const userStore = useUserStore();
</script>

<template>
  <section v-for="genre in userStore.preferences.get('books').keys()" :key="genre">
    <ItemCarousel :header="genre" :records="userStore.categoryRecords.get('books').get(genre)">
      <template #modal="{ record }">
        <BookRecord :record="record" :controls="true" />
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
