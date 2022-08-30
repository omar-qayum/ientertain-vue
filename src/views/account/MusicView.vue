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
          <div class="details-container">
            <img :src="record.posterPath" />
            <div>
              <h2>{{  record.albumName  }}</h2>
              <h3>{{  record.artist  }}</h3>
              <h3>{{  record.releaseDate  }}</h3>
              <h3>{{  record.totalTracks  }}</h3>
            </div>
          </div>
          <div class="tracks">
            <h4 v-for="track in record.tracks" :key="track">{{  track.trackName  }}<audio controls>
                <source :src="track.trackPreview" type="audio/ogg">
              </audio></h4>
          </div>
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

  .modal-inner-container {
    padding: 20px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 600px;
    width: 600px;
    background: #000000cc;
    border: white solid 1px;

    .details-container {
      display: flex;

      img {
        width: 150px;
        height: 200px;
      }
      h1 {}

      h3 {
        padding-top: 10px;
        word-spacing: 10px;
      }
    }
  }
}
</style>
