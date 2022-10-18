<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  tabs: { required: true },
  index: { required: false, default: 0 },
});
const option = ref(parseInt(props.index, 10));

onMounted(() => {
  watch(
    () => props.index,
    () => {
      option.value = parseInt(props.index, 10);
    }
  );
});

const select = (choice) => {
  option.value = choice;
};
</script>

<template>
  <div class="tabs-container">
    <div class="tabs">
      <button v-for="(tab, index) in props.tabs" :key="tab" @click="select(index)" :class="option === index ? 'active' : ''">{{ tab }}</button>
    </div>
    <template v-for="(tab, index) in props.tabs" :key="index">
      <div v-if="option === index" class="tab-content">
        <slot :name="index" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.tabs-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: $lightBlack;

  .tabs {
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
    height: 100%;
  }
}
</style>
