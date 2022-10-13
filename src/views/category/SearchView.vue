<script setup>
import { useUserStore } from "@/store/index.js";
import SiteTabs from "@/components/site/SiteTabs.vue";
import TilesPage from "@/components/tiles/TilesPage.vue";

const props = defineProps(["criteria", "category", "field"]);
const userStore = useUserStore();
</script>

<template>
  <div class="search-container">
    <p class="heading">
      Search results for: <span>{{ props.criteria }}</span>
    </p>
    <SiteTabs :tabs="Array.from(userStore.searchResults.keys())" :index="props.category">
      <template v-for="category in userStore.searchResults.keys()" :key="category" #[category]>
        <SiteTabs :tabs="Array.from(userStore.searchResults.get(category).keys())" :index="props.field">
          <template v-for="field in userStore.searchResults.get(category).keys()" :key="field" #[field]>
            <TilesPage :category="category" :records="userStore.searchResults.get(category).get(field)" :controls="false" />
          </template>
        </SiteTabs>
      </template>
    </SiteTabs>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  .heading {
    font-weight: 700;
    font-size: 1.5rem;
    color: $navyBlue;

    span {
      font-weight: 700;
      font-size: 1.5rem;
      color: $lightBlue;
    }
  }
}
</style>
