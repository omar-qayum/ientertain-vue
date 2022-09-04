<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "@/store/index.js";
import ItemCarousel from "@/components/ItemCarousel.vue";
import BookRecord from "@/components/BookRecord.vue";
import GameRecord from "@/components/GameRecord.vue";
import MovieRecord from "@/components/MovieRecord.vue";
import MusicRecord from "@/components/MusicRecord.vue";

const props = defineProps(["query"]);
const userStore = useUserStore();
const searchResults = ref(new Map([["books", new Map()], ["games", new Map()], ["movies", new Map()], ["music", new Map()]]));

watch(() => props.query, async (newQuery) => {
  search(newQuery);
});

function search(criteria) {
  console.log("called");
  ['books', 'games', 'movies', 'music'].forEach((category) => {
    searchResults.value.get(category).clear();
    userStore.categoryRecords.get(category).forEach((records, genre) => {
      if (userStore.preferences.get(category).has(genre)) {
        records.forEach((record) => {
          Object.entries(record).forEach(([field, value]) => {
            if (typeof (value) === "string" && value.toLowerCase().includes(criteria)) {
              searchResults.value.get(category).set(record.id, record);
            }
          });
        });
      }
    });
  });
}
search(props.query);
</script>
  
<template>
  <h1>Search Results</h1>
  <section v-for="category in ['books', 'games', 'movies', 'music']" :key="category">
    <ItemCarousel :header="category" :records="Array.from(searchResults.get(category).values())">
      <template #modal="{ record }">
        <BookRecord v-if="category === 'books'" :record="record">
          <div class="controls-container">
            <button v-if="!userStore.wishLists.get('books').has(record.id)"
              @click="userStore.addToWishList('books', record.id, record)">
              <icon class="fa-2x" icon="fa-regular fa-heart" />
            </button>
            <button v-else @click="userStore.removeFromWishList('books', record.id)">
              <icon class="fa-2x" icon="fa-solid fa-heart" />
            </button>
            <button v-if="!userStore.carts.get('books').has(record.id)"
              @click="userStore.addToCart('books', record.id, record)">
              <icon class="fa-2x" icon="fa-solid fa-cart-shopping" />
            </button>
            <button v-else @click="userStore.removeFromCart('books', record.id)">
              <icon class="fa-2x" icon="fa-solid fa-minus" />
            </button>
          </div>
        </BookRecord>
        <GameRecord v-else-if="category === 'games'" :record="record">
          <div class="controls-container">
            <button v-if="!userStore.wishLists.get('games').has(record.id)"
              @click="userStore.addToWishList('games', record.id, record)">
              <icon class="fa-2x" icon="fa-regular fa-heart" />
            </button>
            <button v-else @click="userStore.removeFromWishList('games', record.id)">
              <icon class="fa-2x" icon="fa-solid fa-heart" />
            </button>
            <button v-if="!userStore.carts.get('games').has(record.id)"
              @click="userStore.addToCart('games', record.id, record)">
              <icon class="fa-2x" icon="fa-solid fa-cart-shopping" />
            </button>
            <button v-else @click="userStore.removeFromCart('games', record.id)">
              <icon class="fa-2x" icon="fa-solid fa-minus" />
            </button>
          </div>
        </GameRecord>
        <MovieRecord v-else-if="category === 'movies'" :record="record">
          <div class="controls-container">
            <button v-if="!userStore.wishLists.get('movies').has(record.id)"
              @click="userStore.addToWishList('movies', record.id, record)">
              <icon class="fa-2x" icon="fa-regular fa-heart" />
            </button>
            <button v-else @click="userStore.removeFromWishList('movies', record.id)">
              <icon class="fa-2x" icon="fa-solid fa-heart" />
            </button>
            <button v-if="!userStore.carts.get('movies').has(record.id)"
              @click="userStore.addToCart('movies', record.id, record)">
              <icon class="fa-2x" icon="fa-solid fa-cart-shopping" />
            </button>
            <button v-else @click="userStore.removeFromCart('movies', record.id)">
              <icon class="fa-2x" icon="fa-solid fa-minus" />
            </button>
          </div>
        </MovieRecord>
        <MusicRecord v-else :record="record">
          <div class="controls-container">
            <button v-if="!userStore.wishLists.get('music').has(record.id)"
              @click="userStore.addToWishList('music', record.id, record)">
              <icon class="fa-2x" icon="fa-regular fa-heart" />
            </button>
            <button v-else @click="userStore.removeFromWishList('music', record.id)">
              <icon class="fa-2x" icon="fa-solid fa-heart" />
            </button>
            <button v-if="!userStore.carts.get('music').has(record.id)"
              @click="userStore.addToCart('music', record.id, record)">
              <icon class="fa-2x" icon="fa-solid fa-cart-shopping" />
            </button>
            <button v-else @click="userStore.removeFromCart('music', record.id)">
              <icon class="fa-2x" icon="fa-solid fa-minus" />
            </button>
          </div>
        </MusicRecord>
      </template>
    </ItemCarousel>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  justify-content: left;

  .controls-container {
    display: flex;
    width: 150px;

    button {
      background: $red;
      height: 50px;
      width: 50%;
      border: none;
    }
  }
}
</style>