<template>
  <section>
    <h1 v-if="!booksData.length">Page is loading... Please wait :)</h1>
    <ItemCarousel v-for="books in booksData" :key="books.genre" :data="books">
      <template #books="{ item }">
        <div class="modal-inner-container">
          <div class="details">
            <h1>{{ item.title }}</h1>
            <h3>
              {{ item.releaseDate }}
              {{ item.voteAverage }}
            </h3>
          </div>
          <h4 class="summary">{{ item.overview }}</h4>
        </div>
      </template>
    </ItemCarousel>
  </section>
</template>

<script setup>
import ItemCarousel from "@/components/ItemCarousel.vue";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/index.js";
//import { useStore } from "vuex";
import { ref } from "vue";

//const store = useStore();
const booksData = ref([]);
const booksGenres = await getDocs(collection(firestore, "Books"));
booksGenres.forEach(async (genre) => {
  const books = [];
  const booksByGenre = await getDocs(collection(firestore, `Books/${genre.id}/Book`));
  booksByGenre.forEach((genreBooks) => {
    books.push(genreBooks.data());
  })
  booksData.value.push(books);
});
console.log(booksData);
</script>

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
