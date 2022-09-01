<script setup>
</script>

<template>
  <div class="modal-outer-container" @click.self="$emit('toggleModal')">
    <slot name="books"></slot>
    <slot name="games"></slot>
    <slot name="movies"></slot>
    <slot name="music"></slot>
    <slot name="checkout"></slot>
  </div>
</template>

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
