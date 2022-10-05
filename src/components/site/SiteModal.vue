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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: #00000099;
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(16, 1fr);
  z-index: 2;

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

  .modal-inner-container {
    grid-column: span 16;
    grid-row: span 16;
    background-color: $lightBlack;
    width: 100%;
    height: 100%;
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

// Smaller tablets
@media (orientation: portrait) and (min-width: 480px) {
  .modal-outer-container {
    .modal-inner-container {
      grid-column: 2 / span 14;
      grid-row: 2 / span 14;
    }
  }
}

// Smaller tablets
@media (orientation: portrait) and (min-width: 600px) {
  .modal-outer-container {
    .modal-inner-container {
      grid-column: 3 / span 12;
      grid-row: 3 / span 12;
    }
  }
}

// Small phone landscape
@media (orientation: landscape) and (min-width: 568px) {
  .modal-outer-container {
    .modal-inner-container {
      grid-column: span 16;
      grid-row: span 16;
    }
  }
}

// Large tablet landscape
@media (orientation: landscape) and (min-width: 700px) {
  .modal-outer-container {
    .modal-inner-container {
      grid-column: 2 / span 14;
      grid-row: 2 / span 14;
    }
  }
}

// Desktops
@media (orientation: landscape) and (min-width: 900px) {
  .modal-outer-container {
    .modal-inner-container {
      grid-column: 4 / span 10;
      grid-row: 4 / span 10;
    }
  }
}

@media (orientation: landscape) and (min-width: 1400px) {
  .modal-outer-container {
    .modal-inner-container {
      grid-column: 5 / span 8;
      grid-row: 5 / span 8;
    }
  }
}
</style>
