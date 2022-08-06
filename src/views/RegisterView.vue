<template>
  <div class="background">
    <div class="signin-container">
      <h1>Sign Up</h1>
      <form @submit.prevent="signUp">
        <input type="email" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Password" />
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <label for="PlanA">Plan A</label>
        <input type="radio" id="PlanA" value="Plan A" />
        <label for="PlanB">Plan B</label>
        <input type="radio" id="PlanB" value="Plan B" />
        <label for="PlanC">Plan C</label>
        <input type="radio" id="PlanC" value="Plan C" />
        <label for="PlanD">Plan D</label>
        <input type="radio" id="PlanD" value="Plan D" />
        <label for="PlanE">Plan E</label>
        <input type="radio" id="PlanE" value="Plan E" />
        <input type="submit" value="Sign Up" />
      </form>
      <h1>iEntertain</h1>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";

const router = useRouter();
const store = useStore();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const signUp = async () => {
  try {
    await store.dispatch("register", {
      email: email.value,
      password: password.value,
    });
    router.push("/account/home");
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<style lang="scss" scoped>
.background {
  background: url("../assets/img/signin.jpg") no-repeat center;
  background-size: cover;
  opacity: 0.75;
  height: 100%;
  position: relative;
}
h1 {
  margin: 0px;
  text-align: center;
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

    input[type="email"],
    input[type="password"] {
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
