<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getIdToken } from "firebase/auth";
import { useUserStore } from "@/store/index.js";
import axios from "axios";
import ButtonText from "@/components/buttons/ButtonText.vue";

const router = useRouter();
const userStore = useUserStore();
const name = ref(userStore.shipping.name);
const address = ref(userStore.shipping.address);
const unit = ref(userStore.shipping.unit);
const city = ref(userStore.shipping.city);
const province = ref(userStore.shipping.province);
const postalCode = ref(userStore.shipping.postalCode);

const purchase = async () => {
  try {
    const response = (
      await axios.post(
        `${import.meta.env.VITE_HOST}/api/v1/user/account/purchase`,
        {
          shipping: {
            name: name.value,
            address: address.value,
            unit: unit.value,
            city: city.value,
            province: province.value,
            postalCode: postalCode.value,
          },
          cart: {
            books: Array.from(userStore.shoppingCarts.get("books").values()),
            games: Array.from(userStore.shoppingCarts.get("games").values()),
            movies: Array.from(userStore.shoppingCarts.get("movies").values()),
            music: Array.from(userStore.shoppingCarts.get("music").values()),
          },
        },
        {
          headers: { Authorization: `Bearer ${await getIdToken(userStore.user)}` },
        }
      )
    ).data;
    userStore.setQuotas(response.quotas);
    userStore.shipping = response.shipping;
    userStore.orders.push(response.order);
    userStore.shoppingCarts = new Map([
      ["books", new Map()],
      ["games", new Map()],
      ["movies", new Map()],
      ["music", new Map()],
    ]);
  } catch (error) {
    console.log(error.message);
    router.push("/account/cart");
  }
};
</script>
<template>
  <div class="checkout-container">
    <p class="heading">Checkout</p>
    <div class="info">
      <div class="shipping">
        <p class="title">Shipping Information</p>
        <form @submit.prevent="purchase()">
          <label>Name</label>
          <input v-model="name" type="text" required />
          <label>Address</label>
          <input v-model="address" type="text" required />
          <label>Apartment, suite, etc.</label>
          <input v-model="unit" type="text" required />
          <label>City</label>
          <input v-model="city" type="text" required />
          <label>Province</label>
          <select v-model="province">
            <option v-for="province in ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT']" :key="province">{{ province }}</option>
          </select>
          <label>Postal Code</label>
          <input v-model="postalCode" type="text" required />
          <ButtonText>Purchase</ButtonText>
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
