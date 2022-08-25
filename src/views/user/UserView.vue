<script setup>
import { useStore } from "vuex";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import ItemModal from "../../components/ItemModal.vue";
import { ref } from "vue";
import { updatePassword } from "firebase/auth"
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase/index.js";

library.add(faGear);
library.add(faRightFromBracket);

const storage = getStorage();
const store = useStore();

const showSettingsModal = ref(false);
const displayName = ref(store.state.displayName);
const photoURL = ref(store.state.photoURL);
const plan = ref(store.state.plan);
const newPassword = ref("");
const reenterPassword = ref("");
const message = ref("Press save when done!");

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

const logout = () => {
  store.dispatch('logout');
};

const toggleSettingsModal = () => {
  showSettingsModal.value = !showSettingsModal.value;
}

// Funtions for user account settings
const changeAvatar = (avatar) => {
  photoURL.value = avatar;
  message.value = "New avatar selected!";
}

const changePlan = (newPlan) => {
  plan.value = newPlan;
  message.value = `${newPlan} selected!`;
}

const changePassword = () => {
  if (newPassword.value === reenterPassword.value) {
    updatePassword(store.state.user, newPassword.value).then(() => {
      message.value = "Password updated successfully!"
      newPassword.value = "";
      reenterPassword.value = "";
    }).catch((error) => {
      message.value = error.message;
    });
  } else {
    message.value = "Passwords do not match!"
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

const saveChanges = (moviePreferences, gamePreferences, musicPreferences, bookPreferences) => {
  // Save any Google user profile changes
  if (store.state.displayName !== displayName.value || store.state.photoURL !== photoURL.value) {
    store.dispatch("updateUserProfile", {
      user: store.state.user,
      displayName: displayName.value,
      photoURL: photoURL.value,
    });
  }
  // Save any plan changes
  if (store.state.plan !== plan.value) {
    httpsCallable(functions, "updatePlan")({ plan: plan.value });
    store.commit("setPlan", plan.value);
  }
  // Save any category preference changes
  httpsCallable(functions, "updatePreferences")({
    moviePreferences: Array.from(moviePreferences.values()),
    gamePreferences: Array.from(gamePreferences.values()),
    musicPreferences: Array.from(musicPreferences.values()),
    bookPreferences: Array.from(bookPreferences.values()),
  });
  store.commit("setMoviePreferences", moviePreferences);
  store.commit("setGamePreferences", gamePreferences);
  store.commit("setMusicPreferences", musicPreferences);
  store.commit("setBookPreferences", bookPreferences);
  toggleSettingsModal();
}
</script>

<template>
  <div class="nav-container">
    <h1 class="logo">iEntertain</h1>
    <nav class="navigation">
      <router-link to="/user/home">Home</router-link>
      <router-link to="/user/movies">Movies</router-link>
      <router-link to="/user/games">Games</router-link>
      <router-link to="/user/music">Music</router-link>
      <router-link to="/user/books">Books</router-link>
    </nav>
    <div class="user">
      <img class="avatar" :src="store.state.photoURL" />
      <h2 v-if="store.state.displayName">{{ store.state.displayName }}</h2>
      <button @click="toggleSettingsModal()">
        <icon class="fa-2x" icon="fa-solid fa-gear" />
      </button>
      <router-link to="/admin">Admin</router-link>
      <router-link @click="logout()" to="/">
        <icon class="fa-2x" @click="left" icon="fa-solid fa-right-from-bracket" />
      </router-link>
    </div>
  </div>
  <router-view></router-view>
  <ItemModal v-if="showSettingsModal" @toggleModal="toggleSettingsModal()">
    <template #user="{ moviePreferences, gamePreferences, musicPreferences, bookPreferences }">
      <div class="settings-modal-inner-container">
        <form @submit.prevent="saveChanges(moviePreferences, gamePreferences, musicPreferences, bookPreferences )">
          <h1>Account Settings</h1>
          <div class="user-info-container">
            <img :src="photoURL" />
            <div class="account-details">
              <h2>{{ displayName }}</h2>
              <h2>{{ store.state.email }}</h2>
              <h2>{{ plan }}</h2>
            </div>
            <div class="save">
              <input type="submit" value="Save" />
              <p>{{ message }}</p>
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
              <label>Movies</label>
              <template v-for="genre in store.state.movieRecords.keys()" :key="genre">
                <label><input type="checkbox" @click="changePreference(moviePreferences, genre, $event)" :value="genre"
                    :checked="store.state.moviePreferences.has(genre) ? 'checked' : null" />{{ genre }}</label>
              </template>
            </div>
            <div class="genre">
              <label>Games</label>
              <template v-for="genre in store.state.gameRecords.keys()" :key="genre">
                <label><input type="checkbox" @click="changePreference(gamePreferences, genre, $event)" :value="genre"
                    :checked="store.state.gamePreferences.has(genre) ? 'checked' : null" />{{ genre }}</label>
              </template>
            </div>
            <div class="genre">
              <label>Music</label>
              <template v-for="genre in store.state.musicRecords.keys()" :key="genre">
                <label><input type="checkbox" @click="changePreference(musicPreferences, genre, $event)" :value="genre"
                    :checked="store.state.musicPreferences.has(genre) ? 'checked' : null" />{{ genre }}</label>
              </template>
            </div>
            <div class="genre">
              <label>Books</label>
              <template v-for="genre in store.state.bookRecords.keys()" :key="genre">
                <label><input type="checkbox" @click="changePreference(bookPreferences, genre, $event)" :value="genre"
                    :checked="store.state.bookPreferences.has(genre) ? 'checked' : null" />{{ genre }}</label>
              </template>
            </div>
          </div>
        </form>
      </div>
    </template>
  </ItemModal>
</template>

<style lang="scss" scoped>
.nav-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  background: $red;
  height: 50px;
  align-items: center;
  grid-template-areas: "logo logo navigation navigation navigation navigation navigation navigation navigation user user user";

  .logo {
    grid-area: logo;
    margin: 0px;
    text-align: center;
  }

  .navigation {
    grid-area: navigation;

    a {
      text-decoration: none;
      padding: 10px;
      color: black;
    }

    a:hover {
      background: white;
    }
  }

  .user {
    grid-area: user;
    justify-items: end;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .avatar {
      height: 50px;
      width: 50px;
    }

    h2 {
      display: inline-block;
    }

    a {
      text-decoration: none;
      padding: 10px;
      color: black;
    }

    a:hover {
      background: white;
    }
  }
}

.settings-modal-inner-container {
  padding: 30px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 720px;
  width: 600px;
  background: #000000cc;
  border: white solid 1px;
  box-sizing: border-box;

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
