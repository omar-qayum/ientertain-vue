<script setup>
import { useUserStore } from "@/store/index.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faMinus } from '@fortawesome/free-solid-svg-icons'
import { ref } from "vue";
import ItemCarousel from "@/components/ItemCarousel.vue";
import ItemModal from "@/components/ItemModal.vue"
import BookRecord from "@/components/BookRecord.vue";
import GameRecord from "@/components/GameRecord.vue";
import MovieRecord from "@/components/MovieRecord.vue";
import MusicRecord from "@/components/MusicRecord.vue";

library.add(faHeart);
library.add(faMinus);

const userStore = useUserStore();
const showCheckoutModal = ref(false);

const toggleModal = () => {
  showCheckoutModal.value = !showCheckoutModal.value;
}

const checkout = () => {
  toggleModal();
}
</script>

<template>
  <h1>Shopping Cart</h1>
  <section v-for="category in ['books', 'games', 'movies', 'music']" :key="category">
    <ItemCarousel :header="category" :records="Array.from(userStore.wishLists.get(category).values())">
      <template #modal="{ record }">
        <BookRecord v-if="category === 'books'" :record="record" />
        <GameRecord v-else-if="category === 'games'" :record="record" />
        <MovieRecord v-else-if="category === 'movies'" :record="record" />
        <MusicRecord v-else :record="record" />
      </template>
      <template #controls="{ record }">
        <div class="controls-container">
          <button @click="userStore.addToWishList(category, record.id, record)">
            <icon class="fa-2x" icon="fa-solid fa-heart" />
          </button>
          <button @click="userStore.removeFromCart(category, record.id)">
            <icon class="fa-2x" icon="fa-solid fa-minus" />
          </button>
        </div>
      </template>
    </ItemCarousel>
  </section>
  <button @click="checkout()">Checkout!</button>
  <ItemModal v-if="showCheckoutModal" @toggleModal="toggleModal()">
    <template #checkout>
      <div class="modal-inner-container">
        <form>
          <label>Name:</label>
          <br />
          <input type="text" />
          <br />
          <label>Address:</label>
          <br />
          <input type="text" />
          <br />
          <label>Apartment, suite, etc.</label>
          <br />
          <input type="text" />
          <br />
          <label>City</label>
          <br />
          <input type="text" />
          <br />
          <label>Province</label>
          <br />
          <select>
            <option>AB</option>
            <option>BC</option>
            <option>MB</option>
            <option>NB</option>
            <option>NL</option>
            <option>NS</option>
            <option>NT</option>
            <option>NU</option>
            <option>ON</option>
            <option>PE</option>
            <option>QC</option>
            <option>SK</option>
            <option>YT</option>
          </select>
          <br />
          <label>Postal Code</label>
          <br />
          <input type="text" />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </template>
  </ItemModal>
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
}
</style>