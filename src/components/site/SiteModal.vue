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
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  background: #00000099;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #00000000;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>
