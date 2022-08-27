<template>
  <div class="modal-outer-container" @click.self="$emit('toggleModal')">
      <slot name="user" :bookPreferences="bookPreferences" :gamePreferences="gamePreferences" :moviePreferences="moviePreferences" :musicPreferences="musicPreferences" ></slot>
      <slot name="admin"></slot>
      <slot name="books"></slot>
      <slot name="games"></slot>
      <slot name="movies"></slot>
      <slot name="music"></slot>      
  </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();

const bookPreferences = new Set(store.state.categoryPreferences.get('books'));
const gamePreferences = new Set(store.state.categoryPreferences.get('games'));
const moviePreferences = new Set(store.state.categoryPreferences.get('movies'));
const musicPreferences = new Set(store.state.categoryPreferences.get('music'));
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
