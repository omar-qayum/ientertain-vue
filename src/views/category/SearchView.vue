<script setup>
import { useUserStore } from "@/store/index.js";
import SiteTabs from "@/components/site/SiteTabs.vue";
import SearchPagination from "@/components/search/SearchPagination.vue";
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
      <template v-for="(category, categoryIndex) in userStore.searchResults.keys()" :key="category" #[categoryIndex]>
        <SiteTabs :tabs="Array.from(userStore.searchResults.get(category).keys())" :index="props.field">
          <template v-for="(field, fieldIndex) in userStore.searchResults.get(category).keys()" :key="field" #[fieldIndex]>
            <template v-if="userStore.searchResults.get(category).get(field).at(2).length">
              <SearchPagination :criteria="props.criteria" :category="category" :field="field" />
              <TilesPage :category="category" :records="userStore.searchResults.get(category).get(field).at(2)" :controls="false" />
            </template>
            <template v-else>
              <p>No results for {{ field }}.</p>
            </template>
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

  p {
    color: white;
    font-weight: bold;
  }
}
</style>
