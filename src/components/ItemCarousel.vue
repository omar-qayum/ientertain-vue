<template>
  <div v-if="data">
    <h1>{{ props.data[0].genre }}</h1>
    <div class="carousel-container">
      <button @click="left">Left</button>
      <img v-for="item in data.slice(0, 10)" :key="item.id" :src="item.posterPath" loading="lazy" class="item"
        @click="toggleModal(item)" />
      <button @click="right">Right</button>
    </div>
    <ItemModal v-if="showModal" @toggleModal="toggleModal()">
      <template #movies>
        <slot name="movies" :item="selectedItem"></slot>
      </template>
      <template #games>
        <slot name="games" :item="selectedItem"></slot>
      </template>
      <template #music>
        <slot name="music" :item="selectedItem"></slot>
      </template>
      <template #books>
        <slot name="books" :item="selectedItem"></slot>
      </template>
    </ItemModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ItemModal from "../components/ItemModal.vue";

const props = defineProps(["data"]);
const data = ref(props.data);
const showModal = ref(false);
const selectedItem = ref({});

const left = () => {
  data.value.push(data.value.shift());
};

const right = () => {
  data.value.unshift(data.value.pop());
};

const toggleModal = (item) => {
  showModal.value = !showModal.value;
  selectedItem.value = item;
}
</script>

<style lang="scss" scoped>
.carousel-container {
  display: flex;

  .item {
    height: 200px;
    width: 150px;
    background: grey;
  }

  & .item:hover {
    transition: transform 0.2s;
    transform: scale(1.5);
  }
}
</style>
