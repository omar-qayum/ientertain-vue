<script setup>
import { ref, watch, onMounted } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { useUserStore } from "@/store/index.js";
import BookRecord from "@/components/records/BookRecord.vue";
import GameRecord from "@/components/records/GameRecord.vue";
import MovieRecord from "@/components/records/MovieRecord.vue";
import MusicRecord from "@/components/records/MusicRecord.vue";
import SiteModal from "@/components/site/SiteModal.vue";

library.add(faAngleLeft);
library.add(faAngleRight);

const userStore = useUserStore();
const props = defineProps(["category", "header", "records"]);
const carousel = ref([]);
const selectedRecord = ref({});
const showModal = ref(false);
const animateLeft = ref(false);
const startPosition = ref(1);
const endPosition = ref(0);

onMounted(() => {
  adjustTiles();
  watch(() => userStore.tiles, adjustTiles);
});

const adjustTiles = () => {
  {
    if (userStore.tiles > carousel.value.length) {
      const recordsToAdd = userStore.tiles - carousel.value.length;
      for (let i = 1; i <= recordsToAdd; i++) {
        carousel.value.push(props.records.at((endPosition.value + i) % props.records.length));
      }
      endPosition.value += recordsToAdd;
    }

    if (userStore.tiles < carousel.value.length) {
      const recordsToRemove = carousel.value.length - userStore.tiles;
      for (let i = 1; i <= recordsToRemove; i++) {
        carousel.value.pop();
      }
      endPosition.value -= recordsToRemove;
    }
  }
};

const left = () => {
  animateLeft.value = false;
  carousel.value = [];

  for (let i = 1; i <= userStore.tiles; i++) {
    carousel.value.unshift(props.records.at((startPosition.value - i) % props.records.length));
  }

  startPosition.value -= userStore.tiles;
  endPosition.value -= userStore.tiles;
};

const right = () => {
  animateLeft.value = true;
  carousel.value = [];

  for (let i = 1; i <= userStore.tiles; i++) {
    carousel.value.push(props.records.at((endPosition.value + i) % props.records.length));
  }

  startPosition.value += userStore.tiles;
  endPosition.value += userStore.tiles;
};

const onEnter = (el) => {
  gsap.fromTo(
    el,
    { x: animateLeft.value ? "-100vw" : "100vw", opacity: 0 },
    {
      x: "0vw",
      opacity: 1,
      duration: 1,
    }
  );
};

const onLeave = (el) => {
  gsap.to(el, {
    x: animateLeft.value ? "100vw" : "-100vw",
    duration: 1,
  });
};

const toggleModal = (record) => {
  showModal.value = !showModal.value;
  selectedRecord.value = record;
};
</script>

<template>
  <section class="category-carousel-container">
    <p class="genre">{{ props.header }}</p>
    <div class="carousel">
      <button v-if="props.records.length > 10" @click="left()" class="left-button">
        <icon class="icon" icon="fa-solid fa-angle-left" />
      </button>
      <TransitionGroup class="slider" tag="div" @enter="onEnter" @leave="onLeave" :css="false">
        <img v-for="record in carousel" :key="record.id" class="record" :src="record.image" :style="`width: ${userStore.tileSize};`" loading="lazy" @click="toggleModal(record)" :css="false" />
      </TransitionGroup>
      <button v-if="props.records.length > 10" @click="right()" class="right-button">
        <icon class="icon" icon="fa-solid fa-angle-right" />
      </button>
    </div>
  </section>
  <SiteModal v-if="showModal" @toggleModal="toggleModal()">
    <BookRecord v-if="props.category === 'books'" :record="selectedRecord" />
    <GameRecord v-else-if="props.category === 'games'" :record="selectedRecord" />
    <MovieRecord v-else-if="props.category === 'movies'" :record="selectedRecord" />
    <MusicRecord v-else :record="selectedRecord" />
  </SiteModal>
</template>

<style lang="scss" scoped>
.category-carousel-container {
  display: flex;
  flex-direction: column;
  padding: 0px 1rem;

  .genre {
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: capitalize;
    color: $navyBlue;
  }

  .carousel {
    position: relative;

    .left-button,
    .right-button {
      position: absolute;
      height: 100%;
      background-color: hsla(0, 0%, 0%, 0.75);
      border: none;
      z-index: 1;

      .icon {
        width: 2rem;
        font-size: 2rem;
        background-color: none;
        color: white;
      }
    }

    .right-button {
      top: 0;
      right: 0;
    }

    .slider {
      position: relative;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
      gap: 0.5rem;
      width: clamp(calc(280px - 2rem), calc(100vw - 2rem), calc(1920px - 2rem));

      .record {
        background: grey;
        aspect-ratio: 3 / 4;
      }
    }
  }
}
</style>
