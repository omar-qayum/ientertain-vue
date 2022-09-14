<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import SiteModal from "@/components/site/SiteModal.vue";

library.add(faAngleLeft);
library.add(faAngleRight);

const props = defineProps(["header", "records"]);
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
        <icon class="fa-7x" icon="fa-solid fa-angle-left" />
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
        <icon class="fa-7x" icon="fa-solid fa-angle-right" />
      </button>
    </div>
    <SiteModal v-if="showModal" @toggleModal="toggleModal()">
      <template #record>
        <slot name="modal" :record="selectedRecord"></slot>
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
  width: 98vw;
  margin: 0 1vw;
  overflow: hidden;

  .left-button,
  .right-button {
    position: absolute;
    height: 100%;
    width: 5vw;
    background-color: hsla(0, 0%, 0%, 0.7);
    border: none;
    z-index: 1;

    .fa-7x {
      width: 5vw;
      background-color: none;
      color: white;
    }
  }

  .right-button {
    right: 0vw;
  }

  .slider {
    display: flex;
    width: 100%;
    gap: 0.5vw;

    .record {
      background: grey;
      width: calc((98vw - ((10 - 1) * 0.5vw)) / 10);
      aspect-ratio: 3 / 4;
      flex-shrink: 0;
    }
  }
}

@media (orientation: portrait) and (max-width: 1200px) {
  .carousel-container {
    .slider {
      .record {
        width: calc((98vw - ((5 - 1) * 0.5vw)) / 5);
      }
    }
  }

  @media (orientation: portrait) and (max-width: 500px) {
    .carousel-container {
      .slider {
        .record {
          width: clamp(
            150px,
            calc((98vw - ((2 - 1) * 0.5vw)) / 2),
            calc((98vw - ((2 - 1) * 0.5vw)) / 2)
          );
        }
      }
    }
  }
}
</style>
