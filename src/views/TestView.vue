<script setup>
import { ref } from "vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinus, faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(faMinus);
library.add(faHeart);
</script>

<template>
  <div class="cart-container">
    <img />
    <div class="controls-container">
      <button>
        <icon class="fa-2x" icon="fa-solid fa-minus" />
      </button>
      <button>
        <icon class="fa-2x" icon="fa-solid fa-heart" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-container {
  img {
    height: 200px;
    width: 150px;
    background: grey;
  }

  .controls-container {
    display: flex;
    width: 150px;
    
    button {
      background: $red;
      height: 50px;
      width: 50%;
      border: none;
    }
  }
}
</style>
