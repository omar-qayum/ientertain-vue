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

const plan = ref(props.plan);
const username = ref("");
const email = ref("");
const password = ref("");
// const errorMessage = ref("");

const verify = async (requestType) => {
  if (props.mode === "register") {
    await userStore.register(requestType, plan.value, username.value, email.value, password.value);
  } else {
    await userStore.login(requestType, email.value, password.value);
  }
};
</script>

<template>
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
    <!-- <p v-if="errorMessage">{{ errorMessage }}</p> -->
  </div>
</template>

<style lang="scss" scoped>
.oauth-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

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
</style>
