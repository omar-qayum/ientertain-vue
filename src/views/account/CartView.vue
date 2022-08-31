<script setup>
import { useUserStore } from "@/store/index.js";

const userStore = useUserStore();
</script>

<template>
  <h1>Shopping Cart</h1>
  <div v-for="category in ['books', 'games', 'movies', 'music']" :key="category" class="category-container">
    <h2>{{  category  }}</h2>
    <div class="cart-container">
      <img v-for="[id, record] in userStore.cart.get(category)" :key="id" :src=record.posterPath @click="userStore.cart.get(category).delete(record.id)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.category-container {
  h2 {
    text-transform: capitalize;
  }

  .cart-container {
    display: flex;

    img {
      height: 200px;
      width: 150px;
      background: grey;
    }
  }
}
</style>