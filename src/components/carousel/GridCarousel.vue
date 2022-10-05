<script setup>
import { ref, onBeforeMount, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { useUserStore } from "@/store/index.js";
import BookRecord from "@/components/records/BookRecord.vue";
import GameRecord from "@/components/records/GameRecord.vue";
import MovieRecord from "@/components/records/MovieRecord.vue";
import MusicRecord from "@/components/records/MusicRecord.vue";
import SiteModal from "@/components/site/SiteModal.vue";

const userStore = useUserStore();

const props = defineProps(["category", "start"]);
const records = ref([]);
const tiles = ref([]);
const recordSequence = ref(4);
const tileSequence = ref(props.start);
const timer = ref(null);
const selectedRecord = ref({});
const showModal = ref(false);

onBeforeMount(() => {
  userStore.preferences.get(props.category).forEach((genre) => {
    records.value = records.value.concat(userStore.categoryRecords.get(props.category).get(genre));
    records.value.concat(userStore.categoryRecords.get(props.category).get(genre));
  });
  records.value = shuffle(records.value).slice(0, 20);
  tiles.value = records.value.slice(0, 4);
});

onMounted(() => {
  timer.value = setInterval(() => {
    tiles.value[tileSequence.value % 4] = null;
  }, 7000);
});

onUnmounted(() => {
  clearInterval(timer.value);
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const toggleModal = (record) => {
  showModal.value = !showModal.value;
  selectedRecord.value = record;
};

const onEnter = (el) => {
  gsap.fromTo(
    el,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 2,
    }
  );
};

const onLeave = (el, done) => {
  gsap.fromTo(
    el,
    { opacity: 1 },
    {
      opacity: 0,
      duration: 2,
      onComplete: done,
    }
  );
};

const onAfterLeave = () => {
  tiles.value[tileSequence.value++ % 4] = records.value.at(recordSequence.value++ % records.value.length);
};
</script>

<template>
  <div class="grid-carousel-container">
    <p class="category">{{ props.category }}</p>
    <TransitionGroup tag="div" class="tiles" @enter="onEnter" @leave="onLeave" @after-leave="onAfterLeave" :css="false">
      <template v-for="(record, index) in tiles" :key="index">
        <img v-if="record !== null" :class="`tile-${index + 1}`" :src="record.image" loading="lazy" @click="toggleModal(record)" />
      </template>
    </TransitionGroup>
  </div>
  <SiteModal v-if="showModal" @toggleModal="toggleModal()">
    <BookRecord v-if="props.category === 'books'" :record="selectedRecord" />
    <GameRecord v-else-if="props.category === 'games'" :record="selectedRecord" />
    <MovieRecord v-else-if="props.category === 'movies'" :record="selectedRecord" />
    <MusicRecord v-else :record="selectedRecord" />
  </SiteModal>
</template>

<style lang="scss" scoped>
.grid-carousel-container {
  .category {
    font-weight: 700;
    font-size: 1.5rem;
    text-align: center;
    color: $navyBlue;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
  }

  .tiles {
    display: grid;
    grid-template-columns: repeat(2, minmax(120px, 1fr));
    gap: 0.5rem;

    .tile-1 {
      width: 100%;
      aspect-ratio: 3 / 4;
      grid-column: 1 / 2;
    }

    .tile-2 {
      width: 100%;
      aspect-ratio: 3 / 4;
      grid-column: 2 / 3;
    }

    .tile-3 {
      width: 100%;
      aspect-ratio: 3 / 4;
      grid-column: 1 / 2;
    }

    .tile-4 {
      width: 100%;
      aspect-ratio: 3 / 4;
      grid-column: 2 / 3;
    }
  }
}
</style>
