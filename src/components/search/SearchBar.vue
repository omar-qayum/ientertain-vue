<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from "@/store/index.js";

const router = useRouter();
const userStore = useUserStore();
const criteria = ref("");
const searchingPrompt = ref(false);
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
      searchingPrompt.value = true;
      results.value = convertToMap(
        (
          await axios.get(`${import.meta.env.VITE_HOST}/api/v1/user/search`, {
            headers: { Authorization: `Bearer ${userStore.idToken}` },
            params: {
              igdbAccessToken: userStore.igdbAccessToken,
              spotifyAccessToken: userStore.spotifyAccessToken,
              criteria: criteria.value,
            },
          })
        ).data
      );
      searchingPrompt.value = false;
    }
  } catch (error) {
    console.log(error.message);
    console.log(error.response.data);
  }
}, 500);

const loadResults = async (category, field, enterPressed) => {
  if (enterPressed) {
    results.value.clear();
    byEnter.value = true;
    searchingPrompt.value = true;
    const map = convertToMap(
      (
        await axios.get(`${import.meta.env.VITE_HOST}/api/v1/user/search`, {
          headers: { Authorization: `Bearer ${userStore.idToken}` },
          params: {
            igdbAccessToken: userStore.igdbAccessToken,
            spotifyAccessToken: userStore.spotifyAccessToken,
            criteria: criteria.value,
          },
        })
      ).data
    );
    searchingPrompt.value = false;
    userStore.setSearchResults(map);
  } else {
    userStore.setSearchResults(results.value);
    results.value.clear();
  }
  router.push(`/categories/search?criteria=${criteria.value}&category=${category}&field=${field}`);
};

const convertToMap = (apiData) => {
  const map = new Map();

  apiData.forEach((data) => {
    map.set(data.category, new Map());
    data.fields.forEach((field) => {
      map.get(data.category).set(field.name, [field.matches, field.pages, field.records]);
    });
  });

  return map;
};
</script>

<template>
  <div class="search-bar-container">
    <input class="search-bar" type="search" v-model="criteria" placeholder="Search" @keyup.enter="loadResults(0, 0, true)" />
    <div v-if="criteria && (searchingPrompt || results.size)" class="search-results">
      <p v-if="searchingPrompt" class="prompt">
        Searching for: <span class="criteria">{{ criteria }}</span>
      </p>
      <template v-if="results.size">
        <div v-for="(category, categoryIndex) in results.keys()" :key="category">
          <p class="category">{{ category }}</p>
          <p v-for="(field, fieldIndex) in results.get(category).keys()" :key="field" class="result" @click="loadResults(categoryIndex, fieldIndex, false)">
            <span class="amount">{{ results.get(category).get(field).at(0) }} </span>
            <span> match(es) in </span>
            <span class="amount">{{ field }} </span>
          </p>
        </div>
      </template>
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

    .prompt {
      font-size: 1.25rem;
      font-weight: 700;
      color: $navyBlue;

      .criteria {
        font-size: 1.25rem;
        font-weight: 700;
        color: $lightBlue;
      }
    }

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
