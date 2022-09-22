<script setup>
import { ref } from "vue";

const props = defineProps(["tabs"]);

const option = ref(1);

const select = (choice) => {
  option.value = choice;
};
</script>

<template>
  <div class="tabs">
    <button @click="select(1)" :class="option === 1 ? 'active' : ''">About</button>
    <button @click="select(2)" :class="option === 2 ? 'active' : ''">Summary</button>
    <button @click="select(3)" :class="option === 3 ? 'active' : ''">Other</button>
  </div>
</template>

<style lang="scss" scoped></style>
