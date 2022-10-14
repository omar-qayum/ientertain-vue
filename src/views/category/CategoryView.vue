<script setup>
import { onMounted, onUnmounted } from "vue";
import { useUserStore } from "@/store/index.js";
import TilesCarousel from "@/components/tiles/TilesCarousel.vue";

const props = defineProps(["category"]);
const userStore = useUserStore();

onMounted(() => {
  calcMaxTiles();
  window.addEventListener("resize", calcMaxTiles);
});

onUnmounted(() => {
  window.removeEventListener("resize", calcMaxTiles);
});

const throttle = (func, delay) => {
  let wait = false;
  let waitingArgs = null;
  const waitFunction = () => {
    if (waitingArgs === null) {
      wait = false;
    } else {
      func(...waitingArgs);
      waitingArgs = null;
      setTimeout(waitFunction, delay);
    }
  };

  return (...args) => {
    if (wait) {
      waitingArgs = args;
      return;
    }

    func(...args);
    wait = true;

    setTimeout(waitFunction, delay);
  };
};

const calcMaxTiles = throttle(() => {
  const grid = window.getComputedStyle(document.getElementsByClassName("slider")[0]).getPropertyValue("grid-template-columns").split(" ");
  userStore.tiles = grid.length;
}, 500);
</script>

<template>
  <div class="category-container">
    <TilesCarousel
      v-for="genre in userStore.preferences.get(props.category).keys()"
      :key="genre"
      :category="props.category"
      :header="genre"
      :records="userStore.categoryRecords.get(props.category).get(genre)"
    />
  </div>
</template>

<style lang="scss" scoped>
.category-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
