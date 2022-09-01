<script setup>
import { useUserStore } from "@/store/index.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping, faMinus } from '@fortawesome/free-solid-svg-icons'

library.add(faCartShopping);
library.add(faMinus);

const userStore = useUserStore();
</script>
  
  <template>
  <h1>Wish List</h1>
  <div v-for="category in ['books', 'games', 'movies', 'music']" :key="category" class="category-container">
    <h2>{{ category }}</h2>
    <div class="cart-container">
      <div v-for="[id, record] in userStore.wishList.get(category)" :key="id" class="cart-item">
        <img :src=record.image />
        <div class="controls-container">
          <button @click="userStore.addToCart(category, record.id, record)">
            <icon class="fa-2x" icon="fa-solid fa-cart-shopping" />
          </button>
          <button @click="userStore.removeFromWishList(category, record.id)">
            <icon class="fa-2x" icon="fa-solid fa-minus" />
          </button>
        </div>
      </div>
    </div>
  </div>
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
  </style>