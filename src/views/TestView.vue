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
const isAdmin = true;
const searchCriteria = ref("");
</script>

<template>
  <div class="nav-container">
    <h1 class="logo">iEntertain</h1>
    <div class="quotas">
      <icon-layers class="fa-fw fa-2x">
        <icon icon="fa-solid fa-book" />
        <icon-layers-text
          style="color: black; font-weight: bold"
          transform="right-20"
          :value="5"
        />
      </icon-layers>
      <icon-layers class="fa-fw fa-2x">
        <icon icon="fa-solid fa-gamepad" />
        <icon-layers-text
          style="color: black; font-weight: bold"
          transform="right-23"
          :value="5"
        />
      </icon-layers>
      <icon-layers class="fa-fw fa-2x">
        <icon icon="fa-solid fa-film" />
        <icon-layers-text
          style="color: black; font-weight: bold"
          transform="right-21"
          :value="5"
        />
      </icon-layers>
      <icon-layers class="fa-fw fa-2x">
        <icon icon="fa-solid fa-music" />
        <icon-layers-text
          style="color: black; font-weight: bold"
          transform="right-21"
          :value="5"
        />
      </icon-layers>
    </div>
    <div class="user">
      <img class="avatar" src="" />
      <h2>Omar</h2>
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
            :value="5"
            position="top-right"
            transform="shrink-10 right-18 down-10"
          />
        </icon-layers>
      </router-link>
      <router-link to="/account/cart">
        <icon-layers class="fa-2x">
          <icon icon="fa-solid fa-cart-shopping" />
          <icon-layers-text
            counter
            :value="5"
            position="top-right"
            transform="shrink-10 right-18 down-10"
          />
        </icon-layers>
      </router-link>
      <router-link @click="logout()" to="/">
        <icon class="fa-2x" icon="fa-solid fa-right-from-bracket" />
      </router-link>
    </div>
    <nav class="navigation">
      <router-link to="/account/home">Home</router-link>
      <router-link to="/categories/books">Books</router-link>
      <router-link to="/categories/games">Games</router-link>
      <router-link to="/categories/movies">Movies</router-link>
      <router-link to="/categories/music">Music</router-link>
    </nav>
    <input class="search" type="text" v-model="searchCriteria" placeholder="Search" />
  </div>
</template>

<style lang="scss" scoped>
.nav-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  background: $red;
  padding: 0.5%;
  align-items: center;

  .logo {
    grid-column: span 2;
    text-align: center;
    font-size: clamp(1rem, 2.5vmax, 2.5vmax);
  }

  .quotas {
    grid-column: span 5;
    display: flex;
    justify-content: center;
    gap: 50px;
  }

  .user {
    grid-column: span 3;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .avatar {
      width: clamp(50px, 2.5vmax, 2.5vmax);
      height: clamp(50px, 2.5vmax, 2.5vmax);
    }

    h2 {
      display: inline-block;
      font-size: clamp(1rem, 2.5vmax, 2.5vmax);
    }

    a {
      text-decoration: none;
      padding: 1%;
      color: black;
    }

    a:hover {
      background: white;
    }
  }

  .navigation {
    grid-column: span 4;
    display: flex;
    justify-content: space-around;
    gap: 1%;

    a {
      text-decoration: none;
      font-size: clamp(1rem, 1.5vmax, 1.5vmax);
      font-weight: bold;
      padding: 2%;
      color: white;
    }

    a:hover {
      background: black;
    }
  }

  .search {
    grid-column: span 6;
    font-size: clamp(1rem, 1.5vmax, 1.5vmax);
  }
}

@media (orientation: portrait) {
  .nav-container {
    .logo {
      grid-column: span 2;
    }

    .quotas {
      grid-column: span 8;
    }

    .user {
      justify-content: flex-start;
      grid-column: span 10;
    }

    .navigation {
      grid-column: span 10;
    }
  }
}

@media (max-width: 500px) {
  .nav-container {
    .logo {
      grid-column: span 10;
    }

    .quotas {
      grid-column: span 10;
    }

    .user {
      justify-content: flex-start;
      grid-column: span 10;
    }

    .navigation {
      grid-column: span 10;
    }
  }
}
</style>
