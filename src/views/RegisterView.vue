<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/index.js";
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";

const props = defineProps(["plan"]);
const storage = getStorage();
const userStore = useUserStore();

const backgroundImage = ref(await getDownloadURL(storageRef(storage, 'site/main/signin.jpg')));

const username = ref("");
const email = ref("");
const password = ref("");
const plan = ref(props.plan);
const errorMessage = ref("");
</script>

<template>
  <div class="background"
    :style="`background: url(${backgroundImage}) no-repeat center; position: relative; background-size: cover; height: 100vh; opacity: 0.75;`">
    <div class="signin-container">
      <h1>Register</h1>
      <form @submit.prevent="userStore.register({ displayName: username, email: email, password: password, plan: plan })">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <h3>Select a plan:</h3>
        <label for="connoisseur">Connoisseur</label>
        <input type="radio" v-model="plan" name="connoisseur" id="connoisseur" value="connoisseur"
          :checked="props.plan === 'connoisseur'" />
        <label for="bookworm">Bookworm</label>
        <input type="radio" v-model="plan" name="bookworm" id="bookworm" value="bookworm"
          :checked="props.plan === 'bookworm'" />
        <label for="geek">Geek</label>
        <input type="radio" v-model="plan" name="geek" id="geek" value="geek" :checked="props.plan === 'geek'" />
        <label for="binger">Binger</label>
        <input type="radio" v-model="plan" name="binger" id="binger" value="binger"
          :checked="props.plan === 'binger'" />
        <label for="audiophile">Audiophile</label>
        <input type="radio" v-model="plan" name="audiophile" id="audiophile" value="audiophile"
          :checked="props.plan === 'audiophile'" />
        <input type="submit" value="Register!" />
      </form>
      <h1>iEntertain</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background {
  position: relative;
}

h1 {
  margin: 0px;
  text-align: center;
}

.signin-container {
  position: absolute;
  height: 800px;
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

    input[type="text"],
    input[type="email"],
    input[type="password"] {
      margin-top: 20px;
      height: 50px;
      width: 100%;
    }

    input[type="submit"] {
      background: $red;
      height: 50px;
      width: 100%;
      border: none;
    }
  }
}
</style>
