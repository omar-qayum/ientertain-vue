<template>
  <div class="nav-container">
    <h1 class="logo">iEntertain</h1>
    <nav class="navigation">
      <router-link to="/account/home">Home</router-link>
      <router-link to="/account/movies">Movies</router-link>
      <router-link to="/account/games">Games</router-link>
      <router-link to="/account/home">Music</router-link>
      <router-link to="/account/home">Books</router-link>
    </nav>
    <div class="user">
      <h2 v-if="store.state.user">Hi, {{ store.state.user.email }}</h2>
      <router-link to="/account/home">My Account</router-link>
      <router-link @click="signOut" to="/">Sign Out</router-link>
    </div>
  </div>
  <router-view></router-view>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

const signOut = () => {
  store.dispatch('logout');
};

</script>

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
</style>
