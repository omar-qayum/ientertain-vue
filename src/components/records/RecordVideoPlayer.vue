<script setup>
import { ref } from "vue";
import SiteTabs from "@/components/site/SiteTabs.vue";

const props = defineProps(["videos"]);
const tabs = ref(
  Array.from(Object.keys(props.videos)).map((key) => {
    return parseInt(key, 10) + 1;
  })
);
</script>
<template>
  <div class="video-player-container">
    <template v-if="props.videos.length">
      <SiteTabs class="tabs" :tabs="tabs">
        <template v-for="(video, index) in props.videos" :key="video" #[index]>
          <iframe class="video" :src="`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&vq=hd1080`" frameborder="0" allowfullscreen></iframe>
        </template>
      </SiteTabs>
    </template>
    <template v-else><p>No trailers are available for this movie.</p></template>
  </div>
</template>

<style lang="scss" scoped>
.video-player-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  width: 100%;
  height: 100%;

  .tabs {
    grid-column: span 10;
    grid-row: span 10;

    .video {
      height: 100%;
      width: 100%;
      color: white;
    }
  }

  p {
    grid-column: span 10;
    font-weight: bold;
    color: $lightBlue;
  }
}
</style>
