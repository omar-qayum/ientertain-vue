<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear, faHammer, faCartShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import ItemModal from "../../components/ItemModal.vue";
import { getIdToken, updatePassword } from "firebase/auth"
import axios from "axios";

// ---------- Code for account view ----------
library.add(faGear);
library.add(faHammer);
library.add(faCartShopping);
library.add(faRightFromBracket);

const storage = getStorage();
const store = useStore();

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

// ---------- Code for user account settings modal ----------
const showUserSettingsModal = ref(false);
const displayName = ref(store.state.user.displayName);
const photoURL = ref(store.state.user.photoURL);
const plan = ref(store.state.plan);
const newPassword = ref("");
const reenterPassword = ref("");
const userMessage = ref("Press save when done!");

const toggleSettingsModal = () => {
  showUserSettingsModal.value = !showUserSettingsModal.value;
}

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
    updatePassword(store.state.user, newPassword.value).then(() => {
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
  const idToken = await getIdToken(store.state.user);

  // Save any Google auth user profile changes
  if (store.state.user.displayName !== displayName.value || store.state.user.photoURL !== photoURL.value) {
    store.dispatch("updateUserProfile", {
      user: store.state.user,
      displayName: displayName.value,
      photoURL: photoURL.value,
    });
  }
  // Save any plan changes
  if (store.state.plan !== plan.value) {
    axios.put("http://localhost:5000/api/v1/user/account/update-plan", { plan: plan.value }, { headers: { Authorization: "Bearer " + idToken } });
    store.commit("setPlan", plan.value);
  }
  // Save any category preference changes
  axios.put("http://localhost:5000/api/v1/user/account/update-preferences", {
    bookPreferences: Array.from(bookPreferences.values()),
    gamePreferences: Array.from(gamePreferences.values()),
    moviePreferences: Array.from(moviePreferences.values()),
    musicPreferences: Array.from(musicPreferences.values()),
  }, { headers: { Authorization: "Bearer " + idToken } });
  store.commit("setCategoryPreferences", {
    books: bookPreferences,
    games: gamePreferences,
    movies: moviePreferences,
    music: musicPreferences,
  });
  toggleSettingsModal();
}

// ---------- Code for admin account settings modal ----------
const showAdminSettingsModal = ref(false);
const isAdmin = (await store.state.user.getIdTokenResult(true)).claims.admin;
const categoryRecords = ref(new Map([["books", []], ["games", []], ["movies", []], ["music", []]]));

const toggleAdminModal = () => {
  showAdminSettingsModal.value = !showAdminSettingsModal.value;
}

const getCategoryRecords = (categories) => {
  try {
    categories.forEach(async (category) => {
      categoryRecords.value.set(category, (await axios.get(`http://localhost:5000/api/v1/admin/categories/${category}`, { headers: { Authorization: "Bearer " + await getIdToken(store.state.user) } })).data);
    });
  } catch (error) {
    console.log(error.message);
  }
}

const setCategoryRecords = (categories) => {
  try {
    categories.forEach(async (category) => {
      await axios.post(`http://localhost:5000/api/v1/admin/categories/${category}`, categoryRecords.value.get(category), { headers: { Authorization: "Bearer " + await getIdToken(store.state.user) } });
      categoryRecords.value.set(category, []);
    });
  } catch (error) {
    console.log(error.message);
  }
}

const deleteCategoryRecords = (categories) => {
  try {
    categories.forEach(async (category) => {
      await axios.delete(`http://localhost:5000/api/v1/admin/categories/${category}`, { headers: { Authorization: "Bearer " + await getIdToken(store.state.user) } });
    });
  } catch (error) {
    console.log(error.message);
  }
}
</script>

<template>
  <div class="nav-container">
    <h1 class="logo">iEntertain</h1>
    <nav class="navigation">
      <router-link to="/user/home">Home</router-link>
      <router-link to="/user/books">Books</router-link>
      <router-link to="/user/games">Games</router-link>
      <router-link to="/user/movies">Movies</router-link>
      <router-link to="/user/music">Music</router-link>
    </nav>
    <div class="user">
      <img class="avatar" :src="store.state.user.photoURL" />
      <h2>{{ store.state.user.displayName }}</h2>
      <button @click="toggleSettingsModal()">
        <icon class="fa-2x" icon="fa-solid fa-gear" />
      </button>
      <button v-if="isAdmin" @click="toggleAdminModal()">
        <icon class="fa-2x" icon="fa-solid fa-hammer" />
      </button>
      <button>
        <icon class="fa-2x" icon="fa-solid fa-cart-shopping" />
      </button>
      <router-link @click="logout()" to="/">
        <icon class="fa-2x" @click="left" icon="fa-solid fa-right-from-bracket" />
      </router-link>
    </div>
  </div>
  <router-view></router-view>
  <ItemModal v-if="showUserSettingsModal" @toggleModal="toggleSettingsModal()">
    <template #user="{ bookPreferences, gamePreferences, moviePreferences, musicPreferences }">
      <div class="user-settings-modal-inner-container">
        <form @submit.prevent="saveChanges(bookPreferences, gamePreferences, moviePreferences, musicPreferences)">
          <h1>Account Settings</h1>
          <div class="user-info-container">
            <img :src="photoURL" />
            <div class="account-details">
              <h2>{{ displayName }}</h2>
              <h2>{{ store.state.user.email }}</h2>
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
              <template v-for="genre in store.state.categoryRecords.get('books').keys()" :key="genre">
                <label><input type="checkbox" @click="changePreference(bookPreferences, genre, $event)" :value="genre"
                    :checked="store.state.categoryPreferences.get('books').has(genre) ? 'checked' : null" />{{ genre
                    }}</label>
              </template>
            </div>
            <div class="genre">
              <label>Games</label>
              <template v-for="genre in store.state.categoryRecords.get('games').keys()" :key="genre">
                <label><input type="checkbox" @click="changePreference(gamePreferences, genre, $event)" :value="genre"
                    :checked="store.state.categoryPreferences.get('games').has(genre) ? 'checked' : null" />{{ genre
                    }}</label>
              </template>
            </div>
            <div class="genre">
              <label>Movies</label>
              <template v-for="genre in store.state.categoryRecords.get('movies').keys()" :key="genre">
                <label><input type="checkbox" @click="changePreference(moviePreferences, genre, $event)" :value="genre"
                    :checked="store.state.categoryPreferences.get('movies').has(genre) ? 'checked' : null" />{{ genre
                    }}</label>
              </template>
            </div>
            <div class="genre">
              <label>Music</label>
              <template v-for="genre in store.state.categoryRecords.get('music').keys()" :key="genre">
                <label><input type="checkbox" @click="changePreference(musicPreferences, genre, $event)" :value="genre"
                    :checked="store.state.categoryPreferences.get('music').has(genre) ? 'checked' : null" />{{ genre
                    }}</label>
              </template>
            </div>

          </div>
        </form>
      </div>
    </template>
  </ItemModal>
  <ItemModal v-if="showAdminSettingsModal" @toggleModal="toggleAdminModal()">
    <template #admin>
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

.user-settings-modal-inner-container {
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

.admin-settings-modal-inner-container {
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
