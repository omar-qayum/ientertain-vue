<script setup>
import ItemCarousel from "@/components/ItemCarousel.vue";
import { useUserStore } from "@/store/index.js";

const userStore = useUserStore();
</script>

<template>
  <section>
    <h1 v-if="!userStore.categoryRecords.get('books').size">Page is loading... Please wait :)</h1>
    <ItemCarousel v-for="genre in userStore.categoryPreferences.get('books')" :key="genre" :genre="genre"
      :records="userStore.categoryRecords.get('books').get(genre)">
      <template #books="{ record }">
        <div class="modal-inner-container">
          <div class="details-container">
            <img :src="record.posterPath" />
            <div>
              <h2>{{  record.title  }}</h2>
              <h3>{{  record.authors  }}</h3>
              <h3>{{  record.date  }}</h3>
              <h3>{{  record.pages  }}</h3>
            </div>
          </div>
          <h4 class="summary">{{  record.summary  }}</h4>
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
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 20px;
    transform: translate(-50%, -50%);
    height: 600px;
    width: 600px;
    background: #000000cc;
    border: white solid 1px;

    .details-container {
      display: flex;

      .summary {
        font-weight: lighter;
      }
    }
  }
}
</style>
