<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faXmark);
</script>

<template>
  <Teleport to="body">
    <div class="modal-outer-container" @click.self="$emit('toggleModal')">
      <div class="modal-inner-container">
        <button @click="$emit('toggleModal')">
          <icon class="icon" icon="fa-solid fa-xmark" />
        </button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-outer-container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #00000099;
  z-index: 3;

  .modal-inner-container {
    background-color: $lightBlack;
    width: clamp(280px, 100%, 900px);
    height: 100vh;
    position: relative;

    button {
      position: absolute;
      right: 0px;
      padding: 1rem;
      border: none;
      background: $lightBlack;
      font-weight: bold;

      .icon {
        font-size: 1.25rem;
        color: white;
      }
    }
  }
}

@media (min-width: 480px) and (min-height: 600px) {
  .modal-outer-container {
    .modal-inner-container {
      height: 600px;
    }
  }
}
</style>
