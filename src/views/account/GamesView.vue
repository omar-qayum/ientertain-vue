<script setup>
import { useUserStore } from "@/store/index.js";
import ItemCarousel from "@/components/ItemCarousel.vue";
import GameRecord from "@/components/GameRecord.vue";

const userStore = useUserStore();
</script>

<template>
  <section v-for="genre in userStore.preferences.get('games').keys()" :key="genre">
    <ItemCarousel :header="genre" :records="userStore.categoryRecords.get('games').get(genre)">
      <template #modal="{ record }">
        <GameRecord :record="record" :controls="true" />
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
