<script setup>
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGoogle, faGithub, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faBook, faGamepad, faFilm, faMusic } from "@fortawesome/free-solid-svg-icons";
import { useUserStore } from "@/store/index.js";

library.add(faGoogle);
library.add(faFacebook);
library.add(faTwitter);
library.add(faGithub);
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
      <p class="register-slogan">Register</p>
      <form @submit.prevent="userStore.register({ displayName: username, email, password, plan })">
        <input type="text" v-model="username" placeholder="Username" required />
        <div class="register-email">
          <p>Register with Email:</p>
          <input type="email" v-model="email" placeholder="Email" required />
          <input type="password" v-model="password" placeholder="Password" required />
        </div>
        <p class="register-separator">or</p>
        <div class="register-oauth">
          <p>Register with Provider:</p>
          <div class="oauth-icons">
            <icon class="oauth-icon" icon="fa-brands fa-google" />
            <icon class="oauth-icon" icon="fa-brands fa-facebook" />
            <icon class="oauth-icon" icon="fa-brands fa-twitter" />
            <icon class="oauth-icon" icon="fa-brands fa-github" />
          </div>
        </div>
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <div class="plans">
          <p class="plan-header">Plan</p>
          <icon class="plan-icon" icon="fa-solid fa-book" />
          <icon class="plan-icon" icon="fa-solid fa-gamepad" />
          <icon class="plan-icon" icon="fa-solid fa-film" />
          <icon class="plan-icon" icon="fa-solid fa-music" />
          <label for="bookworm" :selected="plan === 'bookworm'">
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
          <p class="plan-quota" :selected="plan === 'bookworm'">5</p>
          <p class="plan-quota" :selected="plan === 'bookworm'">2</p>
          <p class="plan-quota" :selected="plan === 'bookworm'">2</p>
          <p class="plan-quota" :selected="plan === 'bookworm'">2</p>
          <label for="geek" :selected="plan === 'geek'">
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
          <p class="plan-quota" :selected="plan === 'geek'">2</p>
          <p class="plan-quota" :selected="plan === 'geek'">5</p>
          <p class="plan-quota" :selected="plan === 'geek'">2</p>
          <p class="plan-quota" :selected="plan === 'geek'">2</p>
          <label for="binger" :selected="plan === 'binger'"
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
          <p class="plan-quota" :selected="plan === 'binger'">2</p>
          <p class="plan-quota" :selected="plan === 'binger'">2</p>
          <p class="plan-quota" :selected="plan === 'binger'">5</p>
          <p class="plan-quota" :selected="plan === 'binger'">2</p>
          <label for="audiophile" :selected="plan === 'audiophile'">
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
          <p class="plan-quota" :selected="plan === 'audiophile'">2</p>
          <p class="plan-quota" :selected="plan === 'audiophile'">2</p>
          <p class="plan-quota" :selected="plan === 'audiophile'">2</p>
          <p class="plan-quota" :selected="plan === 'audiophile'">5</p>
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
    width: clamp(280px, 100vw, 500px);
    overflow-y: auto;

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
      gap: 0.5rem;

      input[type="text"] {
        width: 100%;
        font-size: 1.25rem;
        color: $darkBlack;
      }

      .register-email {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        gap: 0.5rem;
        background-color: $lightBlue;

        p {
          font-weight: 700;
          align-self: start;
          color: $lightBlack;
        }
        input {
          width: 100%;
          font-size: 1.25rem;
          color: $darkBlack;
        }
      }

      .register-separator {
        font-weight: 700;
        color: $lightBlack;
      }

      .register-oauth {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        gap: 0.5rem;
        background-color: $lightBlue;

        p {
          font-weight: 700;
          align-self: start;
          color: $lightBlack;
        }

        .oauth-icons {
          display: flex;
          justify-content: space-evenly;
          width: 100%;

          .oauth-icon {
            font-size: 1.75rem;
            color: red;
          }
        }
      }

      .plans {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        justify-items: center;
        align-items: center;
        padding: 1rem;
        gap: 0.5rem;
        background-color: $lightBlue;

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
          font-weight: bold;

          &[selected="true"] {
            color: $lightBlack;
          }

          input[type="radio"] {
            height: 1rem;
            width: 1rem;
          }
        }

        .plan-quota {
          font-size: 1.25rem;
          font-weight: bold;
          color: white;
        }

        p[selected="true"] {
          color: $lightBlack;
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
