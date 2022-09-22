<script setup>
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBook, faGamepad, faFilm, faMusic } from "@fortawesome/free-solid-svg-icons";
import { useUserStore } from "@/store/index.js";

library.add(faBook);
library.add(faGamepad);
library.add(faFilm);
library.add(faMusic);

const userStore = useUserStore();
const props = defineProps(["plan"]);
const username = ref("");
const email = ref("");
const password = ref("");
const plan = ref(props.plan);
const errorMessage = ref("");
</script>

<template>
  <div class="register-container">
    <h1>You Entertainment Awaits!</h1>
    <form @submit.prevent="userStore.register({ displayName: username, email, password, plan })">
      <h1>Register</h1>
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <div class="plans">
        <h1>Plan</h1>
        <icon class="icon" icon="fa-solid fa-book" />
        <icon class="icon" icon="fa-solid fa-gamepad" />
        <icon class="icon" icon="fa-solid fa-film" />
        <icon class="icon" icon="fa-solid fa-music" />
        <label for="connoisseur">
          <input
            type="radio"
            v-model="plan"
            name="connoisseur"
            id="connoisseur"
            value="connoisseur"
            :checked="props.plan === 'connoisseur'"
          />
          Connoisseur
        </label>
        <h1>5</h1>
        <h1>5</h1>
        <h1>5</h1>
        <h1>5</h1>
        <label for="bookworm">
          <input
            type="radio"
            v-model="plan"
            name="bookworm"
            id="bookworm"
            value="bookworm"
            :checked="props.plan === 'bookworm'"
          />
          Bookworm
        </label>
        <h1>5</h1>
        <h1>2</h1>
        <h1>2</h1>
        <h1>2</h1>
        <label for="geek">
          <input
            type="radio"
            v-model="plan"
            name="geek"
            id="geek"
            value="geek"
            :checked="props.plan === 'geek'"
          />
          Geek
        </label>
        <h1>2</h1>
        <h1>5</h1>
        <h1>2</h1>
        <h1>2</h1>
        <label for="binger"
          ><input
            type="radio"
            v-model="plan"
            name="binger"
            id="binger"
            value="binger"
            :checked="props.plan === 'binger'"
          />
          Binger
        </label>
        <h1>2</h1>
        <h1>2</h1>
        <h1>5</h1>
        <h1>2</h1>
        <label for="audiophile">
          <input
            type="radio"
            v-model="plan"
            name="audiophile"
            id="audiophile"
            value="audiophile"
            :checked="props.plan === 'audiophile'"
          />
          Audiophile
        </label>
        <h1>2</h1>
        <h1>2</h1>
        <h1>2</h1>
        <h1>5</h1>
      </div>
      <input type="submit" value="Register" />
    </form>
  </div>
</template>

<style lang="scss" scoped>
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: $navyBlue;
  height: 100vh;

  h1 {
    font-size: 3rem;
    color: white;
  }

  form {
    display: flex;
    flex-direction: column;
    text-justify: center;
    align-items: center;
    background-color: $skyBlue;
    padding: 1rem;
    gap: 1rem;

    h1 {
      text-align: center;
      font-size: 2rem;
      color: $darkBlack;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"] {
      font-size: 1.25rem;
      color: $darkBlack;
    }

    .plans {
      display: grid;
      grid-template-columns: repeat(5, max-content);
      align-items: center;
      gap: 0.75rem;

      label {
        display: flex;
        align-items: center;
        font-size: 1rem;
        gap: 0.5rem;

        input[type="radio"] {
          height: 1rem;
          width: 1rem;
        }
      }

      .icon {
        font-size: 1.5rem;
        justify-self: center;
      }

      h1 {
        font-size: 1.5rem;
      }
    }

    input[type="submit"] {
      background: $red;
      border: none;
      color: white;
      padding: 0.75rem;
      font-size: 1rem;
      border-radius: 0.75rem;
      font-weight: bold;
    }
  }
}
</style>
