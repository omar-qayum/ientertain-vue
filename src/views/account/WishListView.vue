<script setup>
import { useUserStore } from "@/store/index.js";
import SiteTabs from "@/components/site/SiteTabs.vue";
import TilesPage from "@/components/tiles/TilesPage.vue";

const userStore = useUserStore();
</script>

<template>
  <div class="wishlist-container">
    <p class="heading">Wishlist</p>
    <template v-if="userStore.getWishlistSize()">
      <SiteTabs :tabs="['books', 'games', 'movies', 'music']">
        <template v-for="(category, categoryIndex) in ['books', 'games', 'movies', 'music']" :key="category" #[categoryIndex]>
          <TilesPage :category="category" :records="Array.from(userStore.wishlists.get(category).values())" :controls="true" />
        </template>
      </SiteTabs>
    </template>
    <template v-else>
      <p class="empty">Your wishlist is empty.</p>
    </template>
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

  .empty {
    font-weight: bold;
    font-size: 1.25rem;
    color: $lightBlue;
  }
}
</style>
