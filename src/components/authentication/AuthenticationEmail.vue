<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import { auth } from "@/firebase/index.js";
import ButtonText from "@/components/buttons/ButtonText.vue";
import AuthenticateUser from "@/components/authentication/AuthenticateUser.vue";
import SiteLoading from "@/components/site/SiteLoading.vue";

const props = defineProps(["mode", "plan"]);
const router = useRouter();

const plan = ref(props.plan);
const username = ref("");
const email = ref("");
const password = ref("");
const user = ref(null);
const authenticate = ref(false);
const disableButton = ref(false);
const errorCode = ref("");
const form = ref(null);

const authenticateUser = async () => {
  try {
    disableButton.value = true;
    if (props.mode === "register") {
      user.value = (await createUserWithEmailAndPassword(auth, email.value, password.value)).user;
      await updateProfile(user.value, {
        displayName: username.value,
        photoURL: await getDownloadURL(storageRef(getStorage(), "site/avatars/1.png")),
      });
    } else {
      user.value = (await signInWithEmailAndPassword(auth, email.value, password.value)).user;
    }
    authenticate.value = true;
  } catch (error) {
    errorCode.value = error.code;
    disableButton.value = false;
    authenticate.value = false;
    form.value.classList.add("animation");
    setTimeout(() => {
      form.value.classList.remove("animation");
    }, 1000);
  }
};

const resolve = () => {
  router.push("/categories/home");
};
</script>

<template>
  <div class="email-container" ref="form">
    <p>{{ props.mode }} with Email:</p>
    <form @submit.prevent="authenticateUser">
      <input v-if="props.mode === 'register'" type="text" v-model="username" placeholder="Username" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <ButtonText>{{ props.mode }}</ButtonText>
    </form>
    <p class="error-code" v-if="errorCode">{{ errorCode }}</p>
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
.email-container {
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

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;

    input {
      width: 100%;
      font-size: 1rem;
      color: $darkBlack;
      border: none;
      padding: 0.2rem;
    }
  }

  .error-code {
    color: white;
    text-align: center;
    font-size: 1.25rem;
    width: 100%;
  }

  &.animation {
    animation: shake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
