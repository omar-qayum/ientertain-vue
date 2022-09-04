<script setup>
import { useUserStore } from "@/store/index.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping, faMinus } from '@fortawesome/free-solid-svg-icons'
import ItemCarousel from "@/components/ItemCarousel.vue";
import BookRecord from "@/components/BookRecord.vue";
import GameRecord from "@/components/GameRecord.vue";
import MovieRecord from "@/components/MovieRecord.vue";
import MusicRecord from "@/components/MusicRecord.vue";

library.add(faCartShopping);
library.add(faMinus);

const userStore = useUserStore();
</script>
  
<template>
  <h1>Wish List</h1>
  <section v-for="category in ['books', 'games', 'movies', 'music']" :key="category">
    <ItemCarousel :header="category" :records="Array.from(userStore.wishLists.get(category).values(genre))">
      <template #modal="{ record }">
        <BookRecord v-if="category === 'books'" :record="record" />
        <GameRecord v-else-if="category === 'games'" :record="record" />
        <MovieRecord v-else-if="category === 'movies'" :record="record" />
        <MusicRecord v-else :record="record" />
      </template>
      <template #controls="{ record }">
        <div class="controls-container">
          <button @click="userStore.addToCart(category, record.id, record)">
            <icon class="fa-2x" icon="fa-solid fa-cart-shopping" />
          </button>
          <button @click="userStore.removeFromWishList(category, record.id)">
            <icon class="fa-2x" icon="fa-solid fa-minus" />
          </button>
        </div>
      </template>
    </ItemCarousel>
  </section>
</template>
  
<style lang="scss" scoped>
section {
  display: flex;
  justify-content: left;

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
</style>