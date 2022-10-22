<script setup>
import { useUserStore } from "@/store/index.js";

const userStore = useUserStore();
</script>
<template>
  <div class="checkout-container">
    <p class="heading">Checkout</p>
    <div class="info">
      <div class="shipping">
        <p class="title">Shipping Information</p>
        <form>
          <label>Name</label>
          <input type="text" />
          <label>Address</label>
          <input type="text" />
          <label>Apartment, suite, etc.</label>
          <input type="text" />
          <label>City</label>
          <input type="text" />
          <label>Province</label>
          <select>
            <option v-for="province in ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT']" :key="province">{{ province }}</option>
          </select>
          <label>Postal Code</label>
          <input type="text" />
          <input type="submit" value="Purchase" />
        </form>
      </div>
      <div class="cart">
        <p class="title">Shopping Cart</p>
        <div class="items">
          <template v-for="category in ['books', 'games', 'movies', 'music']" :key="category">
            <div v-for="record in Array.from(userStore.shoppingCarts.get(category).values())" :key="record" class="item">
              <img :src="record.image" />
              <p>{{ record.title }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkout-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;

  .heading {
    color: $navyBlue;
    font-weight: 700;
    font-size: 1.5rem;
    text-transform: capitalize;
  }

  .info {
    display: flex;
    flex-direction: column;
    color: white;
    gap: 2rem;

    .title {
      color: $lightBlue;
      font-weight: bold;
    }

    .shipping {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      form {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        input[type="submit"] {
          padding: 0.5rem;
          border: none;
          color: white;
          background-color: $navyBlue;
          cursor: pointer;
          transition: 0.3s;
          font-weight: bold;
        }
      }
    }

    .cart {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .items {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 0.5rem;

        .item {
          display: flex;
          gap: 0.5rem;
          align-items: center;

          img {
            width: 100px;
            aspect-ratio: 2 / 3;
          }
        }
      }
    }
  }
}

@media (min-width: 1000px) {
  .checkout-container {
    .info {
      flex-direction: row;

      .cart {
        .items {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
  }
}

@media (min-width: 1500px) {
  .checkout-container {
    .info {
      .cart {
        .items {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    }
  }
}
</style>
