<script setup>
import SiteQuotaTimer from "@/components/site/SiteQuotaTimer.vue";
import TilesGrid from "@/components/tiles/TilesGrid.vue";
</script>

<template>
  <div class="home-container">
    <SiteQuotaTimer class="timer" />
    <TilesGrid v-for="(category, index) in ['books', 'games', 'movies', 'music']" :key="category" class="tiles-grid" :category="category" :start="index" />
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 1rem;
  gap: 1rem;

  .timer {
    grid-column: span 4;
    align-self: center;
    justify-self: center;
  }

  .tiles-grid {
    grid-column: span 4;
  }
}

@media (min-width: 550px) {
  .home-container {
    .tiles-grid {
      grid-column: span 2;
    }
  }
}

@media (min-width: 1100px) {
  .home-container {
    .tiles-grid {
      grid-column: span 1;
    }
  }
}
</style>
