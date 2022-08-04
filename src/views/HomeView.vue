<template>
  <nav>
    <router-link to="/home">Home</router-link>
    <router-link to="/movies">Movies</router-link>
    <router-link to="/games">Games</router-link>
    <router-link to="/music">Music</router-link>
    <router-link to="/books">Books</router-link>
  </nav>
  <section>
    <ItemCarousel></ItemCarousel>
  </section>
</template>

<script setup>
import ItemCarousel from "../components/ItemCarousel.vue"

</script>

<style lang="scss" scoped>
nav {
  display: flex;
  gap: 20px;
  background: $red;
  height: 50px;
  align-items: center;
  a {
    text-decoration: none;
    padding: 10px;
    color: black;
  }
  a:hover {
    background: white;
  }
}
section {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
