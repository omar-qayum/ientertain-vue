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
  <div class="admin-settings-modal-inner-container">
    <h1>Admin Settings</h1>
    <div class="controls-container">
      <div class="control">
        <h2>Book Records</h2>
        <button @click="getCategoryRecords(['books'])">Get</button>
        <button @click="setCategoryRecords(['books'])">Set</button>
        <button @click="deleteCategoryRecords(['books'])">Delete</button>
      </div>
      <div class="control">
        <h2>Game Records</h2>
        <button @click="getCategoryRecords(['games'])">Get</button>
        <button @click="setCategoryRecords(['games'])">Set</button>
        <button @click="deleteCategoryRecords(['games'])">Delete</button>
      </div>
      <div class="control">
        <h2>Movie Records</h2>
        <button @click="getCategoryRecords(['movies'])">Get</button>
        <button @click="setCategoryRecords(['movies'])">Set</button>
        <button @click="deleteCategoryRecords(['movies'])">Delete</button>
      </div>
      <div class="control">
        <h2>Music Records</h2>
        <button @click="getCategoryRecords(['music'])">Get</button>
        <button @click="setCategoryRecords(['music'])">Set</button>
        <button @click="deleteCategoryRecords(['music'])">Delete</button>
      </div>
    </div>
    <div class="category-data-container">
      <div class="category">
        <h2>Books</h2>
        <h3 v-for="genre in categoryRecords.get('books')" :key="genre">{{ `${genre[0].genre} (${genre.length})`
        }}</h3>
      </div>
      <div class="category">
        <h2>Games</h2>
        <h3 v-for="genre in categoryRecords.get('games')" :key="genre">{{ `${genre[0].genre} (${genre.length})`
        }}</h3>
      </div>
      <div class="category">
        <h2>Movies</h2>
        <h3 v-for="genre in categoryRecords.get('movies')" :key="genre">{{ `${genre[0].genre} (${genre.length})` }}
        </h3>
      </div>
      <div class="category">
        <h2>Music</h2>
        <h3 v-for="genre in categoryRecords.get('music')" :key="genre">{{ `${genre[0].genre} (${genre.length})`
        }}</h3>
      </div>
    </div>
  </div>
</template>
  
  <style lang="scss" scoped>
  .admin-settings-modal-inner-container {
    // padding: 30px;
    // position: fixed;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    // height: 720px;
    // width: 600px;
    // background: #000000cc;
    // border: white solid 1px;
    // box-sizing: border-box;
  
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
          text-align: center;
        }
      }
    }
  }
  </style>
  