<script setup>
import { useUserStore } from "@/store/index.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinus, faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(faMinus);
library.add(faHeart);

const userStore = useUserStore();

const moveToFavourites = (category, id, record) => {
  userStore.cart.get(category).delete(record.id);
  // add to fav!
}
</script>

<template>
  <h1>Shopping Cart</h1>
  <div v-for="category in ['books', 'games', 'movies', 'music']" :key="category" class="category-container">
    <h2>{{ category }}</h2>
    <div class="cart-container">
      <img v-for="[id, record] in userStore.cart.get(category)" :key="id" :src=record.posterPath />
      <div class="controls-container">
        <button @click="userStore.cart.get(category).delete(record.id)">
          <icon class="fa-2x" icon="fa-solid fa-minus" />
        </button>
        <button @click="moveToFavourites()">
          <icon class="fa-2x" icon="fa-solid fa-heart" />
        </button>
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
</style>