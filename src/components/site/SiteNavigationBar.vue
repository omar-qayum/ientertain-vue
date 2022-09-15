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
    <div class="quotas">
      <div class="item">
        <icon class="icon" icon="fa-solid fa-book" />
        <h2>{{ userStore.quotas.get("books") }}</h2>
      </div>
      <div class="item">
        <icon class="icon" icon="fa-solid fa-gamepad" />
        <h2>{{ userStore.quotas.get("games") }}</h2>
      </div>
      <div class="item">
        <icon class="icon" icon="fa-solid fa-film" />
        <h2>{{ userStore.quotas.get("movies") }}</h2>
      </div>
      <div class="item">
        <icon class="icon" icon="fa-solid fa-music" />
        <h2>{{ userStore.quotas.get("music") }}</h2>
      </div>
    </div>
    <div class="user">
      <img class="avatar" :src="userStore.user.photoURL" />
      <h2>{{ userStore.user.displayName }}</h2>
    </div>
    <div class="controls">
      <a :href="$router.resolve({ path: '/account/settings' }).href">
        <icon class="icon" icon="fa-solid fa-gear" />
      </a>
      <router-link v-if="isAdmin" to="/account/admin">
        <icon class="icon" icon="fa-solid fa-hammer" />
      </router-link>
      <router-link to="/account/wish-list">
        <icon-layers class="icon">
          <icon class="icon" icon="fa-solid fa-heart" />
          <icon-layers-text
            class="icon"
            counter
            :value="userStore.getWishListSize()"
            position="top-right"
          />
        </icon-layers>
      </router-link>
      <router-link to="/account/cart">
        <icon-layers class="icon">
          <icon class="icon" icon="fa-solid fa-cart-shopping" />
          <icon-layers-text
            class="icon"
            counter
            :value="userStore.getShoppingCartSize()"
            position="top-right"
          />
        </icon-layers>
      </router-link>
      <router-link @click="userStore.logout()" to="/">
        <icon class="icon" icon="fa-solid fa-right-from-bracket" />
      </router-link>
    </div>
    <nav class="navigation">
      <router-link to="/account/home">Home</router-link>
      <router-link to="/categories/books">Books</router-link>
      <router-link to="/categories/games">Games</router-link>
      <router-link to="/categories/movies">Movies</router-link>
      <router-link to="/categories/music">Music</router-link>
    </nav>
    <input
      type="text"
      v-model="searchCriteria"
      placeholder="Search"
      @keyup.enter="userStore.router.push(`/categories/search?q=${searchCriteria.toLowerCase()}`)"
    />
  </div>
</template>

<style lang="scss" scoped>
.nav-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-areas:
    "logo logo logo logo logo logo logo logo logo logo"
    "quotas quotas quotas quotas quotas quotas quotas quotas quotas quotas"
    "user user user user user user user user user user"
    "controls controls controls controls controls controls controls controls controls controls"
    "navigation navigation navigation navigation navigation navigation navigation navigation navigation navigation"
    "search search search search search search search search search search";
  background: $navyBlue;
  gap: 0.5rem;
  padding: 1rem;

  .logo {
    grid-area: logo;
    text-align: center;
    font-size: 2rem;
    background-color: $skyBlue;
  }

  .quotas {
    grid-area: quotas;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .item {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .icon {
        font-size: 1.5rem;
      }

      h2 {
        align-self: flex-start;
        font-size: 1.5rem;
        color: $lightBlack;
      }
    }
  }

  .user {
    grid-area: user;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .avatar {
      width: clamp(50px, 1.75rem, 1.75rem);
      aspect-ratio: 1 / 1;
    }

    h2 {
      display: inline-block;
      font-size: 1.5rem;
    }
  }

  .controls {
    grid-area: controls;
    display: flex;
    justify-content: space-around;
    align-items: center;

    a {
      .icon {
        text-decoration: none;
        color: $lightBlack;
        font-size: 1.5rem;
      }
    }

    a:hover {
      .icon {
        color: white;
      }
    }
  }

  .navigation {
    grid-area: navigation;
    display: flex;
    justify-content: space-around;

    a {
      text-decoration: none;
      font-weight: bold;
      padding: 0.5rem;
      color: white;
    }

    a:hover {
      background: $skyBlue;
    }
  }

  input[type="text"] {
    grid-area: search;
    font-size: 1rem;
    color: $lightBlack;
  }
}

@media (min-width: 480px) {
  .nav-container {
    grid-template-areas:
      "logo logo logo logo logo logo logo logo logo logo"
      "quotas quotas quotas quotas quotas quotas quotas quotas quotas quotas"
      "user user user user user controls controls controls controls controls"
      "navigation navigation navigation navigation navigation navigation navigation navigation navigation navigation"
      "search search search search search search search search search search";

    .controls {
      justify-content: end;
      gap: 1rem;
    }
  }
}

@media (min-width: 760px) {
  .nav-container {
    grid-template-areas:
      "logo logo logo . . . user user user user"
      "quotas quotas quotas quotas quotas controls controls controls controls controls"
      "navigation navigation navigation navigation navigation search search search search search";

    .logo {
      background-color: $navyBlue;
      text-align: left;
      align-self: center;
    }

    .user {
      justify-content: end;
    }

    .quotas {
      justify-content: left;
      gap: 1rem;
    }
  }
}

@media (min-width: 1025px) {
  .nav-container {
    grid-template-areas:
      "logo logo logo quotas quotas quotas user user user user"
      "navigation navigation navigation navigation navigation controls controls controls controls controls"
      "search search search search search search search search search search";
  }
}

@media (min-width: 1260px) {
  .nav-container {
    grid-template-areas:
      "logo logo quotas quotas quotas quotas user user controls controls"
      "navigation navigation navigation navigation search search search search search search";

    .quotas {
      justify-content: center;
    }

    .user {
      justify-content: end;
    }

    .controls {
      justify-content: start;
    }
  }
}
</style>
