<script setup>
import { useStore } from "vuex";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import { ref } from "vue";

const storage = getStorage();
const store = useStore();
library.add(faGear);
library.add(faRightFromBracket);
const username = ref(store.state.displayName);
const avatar = ref(store.state.photoURL);
const newPassword = ref("");
const reenterPassword = ref("");

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
</script>

  <template>
  <div class="settings-modal-inner-container">
    <form @submit.prevent="save">
      <h1>Account Settings</h1>
      <div class="user-info-container">
        <img :src="avatar" />
        <div class="account-details">
          <h2>Omar</h2>
          <h2>omar@gmail.com</h2>
          <h2>Plan A</h2>
        </div>
        <div class="save">
          <input type="submit" value="Save" />
          <p>Press save when done!</p>
        </div>
      </div>
      <div class="username-container">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" placeholder="New Username" />
      </div>
      <div class="password-container">
        <label for="password">Password</label>
        <input type="password" v-model="newPassword" placeholder="New Password" />
        <input type="password" v-model="reenterPassword" placeholder="Reenter Password" />
        <input type="button" value="Change" @click="changePassword" />
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
          <label v-for="genre in store.state.moviesData" :key="genre"><input type="checkbox" value="value">{{
              genre[0].genre
          }}</label>
        </div>
        <div class="genre">
          <label>Games</label>
          <label v-for="genre in store.state.gamesData" :key="genre"><input type="checkbox" value="value">{{
              genre[0].genre
          }}</label>
        </div>
        <div class="genre">
          <label>Music</label>
          <label v-for="genre in store.state.musicData" :key="genre"><input type="checkbox" value="value">{{
              genre[0].genre
          }}</label>
        </div>
        <div class="genre">
          <label>Books</label>
          <label v-for="genre in store.state.booksData" :key="genre"><input type="checkbox" value="value">{{
              genre[0].genre
          }}</label>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
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
    }
  }
}
</style>
