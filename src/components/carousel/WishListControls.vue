<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useUserStore } from "@/store/index.js";

library.add(faCartShopping);
library.add(faMinus);

const props = defineProps(["category", "record"]);
const userStore = useUserStore();
</script>

<template>
  <div class="controls-container">
    <button @click="userStore.addToShoppingCart(props.category, props.record.id, props.record)">
      <icon class="fa-2x" icon="fa-solid fa-cart-shopping" />
    </button>
    <button @click="userStore.removeFromWishList(props.category, props.record.id)">
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