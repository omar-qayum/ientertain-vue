<script setup>
import { useUserStore } from "@/store/index.js";
import CategoryCarousel from "@/components/carousel/CategoryCarousel.vue";

const props = defineProps(["category"]);
const userStore = useUserStore();
</script>

<template>
  <section v-for="genre in userStore.preferences.get(props.category).keys()" :key="genre">
    <CategoryCarousel
      :category="props.category"
      :header="genre"
      :records="userStore.categoryRecords.get(props.category).get(genre)"
    />
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-top: 1rem;
}
</style>
