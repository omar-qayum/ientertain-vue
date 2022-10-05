<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/index.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import SiteTabs from "@/components/site/SiteTabs.vue";
import BookRecord from "@/components/records/BookRecord.vue";
import GameRecord from "@/components/records/GameRecord.vue";
import MovieRecord from "@/components/records/MovieRecord.vue";
import MusicRecord from "@/components/records/MusicRecord.vue";
import SiteModal from "@/components/site/SiteModal.vue";

library.add(faHeart);
library.add(faCartShopping);

const userStore = useUserStore();
const selectedRecord = ref({});
const showModal = ref(false);

const toggleModal = (record) => {
  console.log(record);
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
            <button @click="userStore.removeFromWishlist(category, record.id)">
              <icon class="icon" icon="fa-regular fa-heart" />
            </button>
            <button @click="userStore.addToShoppingCart(category, record.id, record)">
              <icon class="icon" icon="fa-solid fa-cart-shopping" />
            </button>
          </div>
        </div>
        <SiteModal v-if="showModal" @toggleModal="toggleModal()">
          <template #record>
            <BookRecord v-if="category === 'books'" :record="selectedRecord" />
            <GameRecord v-else-if="category === 'games'" :record="selectedRecord" />
            <MovieRecord v-else-if="category === 'movies'" :record="selectedRecord" />
            <MusicRecord v-else :record="selectedRecord" />
          </template>
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
        img {
          background: grey;
          width: 100%;
          aspect-ratio: 3 / 4;
        }

        button {
          padding: 0.5rem;
          width: 50%;
          border: none;
          background: $navyBlue;
          font-weight: bold;

          .icon {
            font-size: 1.25rem;
            color: white;
          }
        }
      }
    }
  }
}
</style>
