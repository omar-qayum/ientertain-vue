<template>
  <div v-if="data">
    <h1>{{ props.genre }}</h1>
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
  </div>
  <ItemModal
    v-if="showModal"
    @toggleModal="displayModal(selectedItem)"
    :movieID="selectedItem"
  ></ItemModal>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import ItemModal from "../components/ItemModal.vue";

const props = defineProps(["genre"]);
const showModal = ref(false);
const data = ref([]);
const selectedItem = ref(0);
try {
  let result = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=4b2ec768b38ae5e3a536aed029b916c2&region=us&language=en-US&include_adult=false&query=${props.genre}`
  );
  data.value = result.data.results.filter((item) => item.poster_path !== null);
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
