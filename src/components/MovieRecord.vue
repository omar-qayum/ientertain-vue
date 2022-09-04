<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping, faMinus, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR } from '@fortawesome/free-regular-svg-icons'
import { useUserStore } from "@/store/index.js";

library.add(faCartShopping);
library.add(faMinus);
library.add(faHeart);
library.add(faHeartR);

const props = defineProps(["record", "controls"]);
const userStore = useUserStore();
</script>
  
<template>
  <div class="modal-inner-container">
    <iframe class="trailer" :src="`https://www.youtube.com/embed/${props.record.video}?autoplay=1&mute=1&vq=hd1080`"
      frameborder="0" allowfullscreen></iframe>
    <div class="details-container">
      <h1>{{ props.record.title }}</h1>
      <h3>
        {{ props.record.releaseDate }}
        {{ props.record.runtime }} <small>min</small>
        {{ props.record.voteAverage }}
      </h3>
    </div>
    <h4 class="summary">{{ props.record.overview }}</h4>
    <div v-if="props.controls" class="controls-container">
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
  </div>
</template>
  
<style lang="scss" scoped>
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
  