<template>
  <div v-if="data">
    <h1>Test</h1>
    <div class="carousel-container">
      <button @click="left">Left</button>
      <img
        v-for="(item, index) in data.slice(0, 10)"
        :id="index"
        :key="item.id"
        :src="'https://image.tmdb.org/t/p/w500' + item.poster_path"
        class="item"
        @click="displayModal(index)"
      />
      <button @click="right">Right</button>
    </div>
  </div>
  <ItemModal v-show="showModal" @toggleModal="displayModal(0)" :movie="data[currentItem]"></ItemModal>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import ItemModal from "../components/ItemModal.vue";

const showModal = ref(false);
const currentItem = ref(0);
const data = ref([
  axios
    .get(
      "https://api.themoviedb.org/3/trending/all/day?api_key=4b2ec768b38ae5e3a536aed029b916c2"
    )
    .then((result) => {
      data.value = result.data.results;
    }),
]);

const left = () => {
  data.value.push(data.value.shift());
};

const right = () => {
  data.value.unshift(data.value.pop());
};

const displayModal = (id) => {
  showModal.value = !showModal.value;
  currentItem.value = id;
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
