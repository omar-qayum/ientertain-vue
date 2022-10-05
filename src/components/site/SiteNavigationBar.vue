<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/index.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBook, faGamepad, faFilm, faMusic, faGear, faHammer, faHeart, faCartShopping, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

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
  <div class="navbar-container">
    <h1 class="logo">iEntertain</h1>
    <div class="quotas">
      <div class="item">
        <icon class="icon" icon="fa-solid fa-book" />
        <p class="plan-quota">{{ userStore.quotas.get("books") }}</p>
      </div>
      <div class="item">
        <icon class="icon" icon="fa-solid fa-gamepad" />
        <p class="plan-quota">{{ userStore.quotas.get("games") }}</p>
      </div>
      <div class="item">
        <icon class="icon" icon="fa-solid fa-film" />
        <p class="plan-quota">{{ userStore.quotas.get("movies") }}</p>
      </div>
      <div class="item">
        <icon class="icon" icon="fa-solid fa-music" />
        <p class="plan-quota">{{ userStore.quotas.get("music") }}</p>
      </div>
    </div>
    <div class="user">
      <img class="avatar" :src="userStore.user.photoURL" />
      <p class="username">{{ userStore.user.displayName }}</p>
    </div>
    <div class="controls">
      <RouterLink to="/account/settings">
        <icon class="icon" icon="fa-solid fa-gear" />
      </RouterLink>
      <RouterLink v-if="isAdmin" to="/account/admin">
        <icon class="icon" icon="fa-solid fa-hammer" />
      </RouterLink>
      <RouterLink to="/account/wishlist">
        <icon-layers class="icon">
          <icon class="icon" icon="fa-solid fa-heart" />
          <icon-layers-text class="icon-bubble" counter :value="userStore.getWishlistSize()" position="top-right" />
        </icon-layers>
      </RouterLink>
      <RouterLink to="/account/cart">
        <icon-layers class="icon">
          <icon class="icon" icon="fa-solid fa-cart-shopping" />
          <icon-layers-text class="icon-bubble" counter :value="userStore.getShoppingCartSize()" position="top-right" />
        </icon-layers>
      </RouterLink>
      <RouterLink @click="userStore.logout()" to="/">
        <icon class="icon" icon="fa-solid fa-right-from-bracket" />
      </RouterLink>
    </div>
    <nav class="navigation">
      <RouterLink to="/categories/home">Home</RouterLink>
      <RouterLink to="/categories/books">Books</RouterLink>
      <RouterLink to="/categories/games">Games</RouterLink>
      <RouterLink to="/categories/movies">Movies</RouterLink>
      <RouterLink to="/categories/music">Music</RouterLink>
    </nav>
    <input class="search" type="text" v-model="searchCriteria" placeholder="Search" @keyup.enter="userStore.router.push(`/categories/search?q=${searchCriteria.toLowerCase()}`)" />
  </div>
</template>

<style lang="scss" scoped>
.navbar-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-areas: "logo" "quotas" "user" "controls" "navigation" "search";
  background: $navyBlue;
  gap: 1rem;
  width: 100%;

  .logo {
    grid-area: logo;
    text-align: center;
    font-size: 2rem;
    background-color: $skyBlue;
    color: white;
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
        color: white;
      }

      .plan-quota {
        align-self: flex-start;
        font-size: 1.5rem;
        font-weight: 700;
        color: $lightBlack;
      }
    }
  }

  .user {
    grid-area: user;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    .avatar {
      width: clamp(50px, 3rem, 3rem);
      aspect-ratio: 1 / 1;
    }

    .username {
      font-size: 1.5rem;
      font-weight: 700;
      color: white;
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

      .icon-bubble {
        font-size: 2.25rem;
        background-color: $lightBlue;
      }
    }

    a:hover {
      .icon {
        transform: scale(1.2);
        transition: all 0.3s ease-in-out;
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
      color: white;

      &:hover,
      &.router-link-active {
        border-bottom: 3px solid $skyBlue;
      }
    }
  }

  .search {
    grid-area: search;
    font-size: 1.25rem;
    color: $darkBlack;
    padding: 0.2rem;
  }
}

@media (min-width: 480px) {
  .navbar-container {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "logo logo"
      "quotas quotas"
      "user controls"
      "navigation navigation"
      "search search";
    padding: 1rem;

    .logo {
      background-color: $navyBlue;
    }
  }
}

@media (min-width: 768px) {
  .navbar-container {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "logo . user user"
      "quotas quotas controls controls"
      "navigation navigation search search";

    .logo {
      background-color: $navyBlue;
      text-align: left;
      align-self: center;
    }

    .user {
      justify-content: end;
    }

    .quotas {
      justify-self: start;
      gap: 1rem;
    }

    .controls {
      justify-self: end;
      gap: 1rem;
    }

    .navigation {
      align-self: center;
    }
  }
}

@media (min-width: 1025px) {
  .navbar-container {
    grid-template-columns: repeat(10, 1fr);
    grid-template-areas:
      "logo logo logo quotas quotas quotas user user user user"
      "navigation navigation navigation navigation navigation controls controls controls controls controls"
      "search search search search search search search search search search";
  }
}

@media (min-width: 1260px) {
  .navbar-container {
    grid-template-areas:
      "logo logo quotas quotas quotas user user user controls controls"
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
