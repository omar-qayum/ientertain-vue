<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from "@/store/index.js";

const router = useRouter();
const userStore = useUserStore();
const criteria = ref("");
const byEnter = ref(false);
const results = ref(new Map());

onMounted(() => {
  watch(criteria, () => {
    byEnter.value = false;
    results.value.clear();
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
      convertToMap((await axios.get(`http://localhost:5000/api/v1/user/search`, { headers: { Authorization: `Bearer ${userStore.idToken}` }, params: { search: criteria.value } })).data);
    }
  } catch (error) {
    console.log(error.message);
    console.log(error.response.data);
  }
}, 500);

const loadResults = async (category, field, enterPressed) => {
  if (enterPressed) {
    byEnter.value = true;
    convertToMap((await axios.get(`http://localhost:5000/api/v1/user/search`, { headers: { Authorization: `Bearer ${userStore.idToken}` }, params: { search: criteria.value } })).data);
  }

  userStore.setSearchResults(results.value);
  router.push(`/categories/search?criteria=${criteria.value}&category=${category}&field=${field}`);
  results.value.clear();
};

const convertToMap = (apiData) => {
  results.value = new Map(apiData);
  results.value.forEach((value, key) => {
    results.value.set(key, new Map(value));
  });
};
</script>

<template>
  <div class="search-bar-container">
    <input class="search-bar" type="search" v-model="criteria" placeholder="Search" @keyup.enter="loadResults(0, 0, true)" />
    <div v-if="criteria && results.size" class="search-results">
      <div v-for="(category, categoryIndex) in results.keys()" :key="category">
        <p class="category">{{ category }}</p>
        <p v-for="(field, fieldIndex) in results.get(category).keys()" :key="field" class="result" @click="loadResults(categoryIndex, fieldIndex, false)">
          <span class="amount">{{ results.get(category).get(field).length }} </span>
          <span> result(s) in </span>
          <span class="amount">{{ field }} </span>
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
