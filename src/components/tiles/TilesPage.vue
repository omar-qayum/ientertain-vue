<script setup>
import { ref } from "vue";
import axios from "axios";
import { useUserStore } from "@/store/index.js";
import RecordControls from "@/components/records/RecordControls.vue";
import SiteModal from "@/components/site/SiteModal.vue";
import BookRecord from "@/components/records/BookRecord.vue";
import GameRecord from "@/components/records/GameRecord.vue";
import MovieRecord from "@/components/records/MovieRecord.vue";
import MusicRecord from "@/components/records/MusicRecord.vue";

const props = defineProps(["criteria", "category", "field", "controls"]);
const userStore = useUserStore();

const page = ref(0);
const pages = ref(userStore.searchResults.get(props.category).get(props.field).at(1));
const selectedRecordId = ref(0);
const showModal = ref(false);

const next = async () => {
  if (page.value < pages.value - 1) {
    page.value++;
    await paginate();
  }
};

const previous = async () => {
  if (page.value > 0) {
    page.value--;
    await paginate();
  }
};

const paginate = async () => {
  const apiData = (
    await axios.get(`http://localhost:5000/api/v1/user/search/${props.category}/${props.field}/${page.value}`, {
      headers: { Authorization: `Bearer ${userStore.idToken}` },
      params: {
        igdbAccessToken: userStore.igdbAccessToken,
        spotifyAccessToken: userStore.spotifyAccessToken,
        criteria: props.criteria,
      },
    })
  ).data;

  userStore.searchResults.get(props.category).get(props.field)[2] = apiData;
};

const toggleModal = (record) => {
  showModal.value = !showModal.value;
  selectedRecordId.value = record.id;
};
</script>

<template>
  <div class="tiles-page-container">
    <div class="navigation">
      <button @click="previous()">Previous</button>
      <p>{{ `Page ${page + 1} of ${pages}` }}</p>
      <button @click="next()">Next</button>
    </div>
    <div class="tiles">
      <div v-for="record in userStore.searchResults.get(props.category).get(props.field).at(2)" :key="record.id" class="record">
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .navigation {
    display: flex;
    justify-content: space-between;

    button {
      padding: 0.5rem;
      border: none;
      color: white;
      background-color: $navyBlue;
      cursor: pointer;
      font-weight: bold;
    }

    p {
      font-weight: 700;
      font-size: 1.25rem;
      color: $lightBlue;
    }
  }

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
