<script setup>
import { useStore } from "vuex";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import ItemModal from "../../components/ItemModal.vue";
import { ref } from "vue";

library.add(faGear);
library.add(faRightFromBracket);
const store = useStore();
const showSettingsModal = ref(false);

const logout = () => {
  store.dispatch('logout');
};

const toggleSettingsModal = () => {
  showSettingsModal.value = !showSettingsModal.value;
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
      <img :src="store.state.photoURL" />
      <h2 v-if="store.state.displayName">{{ store.state.displayName }}</h2>
      <button @click="toggleSettingsModal">
        <icon class="fa-2x" icon="fa-solid fa-gear" />
      </button>
      <router-link to="/admin">Admin</router-link>
      <router-link @click="logout" to="/">
        <icon class="fa-2x" @click="left" icon="fa-solid fa-right-from-bracket" />
      </router-link>
    </div>
  </div>
  <router-view></router-view>
  <ItemModal v-if="showSettingsModal" @toggleModal="toggleSettingsModal()">
    <template #user>
      <div class="settings-modal-inner-container">
        <h1>Account Settings</h1>
        <div class="user-info">
          <img src="../../assets/img/avatars/1.png" />
          <div class="account-details">
            <h2>{{ store.state.displayName }}</h2>
            <h2>{{ store.state.email }}</h2>
            <h2>{{ store.state.plan }}</h2>
          </div>
        </div>
        <form @submit.prevent="save">
          <div class="username">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" placeholder="New Username" />
          </div>
          <div class="password">
            <label for="password">Password</label>
            <input type="password" v-model="newPassword" placeholder="New Password" />
            <input type="password" v-model="newPassword2" placeholder="Reenter Password" />
          </div>
          <div class="avatars">
            <label>Avatar</label>
            <img src="../../assets/img/avatars/1.png" />
            <img src="../../assets/img/avatars/2.png" />
            <img src="../../assets/img/avatars/3.png" />
            <img src="../../assets/img/avatars/4.png" />
            <img src="../../assets/img/avatars/5.png" />
            <img src="../../assets/img/avatars/6.png" />
            <img src="../../assets/img/avatars/7.png" />
            <img src="../../assets/img/avatars/8.png" />
          </div>
          <div class="plans">
            <label>Plans</label>
            <input type="button" value="Plan A" />
            <input type="button" value="Plan B" />
            <input type="button" value="Plan C" />
            <input type="button" value="Plan D" />
            <input type="button" value="Plan E" />
          </div>
          <div class="genres-container">
            <div class="genre">
              <label>Movies</label>
              <label v-for="genre in store.state.moviesData" :key="genre"><input type="checkbox"
                  value="value">{{ genre[0].genre }}</label>
            </div>
            <div class="genre">
              <label>Games</label>
              <label v-for="genre in store.state.gamesData" :key="genre"><input type="checkbox"
                  value="value">{{ genre[0].genre }}</label>
            </div>
            <div class="genre">
              <label>Music</label>
              <label v-for="genre in store.state.musicData" :key="genre"><input type="checkbox"
                  value="value">{{ genre[0].genre }}</label>
            </div>
            <div class="genre">
              <label>Books</label>
              <label v-for="genre in store.state.booksData" :key="genre"><input type="checkbox"
                  value="value">{{ genre[0].genre }}</label>
            </div>
          </div>
          <input type="submit" value="Save" />
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

  //grid-gap: 10px;
  .logo {
    grid-area: logo;
    //border-style: solid;
    margin: 0px;
    text-align: center;
  }

  .navigation {
    grid-area: navigation;

    //border-style: solid;

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
    //border-style: solid;
    justify-items: end;
    display: flex;
    justify-content: flex-end;
    align-items: center;

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

  .user-info {
    display: flex;
    text-align: left;
    align-items: center;
    gap: 10px;
    margin: 10px 0px;

    img {
      height: 75px;
      width: 75px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    .username {
      display: flex;
      justify-content: flex-start;
      gap: 10px;
    }

    .password {
      display: flex;
      gap: 10px;
    }

    .avatars {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        width: 50px;
        height: 50px;
      }
    }

    .plans {
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
      justify-content: space-around;

      .genre {
        display: flex;
        width: 25%;
        flex-direction: column;
      }
    }

    input[type="submit"] {
      height: 40px;
      width: 100px;
      background: $red;
      border: none;
      align-self: center;
    }
  }
}
</style>
