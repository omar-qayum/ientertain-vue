<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGoogle, faGithub, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { auth } from "@/firebase/index.js";
import AuthenticateUser from "@/components/authentication/AuthenticateUser.vue";
import SiteLoading from "@/components/site/SiteLoading.vue";

library.add(faGoogle);
library.add(faFacebook);
library.add(faTwitter);
library.add(faGithub);

const props = defineProps(["mode", "plan"]);
const router = useRouter();

const plan = ref(props.plan);
const user = ref(null);
const authenticate = ref(false);
const errorCode = ref("");

const authenticateUser = async (provider) => {
  try {
    switch (provider) {
      case "google":
        user.value = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
        break;
      case "facebook":
        user.value = (await signInWithPopup(auth, new FacebookAuthProvider())).user;
        break;
      case "twitter":
        user.value = (await signInWithPopup(auth, new TwitterAuthProvider())).user;
        break;
      default:
        user.value = (await signInWithPopup(auth, new GithubAuthProvider())).user;
        break;
    }
    if (props.mode === "register") {
      await updateProfile(user.value, {
        displayName: user.value.displayName,
        photoURL: await getDownloadURL(storageRef(getStorage(), "site/avatars/1.png")),
      });
    }
    authenticate.value = true;
  } catch (error) {
    errorCode.value = error.code;
  }
};

const resolve = () => {
  router.push("/categories/home");
};
</script>

<template>
  <div class="oauth-container">
    <p>{{ props.mode }} with Provider:</p>
    <div class="oauth-providers">
      <button class="oauth-button">
        <icon class="oauth-icon" icon="fa-brands fa-google" @click="authenticateUser('google')" />
      </button>
      <button class="oauth-button">
        <icon
          class="oauth-icon"
          icon="fa-brands fa-facebook"
          @click="authenticateUser('facebook')"
        />
      </button>
      <button class="oauth-button">
        <icon class="oauth-icon" icon="fa-brands fa-twitter" @click="authenticateUser('twitter')" />
      </button>
      <button class="oauth-button">
        <icon class="oauth-icon" icon="fa-brands fa-github" @click="authenticateUser('github')" />
      </button>
    </div>
    <p v-if="errorCode">{{ errorCode }}</p>
    <Suspense v-if="authenticate" @resolve="resolve">
      <template #default>
        <AuthenticateUser :mode="props.mode" :user="user" :plan="plan" />
      </template>
      <template #fallback>
        <Teleport to="body">
          <SiteLoading>
            <p>Hi {{ user.displayName }}!</p>
            <p v-if="props.mode === 'register'">Please wait while we register your account.</p>
            <p v-else>Please wait while we log you in.</p>
          </SiteLoading>
        </Teleport>
      </template>
    </Suspense>
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
