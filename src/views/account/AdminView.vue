<script setup>
import { ref } from "vue";
import { getIdToken } from "firebase/auth"
import axios from "axios";
import { useUserStore } from "@/store/index.js";

const userStore = useUserStore();
const categoryRecords = ref(new Map([["books", []], ["games", []], ["movies", []], ["music", []]]));

const getCategoryRecords = (categories) => {
  try {
    categories.forEach(async (category) => {
      categoryRecords.value.set(category, (await axios.get(`http://localhost:5000/api/v1/admin/categories/${category}`, { headers: { Authorization: "Bearer " + await getIdToken(userStore.user) } })).data);
    });
  } catch (error) {
    console.log(error.message);
  }
}

const setCategoryRecords = (categories) => {
  try {
    categories.forEach(async (category) => {
      await axios.post(`http://localhost:5000/api/v1/admin/categories/${category}`, categoryRecords.value.get(category), { headers: { Authorization: "Bearer " + await getIdToken(userStore.user) } });
      await userStore.getCategoryRecords([category]);
      categoryRecords.value.set(category, []);
    });
  } catch (error) {
    console.log(error.message);
  }
}

const deleteCategoryRecords = (categories) => {
  try {
    categories.forEach(async (category) => {
      await axios.delete(`http://localhost:5000/api/v1/admin/categories/${category}`, { headers: { Authorization: "Bearer " + await getIdToken(userStore.user) } });
    });
  } catch (error) {
    console.log(error.message);
  }
}
</script>
  
<template>
  <div class="modal-inner-container">
    <h1>Admin Settings</h1>
    <div class="controls-container">
      <div v-for="category in ['books', 'games', 'movies', 'music']" :key="category" class="control">
        <h2>{{ `${category} Data` }}</h2>
        <button @click="getCategoryRecords([category])">Get</button>
        <button @click="setCategoryRecords([category])">Set</button>
        <button @click="deleteCategoryRecords([category])">Delete</button>
      </div>
    </div>
    <div class="category-data-container">
      <div v-for="category in ['books', 'games', 'movies', 'music']" :key="category" class="category">
        <h2>{{  category  }}</h2>
        <h3 v-for="genre in categoryRecords.get(category)" :key="genre">{{  `${genre[0].genre} (${genre.length})`  }}</h3>
      </div>
    </div>
  </div>
</template>
  
  <style lang="scss" scoped>
  .modal-inner-container {
    .controls-container {
      margin-bottom: 10px;
  
      .control {
        height: 40px;
        display: flex;
        gap: 10px;
        align-items: center;
        margin-top: 10px;
  
        h2 {
          width: 50%;
          text-transform: capitalize;
        }
  
        button {
          height: 100%;
          width: 100px;
          background: $red;
          border: none;
        }
      }
    }
  
    .category-data-container {
      display: flex;
      justify-content: space-between;
  
      .category {
        width: 25%;
  
        h2 {
          text-transform: capitalize;
          text-align: center;
        }
      }
    }
  }
  </style>
  