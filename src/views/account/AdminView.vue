<script setup>
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useUserStore } from "@/store/index.js";

library.add(faX);
library.add(faCheck);

const userStore = useUserStore();
const categoryRecords = ref(
  new Map([
    ["books", []],
    ["games", []],
    ["movies", []],
    ["music", []],
  ])
);

const getCategoryRecords = async (category) => {
  try {
    categoryRecords.value.set(category, (await axios.get(`http://localhost:5000/api/v1/admin/categories/${category}`, { headers: { Authorization: `Bearer ${userStore.idToken}` } })).data);
    console.log(category, categoryRecords.value.get(category));
  } catch (error) {
    console.log(error.message);
  }
};

const setCategoryRecords = async (category) => {
  try {
    let response = await axios.post(`http://localhost:5000/api/v1/admin/categories/${category}`, categoryRecords.value.get(category), {
      headers: { Authorization: `Bearer ${userStore.idToken}` },
    });
    await userStore.setCategoryRecords([category]);
    console.log(response);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteCategoryRecords = async (category) => {
  try {
    let response = await axios.delete(`http://localhost:5000/api/v1/admin/categories/${category}`, { headers: { Authorization: `Bearer ${userStore.idToken}` } });
    categoryRecords.value.set(category, []);
    userStore.categoryRecords.set(category, new Map());
    console.log(response);
  } catch (error) {
    console.log(error.message);
  }
};
</script>

<template>
  <div class="admin-container">
    <p>Admin Settings</p>
    <div class="controls-container">
      <p class="heading">Category</p>
      <p class="heading">Genres</p>
      <p class="heading">Records</p>
      <p class="heading">Firestore</p>
      <p class="heading">Controls</p>
      <template v-for="category in ['books', 'games', 'movies', 'music']" :key="category">
        <p class="category">{{ category }}</p>
        <p class="data">{{ categoryRecords.get(category).length }}</p>
        <p class="data">{{ categoryRecords.get(category).reduce((previous, current) => previous + current.at(1).length, 0) }}</p>
        <icon v-if="userStore.categoryRecords.get(category).size" class="good-status-icon" icon="fa-solid fa-check" />
        <icon v-else class="bad-status-icon" icon="fa-solid fa-x" />
        <button @click="getCategoryRecords(category)">Get</button>
        <button @click="setCategoryRecords(category)">Set</button>
        <button @click="deleteCategoryRecords(category)">Delete</button>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-container {
  padding: 1rem;
  width: 50%;

  p {
    font-weight: 700;
    font-size: 1.5rem;
    color: $navyBlue;
    margin-bottom: 1rem;
  }

  .controls-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
    align-items: baseline;
    gap: 0.5rem;

    .heading {
      color: $lightBlue;
      font-size: 1.25rem;

      &:nth-child(5) {
        grid-column: span 3;
      }
    }

    .category {
      color: $lightBlue;
      font-size: 1.25rem;
      text-transform: capitalize;
      justify-self: start;
    }

    .data {
      color: $navyBlue;
      font-size: 1.25rem;
    }

    .good-status-icon {
      font-size: 1.25rem;
      color: green;
    }

    .bad-status-icon {
      font-size: 1.25rem;
      color: red;
    }

    button {
      width: 100px;
      background: $navyBlue;
      border: none;
      color: white;
      padding: 0.25rem;
      font-size: 1rem;
    }
  }
}
</style>
