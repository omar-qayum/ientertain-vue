<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

library.add(faCircleCheck);
</script>

<template>
  <div class="thank-you-container">
    <icon class="icon" icon="fa-regular fa-circle-check" />
    <p>Order Successful!</p>
    <p>We will ship your order shortly.</p>
  </div>
</template>

<style lang="scss" scoped>
.thank-you-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  color: white;
  padding: 1rem;

  .icon {
    font-size: 5rem;
    color: $lightBlue;
  }

  p:nth-child(2) {
    font-size: 4rem;
  }

  p:nth-child(3) {
    font-size: 2rem;
  }
}
</style>
