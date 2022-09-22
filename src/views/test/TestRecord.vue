<script setup>
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping, faMinus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartR } from "@fortawesome/free-regular-svg-icons";
import SiteModal from "@/components/site/SiteModal.vue";

library.add(faCartShopping);
library.add(faMinus);
library.add(faHeart);
library.add(faHeartR);

const option = ref(1);

const select = (choice) => {
  option.value = choice;
};
</script>

<template>
  <SiteModal>
    <div class="content">
      <div class="tabs">
        <button @click="select(1)" :class="option === 1 ? 'active' : ''">About</button>
        <button @click="select(2)" :class="option === 2 ? 'active' : ''">Summary</button>
        <button @click="select(3)" :class="option === 3 ? 'active' : ''">Other</button>
      </div>
      <div class="tab-content">
        <div v-if="option === 1" class="about">
          <!-- <img :src="`https://via.placeholder.com/128x197?text=1`" /> -->
          <img src="https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2tvg.jpg" />

          <div class="details">
            <h1 class="title">Lorem ipsum dolor</h1>
            <h1>Lorem ipsum dolor sit amet consectetur.</h1>
            <h1>Publisher</h1>
            <h1>Science Fiction</h1>
            <h1>2001</h1>
            <h1>210 pgs.</h1>
            <h1>ISBN 999999999999</h1>
          </div>
        </div>
        <div v-if="option === 2" class="summary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ut repellat dignissimos
          maxime doloremque ex officiis doloribus est blanditiis? Fugiat dolore illum ipsa, saepe
        </div>
        <div v-if="option === 3" class="details"></div>
      </div>
      <div v-if="true" class="controls">
        <button v-if="true" @click="true">
          <icon class="icon" icon="fa-regular fa-heart" />
        </button>
        <button v-if="true" @click="true">
          <icon class="icon" icon="fa-solid fa-cart-shopping" />
        </button>
      </div>
    </div>
  </SiteModal>
</template>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  width: 100%;
  height: 100%;
  padding: 1rem;
  gap: 0.5rem;
  background-color: $lightBlack;

  .tabs {
    grid-column: span 10;

    button {
      padding: 0.5rem;
      border: none;
      color: white;
      background-color: $navyBlue;
      cursor: pointer;
      transition: 0.3s;
      font-weight: bold;

      &.active {
        background-color: $lightBlue;
      }

      &:hover {
        background-color: $skyBlue;
      }
    }
  }

  .tab-content {
    grid-column: span 10;
    grid-row: 2 / span 8;

    .about {
      display: flex;
      flex-direction: column;
      background: $lightBlack;
      gap: 0.5rem;

      img {
        height: 40%;
        aspect-ratio: 3 / 4;
        align-self: center;
      }

      .details {
        width: 100%;
        line-height: 1.5rem;
        overflow-y: auto;
        h1.title {
          font-size: 1.5rem;
          color: $lightBlue;
        }
      }
    }

    .summary {
      height: 100%;
      overflow-y: auto;
    }
  }

  .controls {
    grid-column: span 10;
    display: flex;
    gap: 0.5rem;

    button {
      padding: 0.5rem;
      width: 50%;
      border: none;
      background: $navyBlue;
      font-weight: bold;

      .icon {
        font-size: 1.25rem;
        color: white;
      }
    }
  }
}

@media (orientation: landscape) and (min-width: 568px) {
  .content {
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: repeat(16, 1fr);

    .tabs {
      grid-column: span 16;
    }

    .tab-content {
      grid-column: span 16;
      grid-row: 2 / span 16;

      .about {
        height: 100%;
        flex-direction: row;
        align-items: center;

        img {
          height: 100%;
        }

        .details {
          height: 100%;
        }
      }
    }

    .controls {
      grid-column: span 16;
    }
  }
}
</style>
