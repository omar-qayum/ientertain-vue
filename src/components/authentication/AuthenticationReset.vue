<script setup>
import { ref } from "vue";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/index.js";
import ButtonText from "@/components/buttons/ButtonText.vue";

const email = ref(null);
const prompt = ref("");

const reset = async () => {
  try {
    await sendPasswordResetEmail(auth, email.value);
    prompt.value = "A password reset link has been sent to your email!";
  } catch (error) {
    prompt.value = error.code;
  }
};
</script>

<template>
  <div class="reset-container">
    <p class="heading">Password Reset</p>
    <p class="message">Please enter the email address registered with your account</p>
    <div class="reset">
      <input type="email" v-model="email" placeholder="Email" required />
      <ButtonText @click="reset()">Reset</ButtonText>
    </div>
    <p v-if="prompt" class="prompt">{{ prompt }}</p>
    <p class="logo">iEntertain</p>
  </div>
</template>

<style lang="scss" scoped>
.reset-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  height: 100%;

  .heading {
    color: $navyBlue;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .message {
    color: white;
    font-size: 1.25rem;
    font-weight: bold;
  }

  .reset {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    input {
      width: 100%;
      max-width: 500px;
      font-size: 1.25rem;
      color: $darkBlack;
      border: none;
      padding: 0.2rem;
      outline: none;
    }
  }

  .prompt {
    color: $lightBlue;
    font-size: 1.25rem;
  }

  .logo {
    color: white;
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
  }
}
</style>
