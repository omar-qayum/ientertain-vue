<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from "@/store/index.js";

const router = useRouter();
const userStore = useUserStore();
const criteria = ref("");
const byEnter = ref(false);
const results = ref([]);

onMounted(() => {
  watch(criteria, () => {
    byEnter.value = false;
    results.value = [];
    search();
  });
});

const debounce = (func, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const search = debounce(async () => {
  try {
    if (!byEnter.value && criteria.value) {
      results.value = (await axios.get(`http://localhost:5000/api/v1/user/search`, { headers: { Authorization: `Bearer ${userStore.idToken}` }, params: { search: criteria.value } })).data;
      console.log(results.value);
    }
  } catch (error) {
    console.log(error.message);
    console.log(error.response.data);
  }
}, 500);

const loadByEnter = async () => {
  byEnter.value = true;
  router.push(
    `/categories/search?q=${(await axios.get(`http://localhost:5000/api/v1/user/search`, { headers: { Authorization: `Bearer ${userStore.idToken}` }, params: { search: criteria.value } })).data}`
  );
  results.value = [];
};

const loadByClick = (categoryIndex, queryIndex) => {
  router.push(`/categories/search?q=${results.value.at(categoryIndex).at(queryIndex).at(1)}`);
  results.value = [];
};
</script>

<template>
  <div class="search-bar-container">
    <input class="search-bar" type="search-bar" v-model="criteria" placeholder="Search" @keyup.enter="loadByEnter()" />
    <div v-if="criteria && results.length" class="search-results">
      <div v-for="(category, categoryIndex) in ['books', 'games', 'movies', 'music']" :key="category">
        <p class="category">{{ category }}</p>
        <p v-for="(result, queryIndex) in results.at(categoryIndex)" :key="result" class="result" @click="loadByClick(categoryIndex, queryIndex)">
          <span class="amount">{{ result.at(1).length }} </span>
          <span> result(s) in </span>
          <span class="amount">{{ result.at(0) }} </span>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-bar-container {
  position: relative;

  .search-bar {
    font-size: 1.25rem;
    color: $darkBlack;
    padding: 0.2rem;
    width: 100%;
  }

  .search-results {
    position: absolute;
    display: flex;
    flex-wrap: nowrap;
    top: 100%;
    background-color: $lightBlack;
    width: 100%;
    gap: 1rem;
    z-index: 2;
    padding: 0.5rem;

    .category {
      font-size: 1.25rem;
      font-weight: 700;
      text-transform: capitalize;
      color: $navyBlue;
    }

    .result {
      color: white;

      &:hover {
        background-color: $skyBlue;
      }

      .amount {
        color: $lightBlue;
      }
    }
  }
}
</style>
