<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping, faMinus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartR } from "@fortawesome/free-regular-svg-icons";
import { useUserStore } from "@/store/index.js";

library.add(faCartShopping);
library.add(faMinus);
library.add(faHeart);
library.add(faHeartR);

const userStore = useUserStore();
const props = defineProps(["category", "record"]);
</script>

<template>
  <div class="controls-container">
    <button v-if="!userStore.wishlists.get(props.category).has(props.record.id)" @click="userStore.addToWishlist(props.category, props.record.id, props.record)">
      <icon class="icon" icon="fa-regular fa-heart" />
    </button>
    <button v-else @click="userStore.removeFromWishlist(props.category, props.record.id)">
      <icon class="icon" icon="fa-solid fa-heart" />
    </button>
    <button v-if="!userStore.shoppingCarts.get(props.category).has(props.record.id)" @click="userStore.addToShoppingCart(props.category, props.record.id, props.record)">
      <icon class="icon" icon="fa-solid fa-cart-shopping" />
    </button>
    <button v-else @click="userStore.removeFromShoppingCart(props.category, props.record.id)">
      <icon class="icon" icon="fa-solid fa-minus" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.controls-container {
  display: flex;
  gap: 0.5rem;

  button {
    padding: 0.5rem;
    width: 50%;
    border: none;
    background: $navyBlue;
    font-weight: bold;

    .icon {
      font-size: 1.25rem;
      color: white;
    }
  }
}
</style>
