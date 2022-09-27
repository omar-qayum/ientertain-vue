<script setup>
import SiteNavigationBar from "@/components/site/SiteNavigationBar.vue";
</script>

<template>
  <SiteNavigationBar />
  <div class="views">
    <RouterView v-slot="{ Component, route }">
      <Transition :name="route.meta.direction">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </div>
</template>

<style lang="scss" scoped>
.views {
  position: relative;

  // Left scroll animation
  .left-enter-active,
  .left-leave-active {
    transition: all 0.75s ease-out;
  }

  .left-leave-from {
    position: absolute;
    left: 0;
  }

  .left-leave-to {
    position: absolute;
    left: -100%;
  }

  .left-enter-from {
    position: absolute;
    right: -100%;
  }

  .left-enter-to {
    position: absolute;
    right: 0;
  }

  // Right scroll animation
  .right-enter-active,
  .right-leave-active {
    transition: all 0.75s ease-out;
  }

  .right-leave-from {
    position: absolute;
    left: 0;
  }

  .right-leave-to {
    position: absolute;
    left: 100%;
  }

  .right-enter-from {
    position: absolute;
    right: 100%;
  }

  .right-enter-to {
    position: absolute;
    right: 0;
  }
}
</style>
