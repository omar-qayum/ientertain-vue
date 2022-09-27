<script setup>
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGoogle, faGithub, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useUserStore } from "@/store/index.js";

library.add(faGoogle);
library.add(faFacebook);
library.add(faTwitter);
library.add(faGithub);

const userStore = useUserStore();
const email = ref("");
const password = ref("");
const errorMessage = ref("");
</script>

<template>
  <div class="outer-container">
    <div class="inner-container">
      <p class="slogan">Login</p>
      <form @submit.prevent="userStore.login('email', email, password)">
        <div class="login-container">
          <div class="oauth-container">
            <p>Login with Provider:</p>
            <div class="oauth-icons">
              <button class="oauth-button">
                <icon
                  class="oauth-icon"
                  icon="fa-brands fa-google"
                  @click="userStore.login('google')"
                />
              </button>
              <button class="oauth-button">
                <icon
                  class="oauth-icon"
                  icon="fa-brands fa-facebook"
                  @click="userStore.login('facebook')"
                />
              </button>
              <button class="oauth-button">
                <icon
                  class="oauth-icon"
                  icon="fa-brands fa-twitter"
                  @click="userStore.login('twitter')"
                />
              </button>
              <button class="oauth-button">
                <icon
                  class="oauth-icon"
                  icon="fa-brands fa-github"
                  @click="userStore.login('github')"
                />
              </button>
            </div>
          </div>
          <p class="separator">or</p>
          <div class="email-container">
            <p>Login with Email:</p>
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <input type="submit" value="Login" />
          </div>
        </div>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </form>
    </div>
    <p class="register-link">
      New to iEntertain? <RouterLink to="/register/bookworm">Register</RouterLink>
    </p>
    <p class="password-reset-link">Forgot your password? <RouterLink to="">Reset</RouterLink></p>
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
      gap: 1rem;

      .login-container {
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

  .register-link,
  .password-reset-link {
    color: white;

    a {
      color: $lightBlack;

      &:hover {
        color: white;
      }
    }
  }
}
</style>
