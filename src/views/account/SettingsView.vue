<script setup>
import { ref } from "vue";
import { getIdToken, updatePassword } from "firebase/auth"
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import { useUserStore } from "@/store/index.js";
import axios from "axios";

const storage = getStorage();
const userStore = useUserStore();
const displayName = ref(userStore.user.displayName);
const photoURL = ref(userStore.user.photoURL);
const plan = ref(userStore.plan);
const newPassword = ref("");
const reenterPassword = ref("");
const userMessage = ref("Press save when done!");
const bookPreferences = new Set(userStore.categoryPreferences.get('books'));
const gamePreferences = new Set(userStore.categoryPreferences.get('games'));
const moviePreferences = new Set(userStore.categoryPreferences.get('movies'));
const musicPreferences = new Set(userStore.categoryPreferences.get('music'));

const avatars = ref(await Promise.all([
  getDownloadURL(storageRef(storage, 'site/avatars/1.png')),
  getDownloadURL(storageRef(storage, 'site/avatars/2.png')),
  getDownloadURL(storageRef(storage, 'site/avatars/3.png')),
  getDownloadURL(storageRef(storage, 'site/avatars/4.png')),
  getDownloadURL(storageRef(storage, 'site/avatars/5.png')),
  getDownloadURL(storageRef(storage, 'site/avatars/6.png')),
  getDownloadURL(storageRef(storage, 'site/avatars/7.png')),
  getDownloadURL(storageRef(storage, 'site/avatars/8.png')),
]));

const changeAvatar = (avatar) => {
  photoURL.value = avatar;
  userMessage.value = "New avatar selected!";
}

const changePlan = (newPlan) => {
  plan.value = newPlan;
  userMessage.value = `${newPlan} selected!`;
}

const changePassword = () => {
  if (newPassword.value === reenterPassword.value) {
    updatePassword(userStore.user, newPassword.value).then(() => {
      userMessage.value = "Password updated successfully!"
      newPassword.value = "";
      reenterPassword.value = "";
    }).catch((error) => {
      userMessage.value = error.message;
    });
  } else {
    userMessage.value = "Passwords do not match!"
    newPassword.value = "";
    reenterPassword.value = "";
  }
}

const changePreference = (preferences, genre, event) => {
  if (event.target.checked) {
    preferences.add(genre);
  } else {
    preferences.delete(genre);
  }
}

const saveChanges = async (bookPreferences, gamePreferences, moviePreferences, musicPreferences) => {
  const idToken = await getIdToken(userStore.user);

  // Save any Google auth user profile changes
  if (userStore.user.displayName !== displayName.value || userStore.user.photoURL !== photoURL.value) {
    userStore.updateUserProfile({
      user: userStore.user,
      displayName: displayName.value,
      photoURL: photoURL.value,
    });
  }
  // Save any plan changes
  if (userStore.plan !== plan.value) {
    axios.put("http://localhost:5000/api/v1/user/account/update-plan", { plan: plan.value }, { headers: { Authorization: "Bearer " + idToken } });
    userStore.$patch({ plan: plan.value });
  }
  // Save any category preference changes
  axios.put("http://localhost:5000/api/v1/user/account/update-preferences", {
    bookPreferences: Array.from(bookPreferences.values()),
    gamePreferences: Array.from(gamePreferences.values()),
    moviePreferences: Array.from(moviePreferences.values()),
    musicPreferences: Array.from(musicPreferences.values()),
  }, { headers: { Authorization: "Bearer " + idToken } });
  userStore.setCategoryPreferences({
    books: bookPreferences,
    games: gamePreferences,
    movies: moviePreferences,
    music: musicPreferences,
  });
}
</script>

<template>
  <div class="user-settings-modal-inner-container">
    <form @submit.prevent="saveChanges(bookPreferences, gamePreferences, moviePreferences, musicPreferences)">
      <h1>Account Settings</h1>
      <div class="user-info-container">
        <img :src="photoURL" />
        <div class="account-details">
          <h2>{{ displayName }}</h2>
          <h2>{{ userStore.user.email }}</h2>
          <h2>{{ plan }}</h2>
        </div>
        <div class="save">
          <input type="submit" value="Save" />
          <p>{{ userMessage }}</p>
        </div>
      </div>
      <div class="username-container">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="displayName" placeholder="New Username" />
      </div>
      <div class="password-container">
        <label for="password">Password</label>
        <input type="password" v-model="newPassword" placeholder="New Password" />
        <input type="password" v-model="reenterPassword" placeholder="Reenter Password" />
        <input type="button" value="Change" @click="changePassword()" />
      </div>
      <div class="avatars-container">
        <label>Avatar</label>
        <img v-for="avatar in avatars" :key="avatar" :src="avatar" @click="changeAvatar(avatar)" />
      </div>
      <div class="plans-container">
        <label>Plans</label>
        <input type="button" value="Plan A" @click="changePlan('Plan A')" />
        <input type="button" value="Plan B" @click="changePlan('Plan B')" />
        <input type="button" value="Plan C" @click="changePlan('Plan C')" />
        <input type="button" value="Plan D" @click="changePlan('Plan D')" />
        <input type="button" value="Plan E" @click="changePlan('Plan E')" />
      </div>
      <div class="genres-container">
        <div class="genre">
          <label>Books</label>
          <template v-for="genre in userStore.categoryRecords.get('books').keys()" :key="genre">
            <label><input type="checkbox" @click="changePreference(bookPreferences, genre, $event)" :value="genre"
                :checked="userStore.categoryPreferences.get('books').has(genre) ? 'checked' : null" />{{ genre
                }}</label>
          </template>
        </div>
        <div class="genre">
          <label>Games</label>
          <template v-for="genre in userStore.categoryRecords.get('games').keys()" :key="genre">
            <label><input type="checkbox" @click="changePreference(gamePreferences, genre, $event)" :value="genre"
                :checked="userStore.categoryPreferences.get('games').has(genre) ? 'checked' : null" />{{ genre
                }}</label>
          </template>
        </div>
        <div class="genre">
          <label>Movies</label>
          <template v-for="genre in userStore.categoryRecords.get('movies').keys()" :key="genre">
            <label><input type="checkbox" @click="changePreference(moviePreferences, genre, $event)" :value="genre"
                :checked="userStore.categoryPreferences.get('movies').has(genre) ? 'checked' : null" />{{ genre
                }}</label>
          </template>
        </div>
        <div class="genre">
          <label>Music</label>
          <template v-for="genre in userStore.categoryRecords.get('music').keys()" :key="genre">
            <label><input type="checkbox" @click="changePreference(musicPreferences, genre, $event)" :value="genre"
                :checked="userStore.categoryPreferences.get('music').has(genre) ? 'checked' : null" />{{ genre
                }}</label>
          </template>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.user-settings-modal-inner-container {
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

  form {
    display: flex;
    flex-direction: column;
    row-gap: 15px;

    .user-info-container {
      display: flex;
      text-align: left;
      align-items: center;
      gap: 10px;

      img {
        height: 75px;
        width: 75px;
      }
    }

    .username-container {
      display: flex;
      gap: 10px;
      height: 40px;
      align-items: center;

      input {
        height: 100%;
        border: none;
        padding-left: 5px;
      }
    }

    .password-container {
      display: flex;
      gap: 10px;
      height: 40px;
      align-items: center;

      input[type="password"] {
        height: 100%;
        border: none;
        padding-left: 5px;
      }

      input[type="button"] {
        height: 100%;
        width: 100px;
        background: $red;
        border: none;
      }
    }

    .avatars-container {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        width: 50px;
        height: 50px;
      }
    }

    .plans-container {
      display: flex;
      gap: 20px;
      align-items: center;

      input {
        height: 40px;
        width: 100px;
        background: $red;
        border: none;
      }
    }

    .genres-container {
      display: flex;
      justify-content: space-evenly;

      .genre {
        display: flex;
        width: 25%;
        flex-direction: column;
      }
    }

    .save {
      align-self: flex-end;

      input[type="submit"] {
        height: 40px;
        width: 100px;
        background: $red;
        border: none;
      }

      p {
        color: $red;
      }
    }
  }
}
</style>
