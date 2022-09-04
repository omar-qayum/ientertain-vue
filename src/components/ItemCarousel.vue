<script setup>
import { ref } from "vue";
import ItemModal from "@/components/ItemModal.vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const props = defineProps(["header", "records"]);
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

<template>
  <div v-if="records">
    <h1 class="header">{{ props.header }}</h1>
    <div class="carousel-container">
      <button v-if="props.records.length > 10">
        <icon class="fa-7x" @click="left" icon="fa-solid fa-angle-left" />
      </button>
      <div v-for="record in props.records.slice(0, 10)" :key="record.id">
        <img :src="record.image" loading="lazy" class="record" @click="toggleModal(record)" />
        <slot name="controls" :record="record"></slot>
      </div>
      <button v-if="props.records.length > 10">
        <icon class="fa-7x" @click="right" icon="fa-solid fa-angle-right" />
      </button>
    </div>
    <ItemModal v-if="showModal" @toggleModal="toggleModal()">
      <template #record>
        <slot name="modal" :record="selectedRecord"></slot>
      </template>
    </ItemModal>
  </div>
</template>

<style lang="scss" scoped>
.header {
  text-transform: capitalize;
}

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
