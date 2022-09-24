<script setup>
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBook, faGamepad, faFilm, faMusic, faPalette } from "@fortawesome/free-solid-svg-icons";

library.add(faBook);
library.add(faGamepad);
library.add(faFilm);
library.add(faMusic);
library.add(faPalette);

const storage = getStorage();
const moviesImage = ref(await getDownloadURL(storageRef(storage, "site/main/movies.jpg")));
const gamesImage = ref(await getDownloadURL(storageRef(storage, "site/main/games.jpg")));
const musicImage = ref(await getDownloadURL(storageRef(storage, "site/main/music.jpg")));
const booksImage = ref(await getDownloadURL(storageRef(storage, "site/main/books.jpg")));
</script>

<template>
  <div id="main">
    <nav>
      <p class="logo">iEntertain</p>
      <router-link to="/login" custom v-slot="{ navigate }">
        <button class="login-button" @click="navigate" role="link">Login</button>
      </router-link>
    </nav>
    <div class="welcome-container">
      <p class="welcome-message-main">OWN</p>
      <p class="welcome-message-main">Your Entertainment!</p>
      <p class="welcome-message-sub">The best entertainment</p>
      <p class="welcome-message-sub">... all in one place.</p>
      <router-link to="/register/connoisseur" custom v-slot="{ navigate }">
        <button class="register-button" @click="navigate" role="link">Register</button>
      </router-link>
    </div>
    <div class="books-container">
      <div class="description">
        <p class="category-slogan-main">Books to keep</p>
        <p class="category-slogan-main">you company.</p>
        <p class="category-slogan-sub">Read titles from your favourite authors.</p>
      </div>
      <img class="category-image" :src="booksImage" />
    </div>
    <div class="games-container">
      <div class="description">
        <p class="category-slogan-main">Games to test</p>
        <p class="category-slogan-main">your skills.</p>
        <p class="category-slogan-sub">Play the hottest videos games on the market.</p>
      </div>
      <img class="category-image" :src="gamesImage" />
    </div>
    <div class="movies-container">
      <div class="description">
        <p class="category-slogan-main">Movies to share</p>
        <p class="category-slogan-main">quality time.</p>
        <p class="category-slogan-sub">Watch the latest releases from any genre.</p>
      </div>
      <img class="category-image" :src="moviesImage" />
    </div>
    <div class="music-container">
      <div class="description">
        <p class="category-slogan-main">Music to suit</p>
        <p class="category-slogan-main">your mood.</p>
        <p class="category-slogan-sub">Listen to the coolest music playing.</p>
      </div>
      <img class="category-image" :src="musicImage" />
    </div>
    <div class="explanation-container">
      <p class="explanation-title">Our System</p>
      <p class="explanation-summary">
        At iEntertain we believe that owning your entertainment is always better than streaming or
        renting. This is why we have partnered with the biggest names in the entertainemt industry
        to bring you the latest releases. Whether you love books, games, movies or music, we got you
        covered. Best of all, you can try our service for FREE for a month.
        <router-link class="register-link" to="/register/connoisseur">Register</router-link> today
        and start owning your entertainment!
      </p>
    </div>
    <div class="plans-container">
      <p class="plans-title">Select a Plan:</p>
      <div class="all-plans">
        <div class="plan">
          <p class="plan-name">Connoisseur</p>
          <icon class="plan-icon" icon="fa-solid fa-palette" />
          <ul>
            <li><b>5 Books</b></li>
            <li><b>5 Games</b></li>
            <li><b>5 Movies</b></li>
            <li><b>5 Albums</b></li>
          </ul>
          <p class="plan-price">$19.99/m</p>
          <router-link to="/register/connoisseur" custom v-slot="{ navigate }">
            <button class="plan-button" @click="navigate" role="link">Select</button>
          </router-link>
        </div>
        <div class="plan">
          <p class="plan-name">Bookworm</p>
          <icon class="plan-icon" icon="fa-solid fa-book" />
          <ul>
            <li><b>5 Books</b></li>
            <li>2 Games</li>
            <li>2 Movies</li>
            <li>2 Albums</li>
          </ul>
          <p class="plan-price">$9.99/m</p>
          <router-link to="/register/bookworm" custom v-slot="{ navigate }">
            <button class="plan-button" @click="navigate" role="link">Select</button>
          </router-link>
        </div>
        <div class="plan">
          <p class="plan-name">Geek</p>
          <icon class="plan-icon" icon="fa-solid fa-gamepad" />
          <ul>
            <li>2 Books</li>
            <li><b>5 Games</b></li>
            <li>2 Movies</li>
            <li>2 Albums</li>
          </ul>
          <p class="plan-price">$9.99/m</p>
          <router-link to="/register/geek" custom v-slot="{ navigate }">
            <button class="plan-button" @click="navigate" role="link">Select</button>
          </router-link>
        </div>
        <div class="plan">
          <p class="plan-name">Binger</p>
          <icon class="plan-icon" icon="fa-solid fa-film" />
          <ul>
            <li>2 Books</li>
            <li>2 Games</li>
            <li><b>5 Movies</b></li>
            <li>2 Albums</li>
          </ul>
          <p class="plan-price">$9.99/m</p>
          <router-link to="/register/binger" custom v-slot="{ navigate }">
            <button class="plan-button" @click="navigate" role="link">Select</button>
          </router-link>
        </div>
        <div class="plan">
          <p class="plan-name">Audiophile</p>
          <icon class="plan-icon" icon="fa-solid fa-music" />
          <ul>
            <li>2 Books</li>
            <li>2 Games</li>
            <li>2 Movies</li>
            <li><b>5 Albums</b></li>
          </ul>
          <p class="plan-price">$9.99/m</p>
          <router-link to="/register/audiophile" custom v-slot="{ navigate }">
            <button class="plan-button" @click="navigate" role="link">Select</button>
          </router-link>
        </div>
      </div>
    </div>
    <footer>
      <p>API Attributes: Google Books, IGDB, TMDB and Spotify</p>
      <p>Omar Qayum</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
#main {
  nav {
    display: flex;
    background-color: $skyBlue;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem;

    .logo {
      font-size: 2rem;
      font-weight: 700;
    }

    .login-button {
      background: $red;
      border: none;
      font-weight: bold;
      padding: 0.75rem;
      border-radius: 0.5rem;
      color: white;
    }
  }

  .welcome-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    background-color: #1a74e2;

    .welcome-message-main {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
    }

    .welcome-message-sub {
      font-size: 1.25rem;
      text-align: center;
    }

    .register-button {
      margin-top: 0.5rem;
      background: $red;
      border: none;
      font-weight: bold;
      padding: 0.75rem;
      border-radius: 0.5rem;
      color: white;
    }
  }

  .books-container,
  .games-container,
  .movies-container,
  .music-container {
    padding: 1rem;
    margin-top: 1rem;
    background-color: $navyBlue;

    .description {
      .category-slogan-main {
        font-size: 2rem;
        font-weight: 700;
        line-height: 2.25rem;
        text-align: center;
      }

      .category-slogan-sub {
        font-size: 1rem;
        text-align: center;
      }
    }

    .category-image {
      margin-top: 0.5rem;
      width: 100%;
      border-radius: 0.75rem;
      aspect-ratio: 16 / 9;
    }
  }

  .explanation-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin-top: 1rem;
    background-color: $navyBlue;
    min-height: 30vh;

    .explanation-title {
      font-size: 2rem;
      font-weight: 700;
    }

    .explanation-summary {
      font-size: 1rem;
    }

    .register-link {
    }
  }

  .plans-container {
    padding: 1rem;
    margin-top: 1rem;
    background-color: $navyBlue;
    text-align: center;

    .plans-title {
      font-size: 2rem;
      font-weight: 700;
    }

    .all-plans {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;

      .plan {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: $skyBlue;
        color: $lightBlack;
        gap: 0.5rem;
        padding-bottom: 0.5rem;

        .plan-name {
          font-size: 1.5rem;
          font-weight: 700;
          background-color: $lightBlue;
          color: $lightBlack;
          width: 100%;
          padding: 0.5rem;
        }

        .plan-icon {
          font-size: 2.5rem;
          color: white;
        }

        ul {
          li {
            list-style: none;
            font-size: 1.25rem;
          }

          b {
            font-size: 1.25rem;
            color: $lightBlack;
          }
        }

        .plan-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: $lightBlack;
        }

        .plan-button {
          background: $red;
          border: none;
          color: white;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: bold;
        }
      }
    }
  }

  footer {
    p {
      font-size: 1.5rem;
      font-weight: 700;
      text-align: center;
    }
  }
}

@media (orientation: landscape) {
  #main {
    max-width: 1400px;

    .books-container,
    .games-container,
    .movies-container,
    .music-container {
      display: flex;
      align-items: center;
      padding: 1rem 2rem;

      .description {
        width: 50%;
        padding: 3rem;

        .category-slogan-main {
          text-align: left;
          line-height: 1;
        }

        .category-slogan-sub {
          text-align: left;
          margin-top: 0.3rem;
        }
      }

      .category-image {
        width: 50%;
        border-radius: 0.75rem;
      }
    }

    .games-container,
    .music-container {
      flex-direction: row-reverse;
    }
  }
}
</style>
