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
  <div class="register-outer-container">
    <div class="register-inner-container">
      <p class="register-slogan">Your Entertainment Awaits!</p>
      <form @submit.prevent="userStore.register({ displayName: username, email, password, plan })">
        <p class="form-header">Register</p>
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <div class="plans">
          <p class="plan-header">Plan</p>
          <icon class="plan-icon" icon="fa-solid fa-book" />
          <icon class="plan-icon" icon="fa-solid fa-gamepad" />
          <icon class="plan-icon" icon="fa-solid fa-film" />
          <icon class="plan-icon" icon="fa-solid fa-music" />
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
          <p class="plan-quota">5</p>
          <p class="plan-quota">2</p>
          <p class="plan-quota">2</p>
          <p class="plan-quota">2</p>
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
          <p class="plan-quota">2</p>
          <p class="plan-quota">5</p>
          <p class="plan-quota">2</p>
          <p class="plan-quota">2</p>
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
          <p class="plan-quota">2</p>
          <p class="plan-quota">2</p>
          <p class="plan-quota">5</p>
          <p class="plan-quota">2</p>
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
          <p class="plan-quota">2</p>
          <p class="plan-quota">2</p>
          <p class="plan-quota">2</p>
          <p class="plan-quota">5</p>
        </div>
        <input type="submit" value="Register" />
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-outer-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: $navyBlue;

  .register-inner-container {
    width: clamp(280px, 100vw, 450px);

    .register-slogan {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
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

      .form-header {
        font-size: 2rem;
        font-weight: 700;
        text-align: center;
        color: $lightBlack;
      }

      input[type="text"],
      input[type="email"],
      input[type="password"] {
        width: 100%;
        font-size: 1.25rem;
        color: $darkBlack;
      }

      .plans {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        justify-items: center;
        align-items: center;
        gap: 0.75rem;

        .plan-header {
          font-size: 1.5rem;
          font-weight: 700;
          color: $lightBlack;
        }

        .plan-icon {
          font-size: 1.75rem;
          color: red;
        }

        label {
          display: flex;
          align-items: center;
          justify-self: start;
          font-size: 1rem;
          gap: 0.5rem;
          color: white;

          input[type="radio"] {
            height: 1rem;
            width: 1rem;
          }
        }

        .plan-quota {
          font-size: 1.25rem;
          color: white;
        }
      }

      input[type="submit"] {
        background: $red;
        border: none;
        color: white;
        padding: 0.75rem;
        border-radius: 0.5rem;
        font-weight: bold;
        cursor: pointer;

        &:hover {
          transform: scale(1.1);
          transition: all 0.25s ease-in-out;
        }
      }
    }
  }
}
</style>
