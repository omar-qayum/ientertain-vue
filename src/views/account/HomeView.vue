<template>
  <h1>{{`Welcome ${userStore.user.displayName}!`}}</h1>
  <TrialTimer></TrialTimer>
</template>

<script setup>
import { useUserStore } from "../../store/index.js";
import TrialTimer from "../../components/TrialTimer.vue";

const userStore = useUserStore();
</script>

<style>
</style>
