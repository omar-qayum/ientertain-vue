<template>
  <h1>{{`Welcome ${store.state.displayName}!`}}</h1>
  <TrialTimer></TrialTimer>
  {{store.getters.getMoviePrefernces}}
</template>

<script setup>
import { useStore } from 'vuex';
import TrialTimer from "../../components/TrialTimer.vue";

const store = useStore();
</script>

<style>

</style>
