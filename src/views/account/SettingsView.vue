<script setup>
import { ref } from "vue";
import { getIdToken } from "firebase/auth";
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import axios from "axios";
import { useUserStore } from "@/store/index.js";

const storage = getStorage();
const userStore = useUserStore();
const menu = ref("account");
const displayName = ref(userStore.user.displayName);
const photoURL = ref(userStore.user.photoURL);
const plan = ref(userStore.plan);
const newPassword = ref("");
const reenterPassword = ref("");
const messages = ref(["Press save when done!"]);
const preferences = new Map([
  ["books", new Set(userStore.preferences.get("books"))],
  ["games", new Set(userStore.preferences.get("games"))],
  ["movies", new Set(userStore.preferences.get("movies"))],
  ["music", new Set(userStore.preferences.get("music"))],
]);
const avatars = ref(
  await Promise.all([
    getDownloadURL(storageRef(storage, "site/avatars/1.png")),
    getDownloadURL(storageRef(storage, "site/avatars/2.png")),
    getDownloadURL(storageRef(storage, "site/avatars/3.png")),
    getDownloadURL(storageRef(storage, "site/avatars/4.png")),
    getDownloadURL(storageRef(storage, "site/avatars/5.png")),
    getDownloadURL(storageRef(storage, "site/avatars/6.png")),
    getDownloadURL(storageRef(storage, "site/avatars/7.png")),
    getDownloadURL(storageRef(storage, "site/avatars/8.png")),
  ])
);

const changeMenu = (selection) => {
  messages.value = ["Press save when done!"];
  menu.value = selection;
};

const changeAvatar = (avatar) => {
  photoURL.value = avatar;
};

const changePlan = (newPlan) => {
  plan.value = newPlan;
};

const changePreference = (preferences, genre, event) => {
  if (event.target.checked) {
    preferences.add(genre);
  } else {
    preferences.delete(genre);
  }
};

const saveChanges = async () => {
  messages.value = [];

  if (menu.value === "account") {
    try {
      if (userStore.user.displayName !== displayName.value) {
        await userStore.updateUserProfile(displayName.value, photoURL.value);
        messages.value.push("Username updated successfully!");
      }
    } catch (error) {
      messages.value.push(error.message);
    }

    try {
      if (userStore.user.photoURL !== photoURL.value) {
        await userStore.updateUserProfile(displayName.value, photoURL.value);
        messages.value.push("Avatar updated successfully!");
      }
    } catch (error) {
      messages.value.push(error.message);
    }
    try {
      if (newPassword.value !== "" && reenterPassword.value !== "") {
        if (newPassword.value === reenterPassword.value) {
          await userStore.updatePassword(newPassword.value);
          messages.value.push("Password updated successfully!");
        } else {
          messages.value.push("Passwords do not match!");
        }
        newPassword.value = "";
        reenterPassword.value = "";
      }
    } catch (error) {
      messages.value.push(error.message);
      newPassword.value = "";
      reenterPassword.value = "";
    }

    if (userStore.plan !== plan.value) {
      try {
        await axios.put("http://localhost:5000/api/v1/user/account/update-plan", { plan: plan.value }, { headers: { Authorization: "Bearer " + (await getIdToken(userStore.user)) } });
        userStore.plan = plan.value;
        messages.value.push("Plan updated!");
      } catch (error) {
        messages.value.push(error.message);
      }
    }
  }
  if (menu.value === "preferences") {
    try {
      await userStore.updatePreferences(preferences);
      messages.value.push("Preferences updated!");
    } catch (error) {
      messages.value.push(error.message);
    }
  }
};
</script>

<template>
  <div class="settings-container">
    <p class="heading">Account Settings</p>
    <div class="controls">
      <button @click="changeMenu('account')">Account</button>
      <button @click="changeMenu('preferences')">Preferences</button>
      <button @click="changeMenu('purchases')">Purchases</button>
    </div>
    <div v-show="menu === 'account'" class="account">
      <form @submit.prevent="saveChanges()">
        <div class="user">
          <img class="avatar" :src="photoURL" />
          <div class="user-info">
            <p class="username">{{ displayName }}</p>
            <p class="email">{{ userStore.user.email }}</p>
            <p class="plan">{{ plan }} Plan</p>
          </div>
        </div>
        <div class="username">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="displayName" placeholder="New Username" />
        </div>
        <div v-if="!userStore.user.emailVerified" class="password">
          <label for="password">Password:</label>
          <div class="fields">
            <input type="password" v-model="newPassword" placeholder="New Password" />
            <input type="password" v-model="reenterPassword" placeholder="Reenter Password" />
          </div>
        </div>
        <div class="avatars">
          <label>Avatar:</label>
          <div class="icons">
            <img v-for="avatar in avatars" :key="avatar" :src="avatar" @click="changeAvatar(avatar)" />
          </div>
        </div>
        <div class="plans">
          <label>Plans:</label>
          <div class="buttons">
            <input v-for="plan in ['bookworm', 'geek', 'binger', 'audiophile']" :key="plan" type="button" :value="plan" @click="changePlan(plan)" />
          </div>
        </div>
        <div class="save">
          <input type="submit" value="Save" />
          <p v-for="message in messages" :key="message">{{ message }}</p>
        </div>
      </form>
    </div>
    <div v-show="menu === 'preferences'" class="preferences">
      <form @submit.prevent="saveChanges()">
        <div class="categories">
          <div v-for="category in ['books', 'games', 'movies', 'music']" :key="category" class="genres">
            <p class="header">{{ category }}</p>
            <label v-for="genre in userStore.categoryRecords.get(category).keys()" :key="genre">
              <input type="checkbox" @click="changePreference(preferences.get(category), genre, $event)" :value="genre" :checked="userStore.preferences.get(category).has(genre) ? 'checked' : null" />
              {{ genre }}</label
            >
          </div>
        </div>
        <div class="save">
          <input type="submit" value="Save" />
          <p v-for="message in messages" :key="message">{{ message }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  .heading {
    color: $navyBlue;
    font-weight: 700;
    font-size: 1.5rem;
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    button {
      background: $navyBlue;
      border: none;
      color: white;
      padding: 0.5rem;
      font-weight: 700;
    }
  }

  .account {
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: white;

      .user {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;

        .avatar {
          width: 100px;
          aspect-ratio: 1 / 1;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;

          .username {
            font-weight: 700;
            font-size: 1.5rem;
            color: $lightBlue;
          }

          .email {
            color: white;
          }

          .plan {
            color: white;
            text-transform: capitalize;
            color: $lightBlue;
          }
        }
      }

      .username {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;

        label {
          color: $lightBlue;
        }

        input {
          max-width: 400px;
          width: 100%;
          color: $darkBlack;
          border: none;
          padding: 0.2rem;
        }
      }

      .password {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;

        label {
          color: $lightBlue;
        }

        .fields {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          input {
            max-width: 200px;
            width: 100%;
            color: $darkBlack;
            border: none;
            padding: 0.2rem;
          }
        }
      }

      .avatars {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;

        label {
          color: $lightBlue;
        }

        .icons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          img {
            width: 75px;
            aspect-ratio: 1 / 1;
          }
        }
      }

      .plans {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;

        label {
          color: $lightBlue;
        }

        .buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          input {
            background: $navyBlue;
            border: none;
            color: white;
            padding: 0.5rem;
            text-transform: capitalize;
          }
        }
      }

      .save {
        input {
          background: $navyBlue;
          border: none;
          color: white;
          padding: 0.5rem;
          font-weight: 700;
          text-transform: capitalize;
        }

        p {
          color: $lightBlue;
        }
      }
    }
  }

  .preferences {
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: white;

      .categories {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;

        .genres {
          display: flex;
          flex-direction: column;

          .header {
            color: $lightBlue;
            text-transform: capitalize;
            text-align: center;
            font-size: 1.25rem;
          }
        }
      }

      .save {
        input {
          background: $navyBlue;
          border: none;
          color: white;
          padding: 0.5rem;
          text-transform: capitalize;
        }

        p {
          color: $lightBlue;
        }
      }
    }
  }
}
</style>
