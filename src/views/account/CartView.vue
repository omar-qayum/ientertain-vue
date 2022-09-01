<script setup>
import { useUserStore } from "@/store/index.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faMinus } from '@fortawesome/free-solid-svg-icons'
import { ref } from "vue";
import ItemModal from "@/components/ItemModal.vue"

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
  <div v-for="category in ['books', 'games', 'movies', 'music']" :key="category" class="category-container">
    <h2>{{ category }}</h2>
    <div class="cart-container">
      <div v-for="[id, record] in userStore.carts.get(category)" :key="id" class="cart-item">
        <img :src=record.image />
        <div class="controls-container">
          <button @click="userStore.addToWishList(category, record.id, record)">
            <icon class="fa-2x" icon="fa-solid fa-heart" />
          </button>
          <button @click="userStore.removeFromCart(category, record.id)">
            <icon class="fa-2x" icon="fa-solid fa-minus" />
          </button>
        </div>
      </div>
    </div>
  </div>
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
.category-container {
  h2 {
    text-transform: capitalize;
  }

  .cart-container {
    display: flex;

    .cart-item {
      img {
        height: 200px;
        width: 150px;
        background: grey;
      }

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