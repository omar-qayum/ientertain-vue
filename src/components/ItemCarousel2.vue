<template>
  <div v-if="data">
    <h1>{{ props.category.name }}</h1>
    <div class="carousel-container">
      <button @click="left">Left</button>
      <img
        v-for="item in data.slice(0, 10)"
        :key="item.id"
        :src="`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${item.cover.image_id}.jpg`"
        loading="lazy"
        class="item"
        @click="displayModal(item.id)"
      />
      <button @click="right">Right</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
//import ItemModal from "../components/ItemModal.vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["category"]);
//const showModal = ref(false);
const data = ref([]);
//const selectedItem = ref(0);

try {
  let items = await axios({
    url: "http://localhost:5000/games/games",
    method: "POST",
    headers: {
      Authorization: "Bearer " + store.state.idToken,
    },
    data: {
      query: `fields cover.image_id,first_release_date,name,platforms.abbreviation,summary,themes.name,videos.video_id; where themes=${props.category.id} & platforms.abbreviation="PC" & first_release_date>1420092061; limit 500;`,
    },
  });
  //data.value = items.data.filter(item => item.poster_path !== null);
  data.value = items.data;
  console.log(data.value);
} catch (error) {
  console.log(error);
}

// const left = () => {
//   data.value.push(data.value.shift());
// };

// const right = () => {
//   data.value.unshift(data.value.pop());
// };

// const displayModal = (itemID) => {
//   showModal.value = !showModal.value;
//   selectedItem.value = itemID;
// };
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
