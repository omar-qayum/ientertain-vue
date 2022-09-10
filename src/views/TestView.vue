<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import SiteModal from "@/components/site/SiteModal.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";

library.add(faAngleLeft);
library.add(faAngleRight);

const props = defineProps(["header", "records"]);
const selectedRecord = ref({});
const records = ref([]);
const carousel = ref([]);
const showModal = ref(false);
const animateLeft = ref(false);
const tiles = ref(0);
const startPosition = ref(1);
const endPosition = ref(0);

for (let i = 1; i <= 50; i++) {
  records.value.push(`https://via.placeholder.com/210?text=${i}`);
}

onMounted(() => {
  onWidthChange();
  window.addEventListener("resize", onWidthChange);
});
onUnmounted(() => window.removeEventListener("resize", onWidthChange));

const onWidthChange = () => {
  tiles.value = 10;
  if (window.innerHeight >= window.innerWidth && window.innerWidth <= 1200) {
    tiles.value = 5;
  }
  if (window.innerHeight >= window.innerWidth && window.innerWidth <= 500) {
    tiles.value = 2;
  }

  if (tiles.value > carousel.value.length) {
    const recordsToAdd = tiles.value - carousel.value.length;
    for (let i = 1; i <= recordsToAdd; i++) {
      carousel.value.push(records.value.at((endPosition.value + i) % records.value.length));
    }
    endPosition.value += recordsToAdd;
  }

  if (tiles.value < carousel.value.length) {
    const recordsToRemove = carousel.value.length - tiles.value;
    for (let i = 1; i <= recordsToRemove; i++) {
      carousel.value.pop();
    }
    endPosition.value -= recordsToRemove;
  }
};

const left = () => {
  animateLeft.value = false;
  carousel.value = [];

  for (let i = 1; i <= tiles.value; i++) {
    carousel.value.unshift(records.value.at((startPosition.value - i) % records.value.length));
  }

  startPosition.value -= tiles.value;
  endPosition.value -= tiles.value;
};

const right = () => {
  animateLeft.value = true;
  carousel.value = [];

  for (let i = 1; i <= tiles.value; i++) {
    carousel.value.push(records.value.at((endPosition.value + i) % records.value.length));
  }

  startPosition.value += tiles.value;
  endPosition.value += tiles.value;
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
  <h1 class="header">Action</h1>
  <div class="carousel-container">
    <button @click="left()" class="left-button">
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
      <img v-for="record in carousel" :key="record" :src="record" loading="lazy" class="record" />
    </TransitionGroup>
    <button @click="right()" class="right-button">
      <icon class="fa-7x" icon="fa-solid fa-angle-right" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.header {
  text-transform: capitalize;
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
