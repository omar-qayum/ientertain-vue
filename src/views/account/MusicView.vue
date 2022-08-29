<script setup>
import ItemCarousel from "@/components/ItemCarousel.vue";
import { useUserStore } from "@/store/index.js";

const userStore = useUserStore();
</script>

<template>
  <section>
    <h1 v-if="!userStore.categoryRecords.get('music').size">Page is loading... Please wait :)</h1>
    <ItemCarousel v-for="genre in userStore.categoryPreferences.get('music').keys()" :key="genre" :genre="genre"
      :records="userStore.categoryRecords.get('music').get(genre)">
      <template #music="{ record }">
        <div class="modal-inner-container">
          <iframe class="trailer" width="600" height="400"
            :src="`https://www.youtube.com/embed/${record.video}?autoplay=1&mute=1&vq=hd1080`" frameborder="0"
            allowfullscreen></iframe>
          <div class="details">
            <h1>{{ record.title }}</h1>
            <h3>
              {{ record.releaseDate }}
              {{ record.runtime }} <small>min</small>
              {{ record.voteAverage }}
            </h3>
          </div>
          <h4 class="summary">{{ record.overview }}</h4>
        </div>
      </template>
    </ItemCarousel>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal-inner-container {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(6, 1fr);
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 600px;
  width: 600px;
  background: #000000cc;
  border: white solid 1px;
  grid-template-areas:
    "trailer trailer trailer trailer trailer"
    "trailer trailer trailer trailer trailer"
    "trailer trailer trailer trailer trailer"
    "trailer trailer trailer trailer trailer"
    "details details details details details"
    "summary summary summary summary summary";
}

.trailer {
  grid-area: trailer;
}

.details {
  grid-area: details;
  align-items: center;

  h1 {
    margin: 0px;
  }

  h3 {
    margin: 0px;
    padding-top: 10px;
    word-spacing: 10px;
  }
}

.summary {
  margin: 0px;
  grid-area: summary;
  font-weight: lighter;
}
</style>
