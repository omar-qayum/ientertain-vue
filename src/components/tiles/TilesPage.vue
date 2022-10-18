<script setup>
import { ref } from "vue";
import RecordControls from "@/components/records/RecordControls.vue";
import SiteModal from "@/components/site/SiteModal.vue";
import BookRecord from "@/components/records/BookRecord.vue";
import GameRecord from "@/components/records/GameRecord.vue";
import MovieRecord from "@/components/records/MovieRecord.vue";
import MusicRecord from "@/components/records/MusicRecord.vue";

const props = defineProps(["category", "records", "controls"]);
const selectedRecordId = ref(0);
const showModal = ref(false);

const toggleModal = (record) => {
  showModal.value = !showModal.value;
  selectedRecordId.value = record.id;
};
</script>

<template>
  <div class="tiles-page-container">
    <div class="tiles">
      <div v-for="record in props.records" :key="record.id" class="record">
        <img :src="record.image" loading="lazy" @click="toggleModal(record)" />
        <RecordControls v-if="props.controls" class="controls" :category="props.category" :record="record" />
      </div>
    </div>
    <SiteModal v-if="showModal" @toggleModal="toggleModal()">
      <BookRecord v-if="category === 'books'" :id="selectedRecordId" />
      <GameRecord v-else-if="category === 'games'" :id="selectedRecordId" />
      <MovieRecord v-else-if="category === 'movies'" :id="selectedRecordId" />
      <MusicRecord v-else :id="selectedRecordId" />
    </SiteModal>
  </div>
</template>

<style lang="scss" scoped>
.tiles-page-container {
  .tiles {
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
</style>
