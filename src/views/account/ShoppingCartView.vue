<script setup>
import { useUserStore } from "@/store/index.js";
import { ref } from "vue";
import CategoryCarousel from "@/components/carousel/CategoryCarousel.vue";
import ShoppingCartControls from "@/components/carousel/ShoppingCartControls.vue";
import SiteModal from "@/components/site/SiteModal.vue";
import BookRecord from "@/components/records/BookRecord.vue";
import GameRecord from "@/components/records/GameRecord.vue";
import MovieRecord from "@/components/records/MovieRecord.vue";
import MusicRecord from "@/components/records/MusicRecord.vue";

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
    <CategoryCarousel :header="category" :records="Array.from(userStore.shoppingCarts.get(category).values())">
      <template #modal="{ record }">
        <BookRecord v-if="category === 'books'" :record="record" :controls="false" />
        <GameRecord v-else-if="category === 'games'" :record="record" :controls="false" />
        <MovieRecord v-else-if="category === 'movies'" :record="record" :controls="false" />
        <MusicRecord v-else :record="record" :controls="false" />
      </template>
      <template #controls="{ record }">
        <ShoppingCartControls :category="category" :record="record" />
      </template>
    </CategoryCarousel>
  </section>
  <button @click="checkout()">Checkout!</button>
  <SiteModal v-if="showCheckoutModal" @toggleModal="toggleModal()">
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
  </SiteModal>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  justify-content: left;
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