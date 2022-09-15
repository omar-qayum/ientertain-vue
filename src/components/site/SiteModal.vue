<script setup></script>

<template>
  <teleport to="body">
    <div class="modal-outer-container" @click.self="$emit('toggleModal')">
      <slot name="record"></slot>
      <slot name="checkout"></slot>
    </div>
  </teleport>
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
