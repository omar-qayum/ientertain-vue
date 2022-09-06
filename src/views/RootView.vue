<script setup>
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBook,
  faGamepad,
  faFilm,
  faMusic,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";

library.add(faBook);
library.add(faGamepad);
library.add(faFilm);
library.add(faMusic);
library.add(faPalette);

const storage = getStorage();
const mainImage = ref(await getDownloadURL(storageRef(storage, "site/main/main.jpg")));
const moviesImage = ref(
  await getDownloadURL(storageRef(storage, "site/main/movies.jpg"))
);
const gamesImage = ref(await getDownloadURL(storageRef(storage, "site/main/games.jpg")));
const musicImage = ref(await getDownloadURL(storageRef(storage, "site/main/music.jpg")));
const booksImage = ref(await getDownloadURL(storageRef(storage, "site/main/books.jpg")));
</script>

<template>
  <div id="main">
    <div class="welcome-container">
      <img class="image" :src="mainImage" />
      <h1 class="logo">iEntertain</h1>
      <router-link to="/login" custom v-slot="{ navigate }">
        <button class="login" @click="navigate" role="link">Login</button>
      </router-link>
      <div class="message">
        <h1>OWN Your Entertainment!</h1>
        <h4>The best books, games, movies and music, all in one place.</h4>
        <router-link to="/register/connoisseur" custom v-slot="{ navigate }">
          <button class="register" @click="navigate" role="link">Register</button>
        </router-link>
      </div>
    </div>
    <div class="books-container">
      <div class="image">
        <img :src="booksImage" />
      </div>
      <div class="description">
        <h1 class="first-word">BOOKS!</h1>
        <h2 class="category-text">
          Read the freshest titles from your favourite authors.
        </h2>
      </div>
    </div>
    <div class="games-container">
      <div class="description">
        <h1 class="first-word">GAMES!</h1>
        <h2 class="category-text">Play the hottest videos games on the market.</h2>
      </div>
      <div class="image">
        <img :src="gamesImage" />
      </div>
    </div>
    <div class="movies-container">
      <div class="image">
        <img :src="moviesImage" />
      </div>
      <div class="description">
        <h1 class="first-word">MOVIES!</h1>
        <h2 class="category-text">Watch the latest releases from a host of genres.</h2>
      </div>
    </div>
    <div class="music-container">
      <div class="description">
        <h1 class="first-word">MUSIC!</h1>
        <h2 class="category-text">Listen to the coolest music playing.</h2>
      </div>
      <div class="image">
        <img :src="musicImage" />
      </div>
    </div>
    <div class="explanation-container">
      <h1>How it Works!</h1>
      <h2>
        At iEntertain we believe that owning your entertainment is always better than
        streaming or renting. This is why we have partnered with the biggest names in the
        entertainemt industry to bring you the latest releases. Whether you love books,
        games, movies or music, we got you covered. Best of all, you can try our service
        for FREE for a month.
        <router-link to="/register">Register</router-link> today and start owning your
        entertainment!
      </h2>
    </div>
    <div class="plans-container">
      <h1>Select a Plan:</h1>
      <div class="all-plans">
        <div class="plan">
          <icon class="fa-2x" icon="fa-solid fa-palette" />
          <h3>Connoisseur</h3>
          <ul>
            <li>5 Books</li>
            <li>5 Games</li>
            <li>5 Movies</li>
            <li>5 Albums</li>
          </ul>
          <h3>$19.99 / m</h3>
          <router-link to="/register/connoisseur" custom v-slot="{ navigate }">
            <button @click="navigate" role="link">Select</button>
          </router-link>
        </div>
        <div class="plan">
          <icon class="fa-2x" icon="fa-solid fa-book" />
          <h3>Bookworm</h3>
          <ul>
            <li><b>5 Books</b></li>
            <li>2 Games</li>
            <li>2 Movies</li>
            <li>2 Albums</li>
          </ul>
          <h3>$9.99 / m</h3>
          <router-link to="/register/bookworm" custom v-slot="{ navigate }">
            <button @click="navigate" role="link">Select</button>
          </router-link>
        </div>
        <div class="plan">
          <icon class="fa-2x" icon="fa-solid fa-gamepad" />
          <h3>Geek</h3>
          <ul>
            <li>2 Books</li>
            <li><b>5 Games</b></li>
            <li>2 Movies</li>
            <li>2 Albums</li>
          </ul>
          <h3>$9.99 / m</h3>
          <router-link to="/register/geek" custom v-slot="{ navigate }">
            <button @click="navigate" role="link">Select</button>
          </router-link>
        </div>
        <div class="plan">
          <icon class="fa-2x" icon="fa-solid fa-film" />
          <h3>Binger</h3>
          <ul>
            <li>2 Books</li>
            <li>2 Games</li>
            <li><b>5 Movies</b></li>
            <li>2 Albums</li>
          </ul>
          <h3>$9.99 / m</h3>
          <router-link to="/register/binger" custom v-slot="{ navigate }">
            <button @click="navigate" role="link">Select</button>
          </router-link>
        </div>
        <div class="plan">
          <icon class="fa-2x" icon="fa-solid fa-music" />
          <h3>Audiophile</h3>
          <ul>
            <li>2 Books</li>
            <li>2 Games</li>
            <li>2 Movies</li>
            <li><b>5 Albums</b></li>
          </ul>
          <h3>$9.99 / m</h3>
          <router-link to="/register/audiophile" custom v-slot="{ navigate }">
            <button @click="navigate" role="link">Select</button>
          </router-link>
        </div>
      </div>
    </div>
    <footer>
      <h1>API Attributes: Google Books, IGDB, TMDB and Spotify</h1>
      <h1>Omar Qayum</h1>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
#main {
  display: flex;
  flex-direction: column;
  align-items: center;

  .welcome-container {
    position: relative;
    width: 100%;
    height: 75vh;

    .image {
      width: 100%;
      height: 100%;
      opacity: 0.75;
      object-fit: cover;
    }

    .logo {
      position: absolute;
      top: 3.5%;
      left: 5%;
      width: 30vw;
      font-size: 4vmax;
    }

    .login {
      position: absolute;
      top: 3%;
      right: 3%;
      background: $red;
      text-align: center;
      border: none;
      font-weight: bold;
      padding: 1vmax;
      font-size: 1.5vmax;
      border-radius: 1vmax;
    }

    .message {
      position: absolute;
      text-align: center;
      font-size: 2vmax;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0% 5%;

      h4 {
        font-size: 2vmax;
        font-weight: lighter;
      }

      .register {
        margin-top: 1%;
        background: $red;
        text-align: center;
        border: none;
        font-weight: bold;
        padding: 1vmax;
        font-size: 1.5vmax;
        border-radius: 1vmax;
      }
    }
  }

  .books-container,
  .games-container,
  .movies-container,
  .music-container {
    display: flex;
    border-top: 5px solid grey;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 2% 20%;
    gap: 5%;

    .image {
      width: 60%;
      height: 30%;

      img {
        height: 75%;
        width: 100%;
        object-fit: cover;
      }
    }

    .description {
      display: flex;
      flex-direction: column;
      width: 40%;

      .first-word {
        color: $red;
        font-size: 3vmax;
        font-weight: bold;
      }

      .category-text {
        font-size: 2vmax;
        font-weight: lighter;
      }
    }
  }

  .explanation-container {
    border-top: 5px solid grey;
    text-align: center;
    padding: 2% 20%;
    width: 100%;

    h1 {
      font-size: 3vmax;
      color: $red;
    }

    h2 {
      font-size: 1.5vmax;
      font-weight: lighter;
    }
  }

  .plans-container {
    border-top: 5px solid grey;
    width: 100%;
    padding: 2% 5%;

    h1 {
      text-align: center;
      font-size: 3vmax;
      color: $red;
    }

    .all-plans {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2.5%;

      .plan {
        display: flex;
        flex-direction: column;
        min-width: 14%;
        max-width: 14%;
        flex-grow: 1;
        background: $grey;
        font-size: 1.5vmax;
        padding: 1% 1%;

        h3 {
          text-align: center;
          color: $blue;
        }

        ul {
          list-style: none;
        }

        button {
          background: $red;
          border: none;
          color: white;
          width: 5vmax;
          padding: 1vmax;
          align-self: center;
          font-size: 1vmax;
          border-radius: 1vmax;
        }
      }
    }
  }

  footer {
    h1 {
      text-align: center;
    }
  }
}

@media (orientation: portrait) {
  #main {
    .welcome-container {
      height: 50vh;
    }

    .games-container,
    .music-container {
      flex-direction: column;
      padding: 2% 20%;
    }

    .books-container,
    .movies-container {
      flex-direction: column-reverse;
    }

    .books-container,
    .games-container,
    .movies-container,
    .music-container {
      padding: 2% 10%;

      .image {
        width: 80%;
        height: 30%;

        img {
          height: 75%;
          width: 100%;
          object-fit: cover;
        }
      }

      .description {
        display: flex;
        width: 100%;

        .first-word {
          text-align: center;
          color: $red;
          font-size: 3vmax;
          font-weight: bold;
        }

        .category-text {
          text-align: center;
          font-size: 2vmax;
          font-weight: lighter;
        }
      }
    }

    .plans-container {
      .all-plans {
        .plan {
          min-width: 26%;
          max-width: 26%;
          margin-bottom: 2.5%;
        }
      }
    }
  }
}
</style>
