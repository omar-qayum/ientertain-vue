<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useUserStore } from "@/store/index.js";

library.add(faHeart);
library.add(faMinus);

const props = defineProps(["category", "record"]);
const userStore = useUserStore();
</script>

<template>
  <div class="controls-container">
    <button @click="userStore.addToWishlist(props.category, props.record.id, props.record)">
      <icon class="fa-2x" icon="fa-solid fa-heart" />
    </button>
    <button @click="userStore.removeFromShoppingCart(props.category, props.record.id)">
      <icon class="fa-2x" icon="fa-solid fa-minus" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.controls-container {
  display: flex;
  width: 150px;

  button {
    background: $red;
    height: 50px;
    width: 50%;
    border: none;
  }
}
</style>
