<template>
  <div class="modal-outer-container" @click.self="$emit('toggleModal')">
    <div class="modal-inner-container">
      <iframe class="trailer" width="600" height="400"
        :src="`https://www.youtube.com/embed/${props.item.video}?autoplay=1&mute=1&vq=hd1080`" frameborder="0"
        allowfullscreen></iframe>
      <slot name="test"></slot>
      <div class="details">
        <h1>{{ props.item.title }}</h1>
        <h3>
          {{ props.item.release_date.slice(0, 4) }} 
          {{ props.item.runtime }} <small>min</small> 
          {{ props.item.vote_average }}
        </h3>
      </div>
      <h4 class="summary">{{ props.item.overview }}</h4>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["item"]);
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
