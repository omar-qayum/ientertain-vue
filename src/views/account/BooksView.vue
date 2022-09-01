<script setup>
import ItemCarousel from "@/components/ItemCarousel.vue";
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
    <h1 v-if="!userStore.categoryRecords.get('books').size">Page is loading... Please wait :)</h1>
    <ItemCarousel v-for="genre in userStore.categoryPreferences.get('books')" :key="genre" :genre="genre"
      :records="userStore.categoryRecords.get('books').get(genre)">
      <template #books="{ record }">
        <div class="modal-inner-container">
          <div class="details-container">
            <img :src="record.image" />
            <div>
              <h2>{{ record.title }}</h2>
              <h3>{{ record.authors }}</h3>
              <h3>{{ record.date }}</h3>
              <h3>{{ record.pages }}</h3>
              <button v-if="!userStore.wishList.get('books').has(record.id)"
                @click="userStore.addToWishList('books', record.id, record)">
                <icon class="fa-2x" icon="fa-regular fa-heart" />
              </button>
              <button v-else @click="userStore.removeFromWishList('books', record.id)">
                <icon class="fa-2x" icon="fa-solid fa-heart" />
              </button>
              <button v-if="!userStore.cart.get('books').has(record.id)"
                @click="userStore.addToCart('books', record.id, record)">
                <icon class="fa-2x" icon="fa-solid fa-cart-shopping" />
              </button>
              <button v-else @click="userStore.removeFromCart('books', record.id)">
                <icon class="fa-2x" icon="fa-solid fa-minus" />
              </button>
            </div>
          </div>
          <h4 class="summary">{{ record.summary }}</h4>
        </div>
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

  .modal-inner-container {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 20px;
    transform: translate(-50%, -50%);
    height: 600px;
    width: 600px;
    background: #000000cc;
    border: white solid 1px;

    .details-container {
      display: flex;
      gap: 10px;

      img {
        width: 150px;
        height: 200px;
      }

      .summary {}

      button {
        background: $red;
        height: 50px;
        width: 25%;
        border: none;
      }
    }
  }
}
</style>
