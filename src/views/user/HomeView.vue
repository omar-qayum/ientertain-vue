<template>
  <h1>{{`Welcome ${store.state.user.displayName}!`}}</h1>
  <TrialTimer></TrialTimer>
  {{ store.state }}
</template>

<script setup>
import { useStore } from 'vuex';
import TrialTimer from "../../components/TrialTimer.vue";

const store = useStore();
</script>

<style>
</style>
