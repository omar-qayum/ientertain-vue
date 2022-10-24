<script setup>
import SiteNavigationBar from "@/components/site/SiteNavigationBar.vue";
</script>

<template>
  <div class="site-container">
    <SiteNavigationBar class="nav-bar" />
    <div class="views">
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.site-container {
  .views {
    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 1s ease-out;
    }
  }
}

@media (min-height: 500px) {
  .site-container {
    .nav-bar {
      position: sticky;
      top: 0;
      z-index: 2;
    }
  }
}
</style>
