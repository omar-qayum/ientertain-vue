<script setup>
</script>

<template>
  <div class="settings-modal-inner-container">
    <h1>Account Settings</h1>
    <div class="user-info">
      <img src="../assets/img/avatars/1.png" />
      <div class="account-details">
        <h2>Omar</h2>
        <h2>omar@gmail.com</h2>
        <h2>Plan A</h2>
      </div>
    </div>
    <form>
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
        <img src="../assets/img/avatars/1.png" />
        <img src="../assets/img/avatars/2.png" />
        <img src="../assets/img/avatars/3.png" />
        <img src="../assets/img/avatars/4.png" />
        <img src="../assets/img/avatars/5.png" />
        <img src="../assets/img/avatars/6.png" />
        <img src="../assets/img/avatars/7.png" />
        <img src="../assets/img/avatars/8.png" />
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
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
        </div>
        <div class="genre">
          <label>Games</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
        </div>
        <div class="genre">
          <label>Music</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
        </div>
        <div class="genre">
          <label>Books</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
          <label><input type="checkbox" name="checkbox" value="value">Adventure</label>
        </div>
      </div>
      <input class="submit" type="submit" />
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

    .submit {
      height: 40px;
      width: 100px;
      background: $red;
      border: none;
      align-self: center;
    }
  }
}
</style>
