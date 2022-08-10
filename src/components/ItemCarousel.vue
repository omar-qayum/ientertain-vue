<template>
  <div v-if="data">
    <h1>{{ props.category.name }}</h1>
    <div class="carousel-container">
      <button @click="left">Left</button>
      <img
        v-for="item in data.slice(0, 10)"
        :key="item.id"
        :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
        loading="lazy"
        class="item"
        @click="displayModal(item.id)"
      />
      <button @click="right">Right</button>
    </div>
    <ItemModal
      v-if="showModal"
      @toggleModal="displayModal(selectedItem)"
      :id="selectedItem"
    ></ItemModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import ItemModal from "../components/ItemModal.vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["category"]);
const showModal = ref(false);
const data = ref([]);
const selectedItem = ref(0);

try {
  let items = await axios({
    url: "http://localhost:5000/movies/discover/movie",
    method: "GET",
    headers: {
      Authorization: "Bearer " + store.state.idToken,
    },
    params: {
      region: "US",
      language: "en",
      with_genres: props.category.id,
      include_adult: false,
    },
  });
  data.value = items.data.results.filter((item) => item.poster_path !== null);
  console.log(data.value);
} catch (error) {
  console.log(error);
}

const left = () => {
  data.value.push(data.value.shift());
};

const right = () => {
  data.value.unshift(data.value.pop());
};

const displayModal = (itemID) => {
  showModal.value = !showModal.value;
  selectedItem.value = itemID;
};
</script>

<style lang="scss" scoped>
.carousel-container {
  display: flex;
  .item {
    height: 200px;
    width: 150px;
    background: grey;
  }
  & .item:hover {
    transition: transform 0.2s;
    transform: scale(1.5);
  }
}
</style>
