<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/index.js";
import SiteTabs from "@/components/site/SiteTabs.vue";
import RecordControls from "@/components/records/RecordControls.vue";
import SiteModal from "@/components/site/SiteModal.vue";
import BookRecord from "@/components/records/BookRecord.vue";
import GameRecord from "@/components/records/GameRecord.vue";
import MovieRecord from "@/components/records/MovieRecord.vue";
import MusicRecord from "@/components/records/MusicRecord.vue";

const userStore = useUserStore();
const selectedRecord = ref({});
const showModal = ref(false);

const toggleModal = (record) => {
  showModal.value = !showModal.value;
  selectedRecord.value = record;
};
</script>

<template>
  <div class="wishlist-container">
    <p class="heading">Wishlist</p>
    <SiteTabs :tabs="['books', 'games', 'movies', 'music']" class="tabs">
      <template v-for="category in ['books', 'games', 'movies', 'music']" :key="category" #[category]>
        <div class="records">
          <div v-for="record in Array.from(userStore.wishlists.get(category).values())" :key="record.id" class="record">
            <img :src="record.image" loading="lazy" @click="toggleModal(record)" />
            <RecordControls class="controls" :category="category" :record="record" />
          </div>
        </div>
        <SiteModal v-if="showModal" @toggleModal="toggleModal()">
          <BookRecord v-if="category === 'books'" :record="selectedRecord" />
          <GameRecord v-else-if="category === 'games'" :record="selectedRecord" />
          <MovieRecord v-else-if="category === 'movies'" :record="selectedRecord" />
          <MusicRecord v-else :record="selectedRecord" />
        </SiteModal>
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

  .tabs {
    .records {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
      gap: 0.5rem;
      width: clamp(calc(280px - 2rem), calc(100vw - 2rem), calc(1920px - 2rem));

      .record {
        position: relative;

        img {
          background: grey;
          width: 100%;
          aspect-ratio: 3 / 4;
        }

        .controls {
          position: absolute;
          width: 100%;
          bottom: 0.5rem;
          opacity: 0.75;
        }
      }
    }
  }
}
</style>
