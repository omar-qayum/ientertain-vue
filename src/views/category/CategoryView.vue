<script setup>
import { useUserStore } from "@/store/index.js";
import CategoryCarousel from "@/components/carousel/CategoryCarousel.vue";

const props = defineProps(["category"]);
const userStore = useUserStore();
</script>

<template>
  <div class="carousel-container">
    <section v-for="genre in userStore.preferences.get(props.category).keys()" :key="genre">
      <CategoryCarousel
        :category="props.category"
        :header="genre"
        :records="userStore.categoryRecords.get(props.category).get(genre)"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.carousel-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
