<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/index.js";

const userStore = useUserStore();
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const unixExpirationDate = userStore.expiry.seconds * 1000;

setInterval(() => {
  const time = unixExpirationDate - Date.now();
  const sec = Math.floor(time / 1000);
  const min = Math.floor(sec / 60);
  const hrs = Math.floor(min / 60);
  const day = Math.floor(hrs / 24);

  days.value = day < 10 ? "0" + day : day;
  hours.value = hrs % 24 < 10 ? "0" + (hrs % 24) : hrs % 24;
  minutes.value = min % 60 < 10 ? "0" + (min % 60) : min % 60;
  seconds.value = sec % 60 < 10 ? "0" + (sec % 60) : sec % 60;
}, 1000);
</script>

<template>
  <div class="timer-container">
    <p>Your plan quota will reset in:</p>
    <div class="timer">
      <p>{{ days }}</p>
      <p>:</p>
      <p>{{ hours }}</p>
      <p>:</p>
      <p>{{ minutes }}</p>
      <p>:</p>
      <p>{{ seconds }}</p>
      <p>days</p>
      <p>hours</p>
      <p>minutes</p>
      <p>seconds</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timer-container {
  p {
    font-weight: 700;
    font-size: 1.25rem;
    text-align: center;
    color: white;
  }

  .timer {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    align-items: center;

    p:nth-child(1),
    p:nth-child(3),
    p:nth-child(5),
    p:nth-child(7) {
      font-weight: 700;
      font-size: 2rem;
      justify-self: center;
      color: $navyBlue;
    }

    p:nth-child(2),
    p:nth-child(4),
    p:nth-child(6) {
      font-weight: 700;
      font-size: 2rem;
      justify-self: center;
      color: $navyBlue;
    }

    p:nth-child(8) {
      grid-column: 1 / 2;
      justify-self: center;
      color: $lightBlue;
    }

    p:nth-child(9) {
      grid-column: 3 / 4;
      justify-self: center;
      color: $lightBlue;
    }

    p:nth-child(10) {
      grid-column: 5 / 6;
      justify-self: center;
      color: $lightBlue;
    }

    p:nth-child(11) {
      grid-column: 7 / 8;
      justify-self: center;
      color: $lightBlue;
    }
  }
}
</style>
