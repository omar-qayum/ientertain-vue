<template>
  <div class="modal-outer-container" @click.self="$emit('toggleModal')">
    <div class="modal-inner-container">
      <iframe
        class="trailer"
        width="600"
        height="400"
        :src="`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1&vq=hd1080`"
        frameborder="0"
        allowfullscreen
      ></iframe>
      <div class="details">
        <h1>{{ details.title }}</h1>
        <h3>{{ details.release_date.slice(0, 4) }} {{ details.runtime }}<small>min</small> {{ Math.round(details.vote_average * 10) / 10 }}/10</h3>
      </div>
      <h4 class="summary">{{ details.overview }}</h4>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
const props = defineProps(["movieID"]);
const details = ref("");
const trailer = ref("");

try {
  let getDetails = await axios.get(
    `https://api.themoviedb.org/3/movie/${props.movieID}?api_key=4b2ec768b38ae5e3a536aed029b916c2`
  );
  let getTrailers = await axios.get(
    `https://api.themoviedb.org/3/movie/${props.movieID}/videos?api_key=4b2ec768b38ae5e3a536aed029b916c2`
  );
  details.value = getDetails.data;
  trailer.value = getTrailers.data.results
    .filter((item) => item.type === "Trailer")
    .shift().key;
} catch (error) {
  console.log(error);
}
</script>

<style lang="scss" scoped>
.modal-outer-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  background: #00000099;
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
    "summary summary summary summary summary"
  ;
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
