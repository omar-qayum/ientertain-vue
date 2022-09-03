<script setup>
import ItemCarousel from "@/components/ItemCarousel.vue";
import MovieRecord from "@/components/MovieRecord.vue";
import { useUserStore } from "@/store/index.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping, faMinus, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR } from '@fortawesome/free-regular-svg-icons'

library.add(faCartShopping);
library.add(faMinus);
library.add(faHeart);
library.add(faHeartR);

const userStore = useUserStore();
</script>

<template>
  <section>
    <h1 v-if="!userStore.categoryRecords.get('movies').size">Page is loading... Please wait :)</h1>
    <ItemCarousel v-for="genre in userStore.preferences.get('movies').keys()" :key="genre" :headers="genre"
      :records="userStore.categoryRecords.get('movies').get(genre)">
      <template #modal="{ record }">
        <MovieRecord :record="record">
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
        </MovieRecord>
      </template>
    </ItemCarousel>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
