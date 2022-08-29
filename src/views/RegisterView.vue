<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "@/store/index.js";
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";

const storage = getStorage();
const router = useRouter();
const userStore = useUserStore();
const username = ref("");
const email = ref("");
const password = ref("");
const plan = ref("Plan A");
const errorMessage = ref("");
const backgroundImage = ref(await getDownloadURL(storageRef(storage, 'site/main/signin.jpg')));

const register = async () => {
  try {
    await userStore.register({
      displayName: username.value,
      email: email.value,
      password: password.value,
      plan: plan.value,
    });
    router.push("/account/home");
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <div class="background"
    :style="`background: url(${backgroundImage}) no-repeat center; position: relative; background-size: cover; height: 100vh; opacity: 0.75;`">
    <div class="signin-container">
      <h1>Register</h1>
      <form @submit.prevent="register()">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <p v-if="errorMessage">{{  errorMessage  }}</p>
        <h3>Select a plan:</h3>
        <label for="PlanA">Plan A</label>
        <input type="radio" v-model="plan" name="plan" id="PlanA" value="Plan A" checked="checked" />
        <label for="PlanB">Plan B</label>
        <input type="radio" v-model="plan" name="plan" id="PlanB" value="Plan B" />
        <label for="PlanC">Plan C</label>
        <input type="radio" v-model="plan" name="plan" id="PlanC" value="Plan C" />
        <label for="PlanD">Plan D</label>
        <input type="radio" v-model="plan" name="plan" id="PlanD" value="Plan D" />
        <label for="PlanE">Plan E</label>
        <input type="radio" v-model="plan" name="plan" id="PlanE" value="Plan E" />
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
