<script setup>
import { useUserStore } from "@/store/index.js";

const userStore = useUserStore();
</script>
  
<template>
  <h1>Search Results</h1>
  <div v-for="category in ['books', 'games', 'movies', 'music']" :key="category" class="category-container">
    <h2>{{ category }}</h2>
    <div class="cart-container">
      <div v-for="[id, record] in userStore.searchResults.get(category)" :key="id" class="cart-item">
        <img :src=record.image />
      </div>
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

    .cart-item {
      img {
        height: 200px;
        width: 150px;
        background: grey;
      }

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
    }
  }
}
</style>