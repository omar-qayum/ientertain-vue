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
    <h1 v-if="!userStore.categoryRecords.get('games').size">Page is loading... Please wait :)</h1>
    <ItemCarousel v-for="genre in userStore.preferences.get('games').keys()" :key="genre" :genre="genre"
      :records="userStore.categoryRecords.get('games').get(genre)">
      <template #games="{ record }">
        <div class="modal-inner-container">
          <iframe class="trailer" :src="`https://www.youtube.com/embed/${record.video}?autoplay=1&mute=1&vq=hd1080`"
            frameborder="0" allowfullscreen></iframe>
          <div class="details-container">
            <h1>{{ record.title }}</h1>
            <h3>
              {{ record.releaseDate }}
              {{ record.runtime }} <small>min</small>
              {{ record.voteAverage }}
            </h3>
          </div>
          <h4 class="summary">{{ record.overview }}</h4>
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

    .trailer {
      width: 100%;
      height: 400px;
    }

    .details-container {
      align-items: center;

      h1 {}

      h3 {
        word-spacing: 10px;
      }
    }

    .summary {
      font-weight: lighter;
    }

    button {
      background: $red;
      height: 50px;
      width: 25%;
      border: none;
    }
  }
}
</style>
