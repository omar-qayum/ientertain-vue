<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/index.js";

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
  <div class="email-container">
    <p>{{ props.mode }} with Email:</p>
    <form @submit.prevent="verify('email')">
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
    </form>
    <!-- <p v-if="errorMessage">{{ errorMessage }}</p> -->
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
</style>
