<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/index.js";

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
  <div>
    {{ `${days} : ${hours} : ${minutes} : ${seconds}` }}
  </div>
</template>

<style lang="scss" scoped>
</style>