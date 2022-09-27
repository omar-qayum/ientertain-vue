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
const props = defineProps(["mode", "plan"]);

const username = ref("");
const email = ref("");
const password = ref("");
const plan = ref(props.plan);
const errorMessage = ref("");

const verify = async (requestType) => {
  if (props.mode === "register") {
    await userStore.register(requestType, plan.value, username.value, email.value, password.value);
  } else {
    await userStore.login(requestType, email.value, password.value);
  }
};
</script>

<template>
  <div class="authentication-container">
    <form @submit.prevent="verify('email')">
      <div class="oauth-container">
        <p>{{ props.mode }} with Provider:</p>
        <div class="oauth-providers">
          <button class="oauth-button">
            <icon class="oauth-icon" icon="fa-brands fa-google" @click="verify('google')" />
          </button>
          <button class="oauth-button">
            <icon class="oauth-icon" icon="fa-brands fa-facebook" @click="verify('facebook')" />
          </button>
          <button class="oauth-button">
            <icon class="oauth-icon" icon="fa-brands fa-twitter" @click="verify('twitter')" />
          </button>
          <button class="oauth-button">
            <icon class="oauth-icon" icon="fa-brands fa-github" @click="verify('github')" />
          </button>
        </div>
      </div>
      <p class="separator">or</p>
      <div class="email-container">
        <p>{{ props.mode }} with Email:</p>
        <input
          v-if="props.mode === 'register'"
          type="text"
          v-model="username"
          placeholder="Username"
          required
        />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <input type="submit" :value="mode" />
      </div>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.authentication-container {
  background-color: $skyBlue;
  display: flex;
  flex-direction: column;
  text-justify: center;
  align-items: center;

  form {
    width: 100%;

    .oauth-container {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      gap: 0.5rem;

      p {
        font-weight: 700;
        align-self: start;
        color: $lightBlack;

        &::first-letter {
          text-transform: capitalize;
        }
      }

      .oauth-providers {
        display: flex;
        justify-content: space-evenly;

        .oauth-button {
          border: none;
          background-color: $skyBlue;

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
      background-color: $skyBlue;
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
      background-color: $skyBlue;

      p {
        font-weight: 700;
        align-self: start;
        color: $lightBlack;

        &::first-letter {
          text-transform: capitalize;
        }
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
        text-transform: capitalize;

        &:hover {
          transform: scale(1.1);
          transition: all 0.25s ease-in-out;
        }
      }
    }
  }
}
</style>
