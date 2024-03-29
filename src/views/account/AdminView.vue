<script setup>
import { ref } from "vue";
import { getIdToken } from "firebase/auth";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useUserStore } from "@/store/index.js";
import ButtonText from "@/components/buttons/ButtonText.vue";

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
const message = ref("");

const getCategoryRecords = async (category) => {
  try {
    categoryRecords.value.set(
      category,
      (
        await axios.get(`${import.meta.env.VITE_HOST}/api/v1/admin/categories/${category}`, {
          headers: {
            Authorization: `Bearer ${await getIdToken(userStore.user)}`,
          },
          params: {
            igdbAccessToken: userStore.igdbAccessToken,
            spotifyAccessToken: userStore.spotifyAccessToken,
          },
        })
      ).data
    );
    console.log(category, categoryRecords.value.get(category));
  } catch (error) {
    console.log(error.message);
  }
};

const setCategoryRecords = async (category) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_HOST}/api/v1/admin/categories/${category}`, categoryRecords.value.get(category), {
      headers: { Authorization: `Bearer ${await getIdToken(userStore.user)}` },
    });
    await userStore.setCategoryRecords([category]);
    message.value = response.data;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteCategoryRecords = async (category) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_HOST}/api/v1/admin/categories/${category}`, { headers: { Authorization: `Bearer ${await getIdToken(userStore.user)}` } });
    categoryRecords.value.set(category, []);
    userStore.categoryRecords.set(category, new Map());
    message.value = response.data;
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
        <ButtonText class="button" @click="getCategoryRecords(category)">Get</ButtonText>
        <ButtonText class="button" @click="setCategoryRecords(category)">Set</ButtonText>
        <ButtonText class="button" @click="deleteCategoryRecords(category)">Delete</ButtonText>
      </template>
    </div>
    <p class="message">{{ message }}</p>
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

    .button {
      width: 100%;
    }
  }

  .message {
    color: $lightBlue;
    font-size: 1.25rem;
  }
}
</style>
