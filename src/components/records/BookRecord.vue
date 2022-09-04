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
        <h2>{{ props.record.title }}</h2>
        <h3>{{ props.record.authors }}</h3>
        <h3>{{ props.record.date }}</h3>
        <h3>{{ props.record.pages }}</h3>
        <div v-if="props.controls" class="controls-container">
          <button v-if="!userStore.wishLists.get('books').has(record.id)"
            @click="userStore.addToWishList('books', record.id, record)">
            <icon class="fa-2x" icon="fa-regular fa-heart" />
          </button>
          <button v-else @click="userStore.removeFromWishList('books', record.id)">
            <icon class="fa-2x" icon="fa-solid fa-heart" />
          </button>
          <button v-if="!userStore.shoppingCarts.get('books').has(record.id)"
            @click="userStore.addToShoppingCart('books', record.id, record)">
            <icon class="fa-2x" icon="fa-solid fa-cart-shopping" />
          </button>
          <button v-else @click="userStore.removeFromShoppingCart('books', record.id)">
            <icon class="fa-2x" icon="fa-solid fa-minus" />
          </button>
        </div>
      </div>
    </div>
    <h4 class="summary">{{ props.record.summary }}</h4>
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

  .details-container {
    display: flex;
    gap: 10px;

    img {
      width: 150px;
      height: 200px;
    }

    .controls-container {
      button {
        background: $red;
        height: 50px;
        width: 25%;
        border: none;
      }
    }

    .summary {}
  }
}
</style>
  