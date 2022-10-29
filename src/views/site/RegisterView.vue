<script setup>
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBook, faGamepad, faFilm, faMusic } from "@fortawesome/free-solid-svg-icons";
import AuthenticationEmail from "@/components/authentication/AuthenticationEmail.vue";
import AuthenticationProvider from "@/components/authentication/AuthenticationProvider.vue";

library.add(faBook);
library.add(faGamepad);
library.add(faFilm);
library.add(faMusic);

const props = defineProps(["plan"]);
const plan = ref(props.plan);
</script>

<template>
  <div class="register-container">
    <div class="inner-container">
      <p class="slogan">Register</p>
      <div class="plans-container">
        <p class="plans-message">Select your Plan:</p>
        <p class="plan-header">Plans</p>
        <icon class="plan-icon" icon="fa-solid fa-book" />
        <icon class="plan-icon" icon="fa-solid fa-gamepad" />
        <icon class="plan-icon" icon="fa-solid fa-film" />
        <icon class="plan-icon" icon="fa-solid fa-music" />
        <label for="bookworm" :selected="plan === 'bookworm'">
          <input type="radio" v-model="plan" name="bookworm" id="bookworm" value="bookworm" :checked="props.plan === 'bookworm'" />
          Bookworm
        </label>
        <p class="plan-quota" :selected="plan === 'bookworm'">5</p>
        <p class="plan-quota" :selected="plan === 'bookworm'">2</p>
        <p class="plan-quota" :selected="plan === 'bookworm'">2</p>
        <p class="plan-quota" :selected="plan === 'bookworm'">2</p>
        <label for="geek" :selected="plan === 'geek'">
          <input type="radio" v-model="plan" name="geek" id="geek" value="geek" :checked="props.plan === 'geek'" />
          Geek
        </label>
        <p class="plan-quota" :selected="plan === 'geek'">2</p>
        <p class="plan-quota" :selected="plan === 'geek'">5</p>
        <p class="plan-quota" :selected="plan === 'geek'">2</p>
        <p class="plan-quota" :selected="plan === 'geek'">2</p>
        <label for="binger" :selected="plan === 'binger'"
          ><input type="radio" v-model="plan" name="binger" id="binger" value="binger" :checked="props.plan === 'binger'" />
          Binger
        </label>
        <p class="plan-quota" :selected="plan === 'binger'">2</p>
        <p class="plan-quota" :selected="plan === 'binger'">2</p>
        <p class="plan-quota" :selected="plan === 'binger'">5</p>
        <p class="plan-quota" :selected="plan === 'binger'">2</p>
        <label for="audiophile" :selected="plan === 'audiophile'">
          <input type="radio" v-model="plan" name="audiophile" id="audiophile" value="audiophile" :checked="props.plan === 'audiophile'" />
          Audiophile
        </label>
        <p class="plan-quota" :selected="plan === 'audiophile'">2</p>
        <p class="plan-quota" :selected="plan === 'audiophile'">2</p>
        <p class="plan-quota" :selected="plan === 'audiophile'">2</p>
        <p class="plan-quota" :selected="plan === 'audiophile'">5</p>
      </div>
      <AuthenticationProvider mode="register" :plan="plan" />
      <p class="authentication-separator">or</p>
      <AuthenticationEmail mode="register" :plan="plan" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: $navyBlue;

  .inner-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: clamp(280px, 100vw, 500px);
    overflow-y: auto;
    color: white;
    padding: 1rem;
    background-color: $skyBlue;
    border-radius: 0.75rem;

    .slogan {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
    }

    .plans-container {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      justify-items: center;
      align-items: center;
      gap: 0.5rem;

      .plans-message {
        grid-column: span 5;
        justify-self: start;
        font-weight: 700;
        align-self: start;
        color: $lightBlack;
      }

      .plan-header {
        color: $skyBlue;
      }

      .plan-icon {
        color: $lightBlack;
        font-size: 1.75rem;
      }

      label {
        display: flex;
        align-items: center;
        justify-self: start;
        font-size: 1rem;
        gap: 0.5rem;

        &[selected="true"] {
          color: $lightBlack;
          font-weight: bold;
        }

        input[type="radio"] {
          height: 1rem;
          width: 1rem;
        }
      }

      .plan-quota {
        font-size: 1.25rem;

        &[selected="true"] {
          color: $lightBlack;
          font-weight: bold;
        }
      }
    }

    .authentication-separator {
      color: $lightBlack;
      font-weight: bold;
      text-align: center;
    }
  }
}
</style>
