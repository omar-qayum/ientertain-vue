<script setup>
import { onMounted, onUnmounted } from "vue";
import { useUserStore } from "@/store/index.js";
import CategoryCarousel from "@/components/carousel/CategoryCarousel.vue";

const props = defineProps(["category"]);
const userStore = useUserStore();

onMounted(() => {
  calcMaxTiles();
  window.addEventListener("resize", calcMaxTiles);
});

onUnmounted(() => {
  window.removeEventListener("resize", calcMaxTiles);
});

const calcMaxTiles = () => {
  const grid = window
    .getComputedStyle(document.getElementsByClassName("slider")[0])
    .getPropertyValue("grid-template-columns")
    .split(" ");
  userStore.tiles = grid.length;
  userStore.tileSize = grid.at(0);
};
</script>

<template>
  <div class="category-carousels">
    <CategoryCarousel
      v-for="genre in userStore.preferences.get(props.category).keys()"
      :key="genre"
      :category="props.category"
      :header="genre"
      :records="userStore.categoryRecords.get(props.category).get(genre)"
    />
  </div>
</template>

<style lang="scss" scoped>
.category-carousels {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
