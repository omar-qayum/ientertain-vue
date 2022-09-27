<script setup>
import { useUserStore } from "@/store/index.js";
import SiteTrialTimer from "@/components/site/SiteTrialTimer.vue";

const userStore = useUserStore();
</script>

<template>
  <h1>{{`Welcome ${userStore.user.displayName}!`}}</h1>
  <SiteTrialTimer></SiteTrialTimer>
</template>

<style>
</style>
