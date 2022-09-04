<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping, faMinus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartR } from '@fortawesome/free-regular-svg-icons';
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
    <div class="details-container">
      <img :src="props.record.image" />
      <div>
        <h2>{{ props.record.albumName }}</h2>
        <h3>{{ props.record.artist }}</h3>
        <h3>{{ props.record.releaseDate }}</h3>
        <h3>{{ props.record.totalTracks }}</h3>
        <div v-if="controls" class="controls-container">
          <button v-if="!userStore.wishLists.get('music').has(record.id)"
            @click="userStore.addToWishList('music', record.id, record)">
            <icon class="fa-2x" icon="fa-regular fa-heart" />
          </button>
          <button v-else @click="userStore.removeFromWishList('music', record.id)">
            <icon class="fa-2x" icon="fa-solid fa-heart" />
          </button>
          <button v-if="!userStore.shoppingCarts.get('music').has(record.id)"
            @click="userStore.addToShoppingCart('music', record.id, record)">
            <icon class="fa-2x" icon="fa-solid fa-cart-shopping" />
          </button>
          <button v-else @click="userStore.removeFromShoppingCart('music', record.id)">
            <icon class="fa-2x" icon="fa-solid fa-minus" />
          </button>
        </div>
      </div>
    </div>
    <div class="tracks">
      <h4 v-for="track in props.record.tracks" :key="track">{{ track.trackName }}<audio controls>
          <source :src="track.trackPreview" type="audio/ogg">
        </audio></h4>
    </div>
  </div>
</template>
  
<style lang="scss" scoped>
.modal-inner-container {
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 600px;
  width: 600px;
  background: #000000cc;
  border: white solid 1px;

  .details-container {
    display: flex;

    img {
      width: 150px;
      height: 200px;
    }

    h1 {}

    h3 {
      padding-top: 10px;
      word-spacing: 10px;
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
}
</style>
  