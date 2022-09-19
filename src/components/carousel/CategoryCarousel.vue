<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import BookRecord from "@/components/records/BookRecord.vue";
import GameRecord from "@/components/records/GameRecord.vue";
import MovieRecord from "@/components/records/MovieRecord.vue";
import MusicRecord from "@/components/records/MusicRecord.vue";
import SiteModal from "@/components/site/SiteModal.vue";

library.add(faAngleLeft);
library.add(faAngleRight);

const props = defineProps(["category", "header", "records"]);
const carousel = ref([]);
const selectedRecord = ref({});
const showModal = ref(false);
const animateLeft = ref(false);
const recordsToShow = ref(0);
const startPosition = ref(1);
const endPosition = ref(0);

onMounted(() => {
  onWidthChange();
  window.addEventListener("resize", onWidthChange);
});
onUnmounted(() => window.removeEventListener("resize", onWidthChange));

const onWidthChange = () => {
  recordsToShow.value = 10;
  if (window.innerHeight >= window.innerWidth && window.innerWidth <= 1200) {
    recordsToShow.value = 5;
  }
  if (window.innerHeight >= window.innerWidth && window.innerWidth <= 500) {
    recordsToShow.value = 2;
  }
  if (recordsToShow.value > carousel.value.length) {
    const recordsToAdd = recordsToShow.value - carousel.value.length;
    for (let i = 1; i <= recordsToAdd; i++) {
      carousel.value.push(props.records.at((endPosition.value + i) % props.records.length));
    }
    endPosition.value += recordsToAdd;
  }
  if (recordsToShow.value < carousel.value.length) {
    const recordsToRemove = carousel.value.length - recordsToShow.value;
    for (let i = 1; i <= recordsToRemove; i++) {
      carousel.value.pop();
    }
    endPosition.value -= recordsToRemove;
  }
};

const left = () => {
  animateLeft.value = false;
  carousel.value = [];

  for (let i = 1; i <= recordsToShow.value; i++) {
    carousel.value.unshift(props.records.at((startPosition.value - i) % props.records.length));
  }

  startPosition.value -= recordsToShow.value;
  endPosition.value -= recordsToShow.value;
};

const right = () => {
  animateLeft.value = true;
  carousel.value = [];

  for (let i = 1; i <= recordsToShow.value; i++) {
    carousel.value.push(props.records.at((endPosition.value + i) % props.records.length));
  }

  startPosition.value += recordsToShow.value;
  endPosition.value += recordsToShow.value;
};

const beforeEnter = (el) => {
  gsap.set(el, {
    opacity: 0,
  });
};

const onEnter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    duration: 3,
    onComplete: done,
  });
};

const onLeave = (el, done) => {
  gsap.to(el, {
    x: animateLeft.value ? "-1000%" : "1000%",
    duration: 1,
    onComplete: done,
  });
};

const toggleModal = (record) => {
  showModal.value = !showModal.value;
  selectedRecord.value = record;
};
</script>

<template>
  <div v-if="props.records">
    <h1>{{ props.header }}</h1>
    <div class="carousel-container">
      <button v-if="props.records.length > 10" @click="left()" class="left-button">
        <icon class="icon" icon="fa-solid fa-angle-left" />
      </button>
      <TransitionGroup
        tag="div"
        class="slider"
        :css="false"
        @before-enter="beforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <img
          v-for="record in carousel"
          :key="record.id"
          class="record"
          @click="toggleModal(record)"
          :src="record.image"
          loading="lazy"
        />
      </TransitionGroup>
      <button v-if="props.records.length > 10" @click="right()" class="right-button">
        <icon class="icon" icon="fa-solid fa-angle-right" />
      </button>
    </div>
    <SiteModal v-if="showModal" @toggleModal="toggleModal()">
      <template #record>
        <BookRecord v-if="props.category === 'books'" :record="selectedRecord" :controls="true" />
        <GameRecord
          v-else-if="props.category === 'games'"
          :record="selectedRecord"
          :controls="true"
        />
        <MovieRecord
          v-else-if="props.category === 'movies'"
          :record="selectedRecord"
          :controls="true"
        />
        <MusicRecord v-else :record="selectedRecord" :controls="true" />
      </template>
    </SiteModal>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  text-transform: capitalize;
  color: $navyBlue;
  font-size: 1.5rem;
  margin-left: 1rem;
}

.carousel-container {
  display: flex;
  position: relative;
  margin: 0 1rem;
  overflow: hidden;

  .left-button,
  .right-button {
    position: absolute;
    height: 100%;
    background-color: hsla(0, 0%, 0%, 0.7);
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
    right: 0;
  }

  .slider {
    display: flex;
    gap: 0.5rem;

    .record {
      background: grey;
      width: calc((100vw - 2rem - ((10 - 1) * 0.5rem)) / 10);
      aspect-ratio: 3 / 4;
      flex-shrink: 0;
    }
  }
}

@media (orientation: portrait) and (max-width: 1200px) {
  .carousel-container {
    .slider {
      .record {
        width: calc((100vw - 2rem - ((5 - 1) * 0.5rem)) / 5);
      }
    }
  }

  @media (orientation: portrait) and (max-width: 500px) {
    .carousel-container {
      .slider {
        .record {
          width: clamp(
            150px,
            calc((100vw - 2rem - ((2 - 1) * 0.5rem)) / 2),
            calc((100vw - 2rem - ((2 - 1) * 0.5rem)) / 2)
          );
        }
      }
    }
  }
}
</style>
