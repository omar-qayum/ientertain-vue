<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/index.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBook,
  faGamepad,
  faFilm,
  faMusic,
  faGear,
  faHammer,
  faHeart,
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

library.add(faBook);
library.add(faGamepad);
library.add(faFilm);
library.add(faMusic);
library.add(faGear);
library.add(faHammer);
library.add(faHeart);
library.add(faCartShopping);
library.add(faRightFromBracket);

const userStore = useUserStore();
const isAdmin = (await userStore.user.getIdTokenResult(true)).claims.admin;
const searchCriteria = ref("");
</script>

<template>
  <div class="nav-container">
    <h1 class="logo">iEntertain</h1>
    <nav class="navigation">
      <router-link to="/account/home">Home</router-link>
      <router-link to="/categories/books">Books</router-link>
      <router-link to="/categories/games">Games</router-link>
      <router-link to="/categories/movies">Movies</router-link>
      <router-link to="/categories/music">Music</router-link>
    </nav>
    <div class="quotas">
      <icon-layers class="fa-fw fa-2x">
        <icon icon="fa-solid fa-book" />
        <icon-layers-text
          style="color: green"
          transform="right-20"
          :value="userStore.quotas.get('books')"
        />
      </icon-layers>
      <icon-layers class="fa-fw fa-2x">
        <icon icon="fa-solid fa-gamepad" />
        <icon-layers-text
          style="color: green"
          transform="right-23"
          :value="userStore.quotas.get('games')"
        />
      </icon-layers>
      <icon-layers class="fa-fw fa-2x">
        <icon icon="fa-solid fa-film" />
        <icon-layers-text
          style="color: green"
          transform="right-21"
          :value="userStore.quotas.get('movies')"
        />
      </icon-layers>
      <icon-layers class="fa-fw fa-2x">
        <icon icon="fa-solid fa-music" />
        <icon-layers-text
          style="color: green"
          transform="right-21"
          :value="userStore.quotas.get('music')"
        />
      </icon-layers>
    </div>
    <div class="search">
      <input
        type="text"
        v-model="searchCriteria"
        placeholder="Search"
        @keyup.enter="
          userStore.router.push(`/categories/search?q=${searchCriteria.toLowerCase()}`)
        "
      />
    </div>
    <div class="user">
      <img class="avatar" :src="userStore.user.photoURL" />
      <h2>{{ userStore.user.displayName }}</h2>
      <a :href="$router.resolve({ path: '/account/settings' }).href">
        <icon class="fa-2x" icon="fa-solid fa-gear" />
      </a>
      <router-link v-if="isAdmin" to="/account/admin">
        <icon class="fa-2x" icon="fa-solid fa-hammer" />
      </router-link>
      <router-link to="/account/wish-list">
        <icon-layers class="fa-2x">
          <icon icon="fa-solid fa-heart" />
          <icon-layers-text
            counter
            :value="userStore.getWishListSize()"
            position="top-right"
            transform="shrink-10 right-20 down-10"
          />
        </icon-layers>
      </router-link>
      <router-link to="/account/cart">
        <icon-layers class="fa-2x">
          <icon icon="fa-solid fa-cart-shopping" />
          <icon-layers-text
            counter
            :value="userStore.getShoppingCartSize()"
            position="top-right"
            transform="shrink-10 right-20 down-10"
          />
        </icon-layers>
      </router-link>
      <router-link @click="userStore.logout()" to="/">
        <icon class="fa-2x" icon="fa-solid fa-right-from-bracket" />
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  background: $red;
  height: 50px;
  align-items: center;
  grid-template-areas: "logo logo navigation navigation navigation quotas quotas search search user user user";

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

  .quotas {
    display: flex;
    gap: 50px;
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
</style>
