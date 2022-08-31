<script setup>
import ItemCarousel from "@/components/ItemCarousel.vue";
import { useUserStore } from "@/store/index.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus);
library.add(faMinus);
library.add(faHeart);

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
              <button v-if="!userStore.cart.get('books').has(record.id)" @click="userStore.cart.get('books').set(record.id, record)">
                <icon class="fa-2x" icon="fa-solid fa-plus" />
              </button>
              <button v-else @click="userStore.cart.get('books').delete(record.id)">
                <icon class="fa-2x" icon="fa-solid fa-minus" />
              </button>
              <button>
                <icon class="fa-2x" icon="fa-solid fa-heart" />
              </button>
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
      gap: 10px;

      img {
        width: 150px;
        height: 200px;
      }

      .summary {}

      button {
        background: $red;
        height: 50px;
        width: 25%;
        border: none;
      }
    }
  }
}
</style>
