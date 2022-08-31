<script setup>
import { useUserStore } from "@/store/index.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear, faHammer, faHeart, faCartShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

library.add(faGear);
library.add(faHammer);
library.add(faHeart);
library.add(faCartShopping);
library.add(faRightFromBracket);

const userStore = useUserStore();
const isAdmin = (await userStore.user.getIdTokenResult(true)).claims.admin;

const logout = () => {
  userStore.logout();
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
    <div class="search">
      <input type="text" placeholder="Search">
    </div>
    <div class="user">
      <img class="avatar" :src="userStore.user.photoURL" />
      <h2>{{  userStore.user.displayName  }}</h2>
      <a :href="$router.resolve({ path: '/account/settings' }).href">
        <icon class="fa-2x" icon="fa-solid fa-gear" />
      </a>
      <router-link v-if="isAdmin" to="/account/admin">
        <icon class="fa-2x" icon="fa-solid fa-hammer" />
      </router-link>
      <router-link to="/account/favourites">
        <icon class="fa-2x" icon="fa-solid fa-heart" />
      </router-link>
      <router-link to="/account/cart">
        <icon-layers class="fa-2x">
          <icon icon="fa-solid fa-cart-shopping" />
          <icon-layers-text counter :value="userStore.getCartSize()" position="top-right" transform="shrink-10 right-20 down-10"/>
        </icon-layers>
      </router-link>
      <router-link @click="logout()" to="/">
        <icon class="fa-2x" icon="fa-solid fa-right-from-bracket" />
      </router-link>
    </div>
  </div>
  <div class="quotas-container">
    <h2 v-for="[category, quota] in userStore.categoryQuotas" :key="category">{{  `${category}: ${quota}`  }}</h2>
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
    grid-template-areas: "logo logo navigation navigation navigation search search search user user user user";
  
    .logo {
      grid-area: logo;
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
  
    .search {
      grid-area: search;
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
  
  .quotas-container {
    display: flex;
    gap: 50px;
  
    h2 {
      text-transform: capitalize;
    }
  }
  </style>
  