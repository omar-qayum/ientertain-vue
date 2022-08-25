<script setup>
import { ref } from "vue";

const isDisabled = ref(0);

const aa = () => {
  isDisabled.value = true;
}
</script>

<template>
  <button :disabled="isDisabled" @click="aa()">Get</button>
</template>

<style lang="scss" scoped>
</style>
