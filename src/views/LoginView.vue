<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/index.js";
import { ref } from "vue";
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";

const storage = getStorage();
const router = useRouter();
const userStore = useUserStore();
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const backgroundImage = ref(await getDownloadURL(storageRef(storage, 'site/main/signin.jpg')));

const login = async () => {
  try {
    await userStore.login({
      email: email.value,
      password: password.value,
    });
    router.push("/user/home");
  } catch (error) {
    errorMessage.value = error;
  }
};
</script>

<template>
  <div class="background"
    :style="`background: url(${backgroundImage}) no-repeat center; position: relative; background-size: cover; height: 100vh; opacity: 0.75;`">
    <div class="signin-container">
      <form @submit.prevent="login">
        <label>Login</label>
        <input type="email" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Password" />
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <input type="submit" value="Login" />
      </form>
      <p>
        New to iEntertain? <router-link to="/register">Register now</router-link>
      </p>
      <h1>iEntertain</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background {
  position: relative;
}

.signin-container {
  position: absolute;
  height: 600px;
  width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #00000099;
  box-sizing: border-box;
  padding: 50px;

  form {
    display: flex;
    flex-direction: column;
    text-justify: center;
    align-items: center;
    opacity: 1;

    label {
      font-size: xx-large;
    }

    input {
      margin-top: 20px;
      height: 50px;
      width: 100%;
    }

    input[type="submit"] {
      background: red;
      height: 50px;
      width: 100%;
      border: none;
    }
  }
}
</style>
