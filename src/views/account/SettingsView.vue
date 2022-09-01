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
const preferences = new Map([
  ['books', new Set(userStore.preferences.get('books'))],
  ['games', new Set(userStore.preferences.get('games'))],
  ['movies', new Set(userStore.preferences.get('movies'))],
  ['music', new Set(userStore.preferences.get('music'))]
]);
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

const saveChanges = async () => {
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
    bookPreferences: Array.from(preferences.get('books').values()),
    gamePreferences: Array.from(preferences.get('games').values()),
    moviePreferences: Array.from(preferences.get('movies').values()),
    musicPreferences: Array.from(preferences.get('music').values()),
  }, { headers: { Authorization: "Bearer " + idToken } });
  userStore.setPreferences({
    books: preferences.get('books'),
    games: preferences.get('games'),
    movies: preferences.get('movies'),
    music: preferences.get('music'),
  });
}
</script>

<template>
  <div class="modal-inner-container">
    <form @submit.prevent="saveChanges()">
      <h1>Account Settings</h1>
      <div class="user-info-container">
        <img :src="photoURL" />
        <div class="account-details">
          <h2>{{  displayName  }}</h2>
          <h2>{{  userStore.user.email  }}</h2>
          <h2>{{  plan  }}</h2>
        </div>
        <div class="save">
          <input type="submit" value="Save" />
          <p>{{  userMessage  }}</p>
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
        <div v-for="category in ['books', 'games', 'movies', 'music']" :key="category" class="genre">
          <label>{{  category  }}</label>
          <label v-for="genre in userStore.categoryRecords.get(category).keys()" :key="genre">
            <input type="checkbox" @click="changePreference(preferences.get(category), genre, $event)"
              :value="genre" :checked="userStore.preferences.get(category).has(genre) ? 'checked' : null" />
            {{  genre  }}</label>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.modal-inner-container {
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
        text-transform: capitalize;
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
