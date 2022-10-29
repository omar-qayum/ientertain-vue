<script setup>
import { ref } from "vue";
import AuthenticationEmail from "@/components/authentication/AuthenticationEmail.vue";
import AuthenticationProvider from "@/components/authentication/AuthenticationProvider.vue";
import AuthenticationReset from "@/components/authentication/AuthenticationReset.vue";
import SiteModal from "@/components/site/SiteModal.vue";

const showModal = ref(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
};
</script>

<template>
  <div class="login-container">
    <div class="inner-container">
      <p class="slogan">Login</p>
      <AuthenticationProvider mode="login" />
      <p class="authentication-separator">or</p>
      <AuthenticationEmail mode="login" />
    </div>
    <p class="register-link">New to iEntertain? <RouterLink to="/register/bookworm">Register</RouterLink></p>
    <p class="password-reset-link">Forgot your password? <span @click="toggleModal()">Reset</span></p>
    <SiteModal v-if="showModal" @toggleModal="toggleModal()">
      <Suspense>
        <AuthenticationReset />
      </Suspense>
    </SiteModal>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: $navyBlue;
  gap: 0.5rem;

  .inner-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: clamp(280px, 100vw, 500px);
    overflow-y: auto;
    color: white;
    padding: 1rem;
    background-color: $skyBlue;
    border-radius: 0.75rem;

    .slogan {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
    }

    .authentication-separator {
      color: $lightBlack;
      font-weight: bold;
      text-align: center;
    }
  }

  .register-link {
    color: white;

    a {
      color: $lightBlack;

      &:hover {
        color: white;
      }
    }
  }

  .password-reset-link {
    color: white;

    span {
      color: $lightBlack;
      text-decoration: underline;

      &:hover {
        color: white;
      }
    }
  }
}
</style>
