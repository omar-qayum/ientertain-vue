<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faXmark);
</script>

<template>
  <teleport to="body">
    <div class="modal-outer-container" @click.self="$emit('toggleModal')">
      <div class="modal-inner-container">
        <button @click.self="$emit('toggleModal')">
          <icon class="icon" icon="fa-solid fa-xmark" />
        </button>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.modal-outer-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: red;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(16, 1fr);
  z-index: 2;

  .modal-inner-container {
    grid-column: span 16;
    grid-row: span 16;
    background-color: $lightBlack;
    height: 100%;
    width: 100%;
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

// iPads
@media (orientation: portrait) and (min-width: 768px) {
  .modal-outer-container {
    .modal-inner-container {
      grid-column: 3 / span 12;
      grid-row: 3 / span 12;
    }
  }
}

@media (orientation: landscape) and (min-width: 568px) {
  .modal-outer-container {
    .modal-inner-container {
      grid-column: span 16;
      grid-row: span 16;
    }
  }
}

@media (orientation: landscape) and (min-width: 700px) {
  .modal-outer-container {
    .modal-inner-container {
      grid-column: 2 / span 14;
      grid-row: 2 / span 14;
    }
  }
}

@media (orientation: landscape) and (min-width: 900px) {
  .modal-outer-container {
    .modal-inner-container {
      grid-column: 3 / span 12;
      grid-row: 3 / span 12;
    }
  }
}

@media (orientation: landscape) and (min-width: 1000px) {
  .modal-outer-container {
    .modal-inner-container {
      grid-column: 4 / span 10;
      grid-row: 4 / span 10;
    }
  }
}
</style>
