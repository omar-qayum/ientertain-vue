<script setup>
const props = defineProps(["record"]);
</script>
  
<template>
  <div class="modal-inner-container">
    <div class="details-container">
      <img :src="props.record.image" />
      <div>
        <h2>{{ props.record.albumName }}</h2>
        <h3>{{ props.record.artist }}</h3>
        <h3>{{ props.record.releaseDate }}</h3>
        <h3>{{ props.record.totalTracks }}</h3>
        <slot></slot>
      </div>
    </div>
    <div class="tracks">
      <h4 v-for="track in props.record.tracks" :key="track">{{ track.trackName }}<audio controls>
          <source :src="track.trackPreview" type="audio/ogg">
        </audio></h4>
    </div>
  </div>
</template>
  
<style lang="scss" scoped>
.modal-inner-container {
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 600px;
  width: 600px;
  background: #000000cc;
  border: white solid 1px;

  .details-container {
    display: flex;

    img {
      width: 150px;
      height: 200px;
    }

    h1 {}

    h3 {
      padding-top: 10px;
      word-spacing: 10px;
    }

    :slotted(button) {
      background: $red;
      height: 50px;
      width: 25%;
      border: none;
    }
  }
}
</style>
  