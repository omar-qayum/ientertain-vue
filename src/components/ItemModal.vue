<template>
  <div class="modal-outer-container" @click.self="$emit('toggleModal')">
      <slot name="user" :moviePreferences="moviePreferences" :gamePreferences="gamePreferences" :musicPreferences="musicPreferences" :bookPreferences="bookPreferences"></slot>
      <slot name="admin"></slot>
      <slot name="movies"></slot>
      <slot name="games"></slot>
      <slot name="music"></slot>
      <slot name="books"></slot>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();

const moviePreferences = new Set(store.state.moviePreferences);
const gamePreferences = new Set(store.state.gamePreferences);
const musicPreferences = new Set(store.state.musicPreferences);
const bookPreferences = new Set(store.state.bookPreferences);
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
</style>
