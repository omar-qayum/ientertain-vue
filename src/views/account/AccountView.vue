<script setup>
import { useStore } from "vuex";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear, faHammer, faCartShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

library.add(faGear);
library.add(faHammer);
library.add(faCartShopping);
library.add(faRightFromBracket);

const store = useStore();
const isAdmin = (await store.state.user.getIdTokenResult(true)).claims.admin;

const logout = () => {
  store.dispatch('logout');
};
</script>
  
<template>
  <div class="nav-container">
    <h1 class="logo">iEntertain</h1>
    <nav class="navigation">
      <router-link to="/account/home">Home</router-link>
      <router-link to="/account/books">Books</router-link>
      <router-link to="/account/games">Games</router-link>
      <router-link to="/account/movies">Movies</router-link>
      <router-link to="/account/music">Music</router-link>
    </nav>
    <div class="user">
      <img class="avatar" :src="store.state.user.photoURL" />
      <h2>{{ store.state.user.displayName }}</h2>
      <a :href="$router.resolve({path: '/account/settings'}).href"><icon class="fa-2x" icon="fa-solid fa-gear" /></a>
      <router-link v-if="isAdmin" to="/account/admin">
        <icon class="fa-2x" icon="fa-solid fa-hammer" />
      </router-link>
      <router-link to="/account/cart">
        <icon class="fa-2x" icon="fa-solid fa-cart-shopping" />
      </router-link>
      <router-link @click="logout()" to="/">
        <icon class="fa-2x" @click="left" icon="fa-solid fa-right-from-bracket" />
      </router-link>
    </div>
  </div>
  <router-view></router-view>
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
  </style>
  