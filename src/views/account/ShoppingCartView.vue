<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/index.js";
import TilesPage from "@/components/tiles/TilesPage.vue";

const userStore = useUserStore();
const router = useRouter();
const validated = ref(new Set());

const checkout = () => {
  userStore.shoppingCarts.forEach((records, category) => {
    if (userStore.shoppingCarts.get(category).size <= userStore.quotas.get(category)) {
      validated.value.add(category);
    }
  });

  if (validated.value.size === 4) {
    router.push("/account/checkout");
  }
};
</script>

<template>
  <div class="shopping-cart-container">
    <p class="heading">Shopping Cart</p>
    <template v-if="userStore.getShoppingCartSize()">
      <button @click="checkout()">Checkout</button>
      <div class="carts">
        <div class="cart" v-for="category in ['books', 'games', 'movies', 'music']" :key="category">
          <p class="category">{{ category }}</p>
          <template v-if="userStore.shoppingCarts.get(category).size">
            <template v-if="userStore.shoppingCarts.get(category).size <= userStore.quotas.get(category)">
              <p class="success">Sufficient {{ category }} quota.</p>
            </template>
            <template v-else>
              <p class="error">Insufficient quota! Remove at least {{ Math.abs(userStore.shoppingCarts.get(category).size - userStore.quotas.get(category)) }} item(s).</p>
            </template>
            <TilesPage :category="category" :records="Array.from(userStore.shoppingCarts.get(category).values())" :controls="true" />
          </template>
          <template v-else>
            <p class="empty">Your {{ category }} cart is empty.</p>
          </template>
        </div>
      </div>
    </template>
    <template v-else>
      <p class="empty">Your shopping cart is empty.</p>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.shopping-cart-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  .heading {
    color: $navyBlue;
    font-weight: 700;
    font-size: 1.5rem;
    text-transform: capitalize;
  }

  button {
    align-self: flex-start;
    padding: 0.5rem;
    border: none;
    color: white;
    background-color: $navyBlue;
    cursor: pointer;
    transition: 0.3s;
    font-weight: bold;
  }

  .carts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;

    .cart {
      .category {
        color: $navyBlue;
        font-weight: 700;
        font-size: 1.5rem;
        text-transform: capitalize;
      }

      .success {
        text-transform: none;
        font-weight: bold;
        font-size: 1.25rem;
        color: green;
      }

      .error {
        text-transform: none;
        font-weight: bold;
        font-size: 1.25rem;
        color: red;
      }
    }
  }

  .empty {
    font-weight: bold;
    font-size: 1.25rem;
    color: $lightBlue;
  }
}
</style>
