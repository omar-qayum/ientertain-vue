<script setup>
import { ref } from "vue";

const props = defineProps(["tabs"]);
const option = ref(props.tabs.at(0));

const select = (choice) => {
  option.value = choice;
};
</script>

<template>
  <div class="tabs-container">
    <div class="tabs">
      <button v-for="tab in props.tabs" :key="tab" @click="select(tab)" :class="option === tab ? 'active' : ''">
        {{ tab }}
      </button>
    </div>
    <template v-for="tab in props.tabs" :key="tab">
      <div v-if="option === tab" class="tab-content">
        <slot :name="tab" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.tabs-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  width: 100%;
  height: 100%;
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
      text-transform: capitalize;

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
    grid-row: 2 / span 9;
  }
}
</style>
