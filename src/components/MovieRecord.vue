<script setup>
const props = defineProps(["record"]);
</script>
  
<template>
  <div class="modal-inner-container">
    <iframe class="trailer" :src="`https://www.youtube.com/embed/${props.record.video}?autoplay=1&mute=1&vq=hd1080`"
      frameborder="0" allowfullscreen></iframe>
    <div class="details-container">
      <h1>{{ props.record.title }}</h1>
      <h3>
        {{ props.record.releaseDate }}
        {{ props.record.runtime }} <small>min</small>
        {{ props.record.voteAverage }}
      </h3>
    </div>
    <h4 class="summary">{{ props.record.overview }}</h4>
    <slot></slot>
  </div>
</template>
  
<style lang="scss" scoped>
.modal-inner-container {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 20px;
  transform: translate(-50%, -50%);
  height: 600px;
  width: 600px;
  background: #000000cc;
  border: white solid 1px;

  .trailer {
    width: 100%;
    height: 400px;
  }

  .details-container {
    align-items: center;

    h1 {}

    h3 {
      word-spacing: 10px;
    }
  }

  .summary {
    font-weight: lighter;
  }

  :slotted(button) {
    background: $red;
    height: 50px;
    width: 25%;
    border: none;
  }
}
</style>
  