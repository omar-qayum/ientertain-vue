<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/index.js";
import SiteModal from "@/components/site/SiteModal.vue";
import SiteTabs from "@/components/site/SiteTabs.vue";
import BookRecord from "@/components/records/BookRecord.vue";
import GameRecord from "@/components/records/GameRecord.vue";
import MovieRecord from "@/components/records/MovieRecord.vue";
import MusicRecord from "@/components/records/MusicRecord.vue";

const props = defineProps(["criteria", "category", "field"]);
const userStore = useUserStore();
const selectedRecordId = ref(0);
const showModal = ref(false);

const toggleModal = (record) => {
  showModal.value = !showModal.value;
  selectedRecordId.value = record.id;
};
</script>

<template>
  <div class="search-container">
    <p class="heading">
      Search results for: <span>{{ props.criteria }}</span>
    </p>
    <SiteTabs :tabs="Array.from(userStore.searchResults.keys())" :index="props.category" class="tabs">
      <template v-for="category in userStore.searchResults.keys()" :key="category" #[category]>
        <div class="category">
          <SiteTabs :tabs="Array.from(userStore.searchResults.get(category).keys())" :index="props.field" class="tabs">
            <template v-for="field in userStore.searchResults.get(category).keys()" :key="field" #[field]>
              <div class="field">
                <img v-for="record in userStore.searchResults.get(category).get(field)" :key="record.id" class="record" :src="record.image" loading="lazy" @click="toggleModal(record)" />
                <SiteModal v-if="showModal" @toggleModal="toggleModal()">
                  <BookRecord v-if="category === 'books'" :id="selectedRecordId" />
                  <GameRecord v-else-if="category === 'games'" :id="selectedRecordId" />
                  <MovieRecord v-else-if="category === 'movies'" :id="selectedRecordId" />
                  <MusicRecord v-else :id="selectedRecordId" />
                </SiteModal>
              </div>
            </template>
          </SiteTabs>
        </div>
      </template>
    </SiteTabs>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  .heading {
    font-weight: 700;
    font-size: 1.5rem;
    color: $navyBlue;

    span {
      font-weight: 700;
      font-size: 1.5rem;
      color: $lightBlue;
    }
  }

  .tabs {
    .category {
      .tabs {
        .field {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          gap: 0.5rem;
          width: clamp(calc(280px - 2rem), calc(100vw - 2rem), calc(1920px - 2rem));

          .record {
            background: grey;
            width: 100%;
            aspect-ratio: 3 / 4;
          }
        }
      }
    }
  }
}
</style>
