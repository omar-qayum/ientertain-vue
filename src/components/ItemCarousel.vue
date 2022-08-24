<template>
  <div v-if="records">
    <h1>{{ props.genre }}</h1>
    <div class="carousel-container">
      <button><icon class="fa-7x" @click="left" icon="fa-solid fa-angle-left" /></button>
      <img v-for="record in props.records.slice(0, 10)" :key="record.id" :src="record.posterPath" loading="lazy" class="record"
        @click="toggleModal(record)" />
      <button><icon class="fa-7x" @click="right" icon="fa-solid fa-angle-right" /></button>
    </div>
    <ItemModal v-if="showModal" @toggleModal="toggleModal()">
      <template #movies>
        <slot name="movies" :record="selectedRecord"></slot>
      </template>
      <template #games>
        <slot name="games" :record="selectedRecord"></slot>
      </template>
      <template #music>
        <slot name="music" :record="selectedRecord"></slot>
      </template>
      <template #books>
        <slot name="books" :record="selectedRecord"></slot>
      </template>
    </ItemModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ItemModal from "./ItemModal.vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const props = defineProps(["genre", "records"]);
const records = ref(props.records);
const showModal = ref(false);
const selectedRecord = ref({});
library.add(faAngleLeft);
library.add(faAngleRight);

const left = () => {
  records.value.push(records.value.shift());
};

const right = () => {
  records.value.unshift(records.value.pop());
};

const toggleModal = (record) => {
  showModal.value = !showModal.value;
  selectedRecord.value = record;
}
</script>

<style lang="scss" scoped>
.carousel-container {
  display: flex;

  .record {
    height: 200px;
    width: 150px;
    background: grey;
  }

  & .record:hover {
    transition: transform 0.2s;
    transform: scale(1.5);
  }
}
</style>
