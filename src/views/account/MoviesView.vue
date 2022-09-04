<script setup>
import { useUserStore } from "@/store/index.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping, faMinus, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR } from '@fortawesome/free-regular-svg-icons'
import ItemCarousel from "@/components/ItemCarousel.vue";
import MovieRecord from "@/components/MovieRecord.vue";

library.add(faCartShopping);
library.add(faMinus);
library.add(faHeart);
library.add(faHeartR);

const userStore = useUserStore();
</script>

<template>
  <section v-for="genre in userStore.preferences.get('movies').keys()" :key="genre">
    <ItemCarousel :header="genre" :records="userStore.categoryRecords.get('movies').get(genre)">
      <template #modal="{ record }">
        <MovieRecord :record="record">
          <div class="controls-container">
            <button v-if="!userStore.wishLists.get('movies').has(record.id)"
              @click="userStore.addToWishList('movies', record.id, record)">
              <icon class="fa-2x" icon="fa-regular fa-heart" />
            </button>
            <button v-else @click="userStore.removeFromWishList('movies', record.id)">
              <icon class="fa-2x" icon="fa-solid fa-heart" />
            </button>
            <button v-if="!userStore.carts.get('movies').has(record.id)"
              @click="userStore.addToCart('movies', record.id, record)">
              <icon class="fa-2x" icon="fa-solid fa-cart-shopping" />
            </button>
            <button v-else @click="userStore.removeFromCart('movies', record.id)">
              <icon class="fa-2x" icon="fa-solid fa-minus" />
            </button>
          </div>
        </MovieRecord>
      </template>
    </ItemCarousel>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  justify-content: left;

  .controls-container {
    button {
      background: $red;
      height: 50px;
      width: 25%;
      border: none;
    }
  }
}
</style>
