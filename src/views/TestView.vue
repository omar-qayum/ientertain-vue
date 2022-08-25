<script setup>
import { ref } from 'vue';
// const genres = new Set(["Action", "Adventure", "Drama", "Horror", "Mystery"]);
// const map = ref(genres);

const genres = "Hello";
const map = ref(genres);

const increase = () => {
  map.value = "";
}
</script>

<template>
  <button @click="increase()">gdfgdfgdf</button>
  {{genres}}
  <br/>
  {{map}}
</template>

<style lang="scss" scoped>
</style>
