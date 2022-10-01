<script setup>
import { useUserStore } from "@/store/index.js";
import SiteTrialTimer from "@/components/site/SiteTrialTimer.vue";

const userStore = useUserStore();
</script>

<template>
  <p>{{ `Welcome ${userStore.user.displayName}!` }}</p>
  <SiteTrialTimer></SiteTrialTimer>
</template>

<style></style>
