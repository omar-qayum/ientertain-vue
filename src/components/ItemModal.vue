<template>
  <div class="modal-outer-container" @click="$emit('toggleModal')">
    <div class="modal-inner-container">
        <iframe width="300" height="200" :src="'https://www.youtube.com/embed/fb5ELWi-ekk'" frameborder="0" allowfullscreen></iframe>
        <p>{{props.movie}}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
const props = defineProps(["movie"]);
const data = ref([
  axios
    .get(
      "https://api.themoviedb.org/3/movie/507086/videos?api_key=4b2ec768b38ae5e3a536aed029b916c2"
    )
    .then((result) => {
      data.value = result.data.results;
      console.log(data.value);
    }),
]);
</script>

<style lang="scss" scoped>
.modal-outer-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  background: #00000099;
}
.modal-inner-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 500px;
  width: 500px;
  background: $red;
}
</style>
