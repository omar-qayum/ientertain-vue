<script setup>
import { useUserStore } from "@/store/index.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping, faMinus, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR } from '@fortawesome/free-regular-svg-icons'
import ItemCarousel from "@/components/ItemCarousel.vue";
import MusicRecord from "@/components/MusicRecord.vue";

library.add(faCartShopping);
library.add(faMinus);
library.add(faHeart);
library.add(faHeartR);

const userStore = useUserStore();
</script>

<template>
  <section v-for="genre in userStore.preferences.get('music').keys()" :key="genre">
    <ItemCarousel :header="genre" :records="userStore.categoryRecords.get('music').get(genre)">
      <template #modal="{ record }">
        <MusicRecord :record="record">
          <div class="controls-container">
            <button v-if="!userStore.wishLists.get('music').has(record.id)"
              @click="userStore.addToWishList('music', record.id, record)">
              <icon class="fa-2x" icon="fa-regular fa-heart" />
            </button>
            <button v-else @click="userStore.removeFromWishList('music', record.id)">
              <icon class="fa-2x" icon="fa-solid fa-heart" />
            </button>
            <button v-if="!userStore.carts.get('music').has(record.id)"
              @click="userStore.addToCart('music', record.id, record)">
              <icon class="fa-2x" icon="fa-solid fa-cart-shopping" />
            </button>
            <button v-else @click="userStore.removeFromCart('music', record.id)">
              <icon class="fa-2x" icon="fa-solid fa-minus" />
            </button>
          </div>
        </MusicRecord>
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
