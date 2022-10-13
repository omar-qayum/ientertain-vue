<script setup>
import { useUserStore } from "@/store/index.js";
import SiteTabs from "@/components/site/SiteTabs.vue";
import TilesPage from "@/components/tiles/TilesPage.vue";
</script>

<template>
  <div class="wishlist-container">
    <p class="heading">Wishlist</p>
    <SiteTabs :tabs="['books', 'games', 'movies', 'music']">
      <template v-for="category in ['books', 'games', 'movies', 'music']" :key="category" #[category]>
        <TilesPage :category="category" :records="Array.from(useUserStore().wishlists.get(category).values())" :controls="true" />
      </template>
    </SiteTabs>
  </div>
</template>

<style lang="scss" scoped>
.wishlist-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  .heading {
    color: $navyBlue;
    font-weight: 700;
    font-size: 1.5rem;
  }
}
</style>
