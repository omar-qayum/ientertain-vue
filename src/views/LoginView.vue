<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/index.js";

const userStore = useUserStore();
const email = ref("");
const password = ref("");
const errorMessage = ref("");
</script>

<template>
  <div class="login-container">
    <h1>Welcome Back!</h1>
    <form @submit.prevent="userStore.login({ email, password })">
      <h1>Login</h1>
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <input type="submit" value="Login" />
    </form>
    <p>New to iEntertain? <router-link to="/register/connoisseur">Register now</router-link></p>
    <p>Forgot your password? <router-link to="">Reset</router-link></p>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: $navyBlue;
  box-sizing: border-box;
  height: 100vh;

  h1 {
    font-size: 3rem;
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

    h1 {
      font-size: 2rem;
      color: $lightBlack;
    }

    input[type="email"],
    input[type="password"] {
      font-size: 1.25rem;
      color: $darkBlack;
    }

    input[type="submit"] {
      background: $red;
      border: none;
      color: white;
      padding: 0.75rem;
      font-size: 1rem;
      border-radius: 0.75rem;
      font-weight: bold;
    }
  }
}
</style>
