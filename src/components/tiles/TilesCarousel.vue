<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { useUserStore } from "@/store/index.js";
import SiteModal from "@/components/site/SiteModal.vue";
import BookRecord from "@/components/records/BookRecord.vue";
import GameRecord from "@/components/records/GameRecord.vue";
import MovieRecord from "@/components/records/MovieRecord.vue";
import MusicRecord from "@/components/records/MusicRecord.vue";

library.add(faAngleLeft);
library.add(faAngleRight);

const props = defineProps(["category", "header", "records"]);
const userStore = useUserStore();
const records = ref(Array.from(props.records));
const carousel = ref([]);
const resize = ref(false);
const enableAnimations = ref(false);
const enterFrom = ref("");
const selectedRecordId = ref(0);
const showModal = ref(false);

onMounted(() => {
  adjustTiles();
  enableAnimations.value = true;
  watch(
    () => userStore.tiles,
    () => {
      resize.value = true;
      adjustTiles();
    }
  );
});

onBeforeUnmount(() => {
  enableAnimations.value = false;
});

const adjustTiles = () => {
  if (userStore.tiles > carousel.value.length) {
    const recordsToAdd = Math.abs(carousel.value.length - userStore.tiles);
    for (let i = 1; i <= recordsToAdd; i++) {
      carousel.value.push(records.value.shift());
    }
  }

  if (userStore.tiles < carousel.value.length) {
    const recordsToRemove = Math.abs(carousel.value.length - userStore.tiles);
    for (let i = 1; i <= recordsToRemove; i++) {
      records.value.unshift(carousel.value.pop());
    }
  }
};

const clearCarousel = (enter) => {
  resize.value = false;
  enterFrom.value = enter;

  if (enter === "right") {
    records.value = [...records.value, ...carousel.value];
  } else {
    records.value = [...carousel.value, ...records.value];
  }
  carousel.value = [];
};

const onEnter = (el) => {
  if (enableAnimations.value) {
    gsap.fromTo(
      el,
      { x: enterFrom.value === "right" ? "100vw" : "-100vw", opacity: 0 },
      {
        x: "0vw",
        opacity: 1,
        duration: 1,
      }
    );
  }
};

const onLeave = (el, done) => {
  if (enableAnimations.value) {
    gsap.fromTo(
      el,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 0.5,
        onComplete: done,
      }
    );
  }
};

const onAfterLeave = () => {
  if (!resize.value) {
    if (enterFrom.value === "right") {
      carousel.value.push(records.value.shift());
    } else {
      carousel.value.unshift(records.value.pop());
    }
  }
};

const toggleModal = (record) => {
  showModal.value = !showModal.value;
  selectedRecordId.value = record ? record.id : null;
};
</script>

<template>
  <section class="category-carousel-container">
    <p class="genre">{{ props.header }}</p>
    <div class="carousel">
      <button @click="clearCarousel('left')" class="left-button">
        <icon class="icon" icon="fa-solid fa-angle-left" />
      </button>
      <TransitionGroup class="slider" tag="div" @enter="onEnter" @leave="onLeave" @after-leave="onAfterLeave" :css="false">
        <img v-for="record in carousel" :key="record.id" class="record" :src="record.image" loading="lazy" @click="toggleModal(record)" :css="false" />
      </TransitionGroup>
      <button @click="clearCarousel('right')" class="right-button">
        <icon class="icon" icon="fa-solid fa-angle-right" />
      </button>
    </div>
  </section>
  <SiteModal v-if="showModal" @toggleModal="toggleModal()">
    <BookRecord v-if="props.category === 'books'" :id="selectedRecordId" />
    <GameRecord v-else-if="props.category === 'games'" :id="selectedRecordId" />
    <MovieRecord v-else-if="props.category === 'movies'" :id="selectedRecordId" />
    <MusicRecord v-else :id="selectedRecordId" />
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
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
      gap: 0.5rem;
      width: clamp(calc(280px - 2rem), calc(100vw - 2rem), calc(1920px - 2rem));

      .record {
        background: grey;
        aspect-ratio: 3 / 4;
        width: 100%;
      }
    }
  }
}
</style>
