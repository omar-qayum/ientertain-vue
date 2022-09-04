<script setup>
import { useUserStore } from "@/store/index.js";
import ItemCarousel from "@/components/ItemCarousel.vue";
import MusicRecord from "@/components/MusicRecord.vue";

const userStore = useUserStore();
</script>

<template>
  <section v-for="genre in userStore.preferences.get('music').keys()" :key="genre">
    <ItemCarousel :header="genre" :records="userStore.categoryRecords.get('music').get(genre)">
      <template #modal="{ record }">
        <MusicRecord :record="record" :controls="true" />
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
