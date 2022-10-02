<script setup>
import SiteQuotaTimer from "@/components/site/SiteQuotaTimer.vue";
import GridCarousel from "@/components/carousel/GridCarousel.vue";
</script>

<template>
  <div class="home-container">
    <SiteQuotaTimer class="timer" />
    <GridCarousel v-for="(category, index) in ['books', 'games', 'movies', 'music']" :key="category" class="grid-carousel" :category="category" :start="index" />
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

  .grid-carousel {
    grid-column: span 4;
  }
}

@media (min-width: 550px) {
  .home-container {
    .grid-carousel {
      grid-column: span 2;
    }
  }
}

@media (min-width: 1200px) {
  .home-container {
    .grid-carousel {
      grid-column: span 1;
    }
  }
}
</style>
