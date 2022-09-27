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
  <div class="outer-container">
    <div class="inner-container">
      <p class="slogan">Register</p>
      <form @submit.prevent="userStore.register('email', username, email, password, plan)">
        <div class="plans-container">
          <p class="plans-message">Select your Plan:</p>
          <p class="plan-header">Plans</p>
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
        <div class="register-container">
          <div class="oauth-container">
            <p>Register with Provider:</p>
            <div class="oauth-icons">
              <button class="oauth-button">
                <icon
                  class="oauth-icon"
                  icon="fa-brands fa-google"
                  @click="userStore.register('google', null, null, null, plan)"
                />
              </button>
              <button class="oauth-button">
                <icon
                  class="oauth-icon"
                  icon="fa-brands fa-facebook"
                  @click="userStore.register('facebook', null, null, null, plan)"
                />
              </button>
              <button class="oauth-button">
                <icon
                  class="oauth-icon"
                  icon="fa-brands fa-twitter"
                  @click="userStore.register('twitter', null, null, null, plan)"
                />
              </button>
              <button class="oauth-button">
                <icon
                  class="oauth-icon"
                  icon="fa-brands fa-github"
                  @click="userStore.register('github', null, null, null, plan)"
                />
              </button>
            </div>
          </div>
          <p class="separator">or</p>
          <div class="email-container">
            <p>Register with Email:</p>
            <input type="text" v-model="username" placeholder="Username" required />
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <input type="submit" value="Register" />
          </div>
        </div>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.outer-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: $navyBlue;

  .inner-container {
    width: clamp(280px, 100vw, 500px);
    overflow-y: auto;
    color: white;

    .slogan {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;
      text-justify: center;
      align-items: center;
      background-color: $skyBlue;
      padding: 1rem;
      gap: 0.5rem;

      .plans-container {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        justify-items: center;
        align-items: center;
        padding: 1rem;
        gap: 0.5rem;
        background-color: $lightBlue;

        .plans-message {
          grid-column: span 5;
          justify-self: start;
          font-weight: 700;
          align-self: start;
          color: $lightBlack;
        }

        .plan-header {
          font-size: 1.5rem;
          font-weight: 700;
          color: $lightBlue;
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

      .register-container {
        display: flex;
        flex-direction: column;
        width: 100%;

        .oauth-container {
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

            .oauth-button {
              border: none;
              background-color: $lightBlue;

              .oauth-icon {
                color: $lightBlack;
                font-size: 2.5rem;

                &:hover {
                  transform: scale(1.2);
                  transition: all 0.3s ease-in-out;
                }
              }
            }
          }
        }

        .separator {
          font-weight: 700;
          background-color: $lightBlue;
          color: $lightBlack;
          text-align: center;
          width: 100%;
        }

        .email-container {
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
            font-size: 1rem;
            color: $darkBlack;
            border: none;
            padding: 0.2rem;
          }

          input[type="submit"] {
            width: auto;
            background: $red;
            border: none;
            padding: 0.75rem;
            border-radius: 0.5rem;
            font-weight: bold;
            cursor: pointer;
            align-self: center;
            color: white;

            &:hover {
              transform: scale(1.1);
              transition: all 0.25s ease-in-out;
            }
          }
        }
      }
    }
  }
}
</style>
