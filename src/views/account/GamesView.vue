<script setup>
import ItemCarousel from "@/components/ItemCarousel.vue";
import GameRecord from "@/components/GameRecord.vue";
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
    <h1 v-if="!userStore.categoryRecords.get('games').size">Page is loading... Please wait :)</h1>
    <ItemCarousel v-for="genre in userStore.preferences.get('games').keys()" :key="genre" :headers="genre"
      :records="userStore.categoryRecords.get('games').get(genre)">
      <template #modal="{ record }">
        <GameRecord :record="record">
          <button v-if="!userStore.wishLists.get('games').has(record.id)"
            @click="userStore.addToWishList('games', record.id, record)">
            <icon class="fa-2x" icon="fa-regular fa-heart" />
          </button>
          <button v-else @click="userStore.removeFromWishList('games', record.id)">
            <icon class="fa-2x" icon="fa-solid fa-heart" />
          </button>
          <button v-if="!userStore.carts.get('games').has(record.id)"
            @click="userStore.addToCart('games', record.id, record)">
            <icon class="fa-2x" icon="fa-solid fa-cart-shopping" />
          </button>
          <button v-else @click="userStore.removeFromCart('games', record.id)">
            <icon class="fa-2x" icon="fa-solid fa-minus" />
          </button>
        </GameRecord>
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
