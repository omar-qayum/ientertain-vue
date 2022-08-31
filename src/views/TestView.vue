<script setup>
import { ref } from "vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

library.add(faCartShopping);
</script>

<template>
<div class="nav-container">
<h2>Movies: 5</h2>
<h2>Movies: 5</h2>
<h2>Movies: 5</h2>
<h2>Movies: 5</h2>
</div>
</template>

<style lang="scss" scoped>
.nav-container {
  display: flex;
  gap: 20px;
  height: 50px;
}
</style>
