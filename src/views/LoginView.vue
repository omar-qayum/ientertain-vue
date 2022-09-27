<script setup>
import SiteAuthentication from "@/components/site/SiteAuthentication.vue";
</script>

<template>
  <div class="outer-container">
    <div class="inner-container">
      <p class="slogan">Login</p>
      <SiteAuthentication mode="login" />
    </div>
    <p class="register-link">
      New to iEntertain? <RouterLink to="/register/bookworm">Register</RouterLink>
    </p>
    <p class="password-reset-link">Forgot your password? <RouterLink to="">Reset</RouterLink></p>
  </div>
</template>

<style lang="scss" scoped>
.outer-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: $navyBlue;

  .inner-container {
    width: clamp(280px, 100vw, 500px);
    overflow-y: auto;
    color: white;

    .slogan {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
    }
  }

  .register-link,
  .password-reset-link {
    color: white;

    a {
      color: $lightBlack;

      &:hover {
        color: white;
      }
    }
  }
}
</style>
