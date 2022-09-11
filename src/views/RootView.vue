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
const mainImage = ref(await getDownloadURL(storageRef(storage, "site/main/main.jpg")));
const moviesImage = ref(await getDownloadURL(storageRef(storage, "site/main/movies.jpg")));
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
        <h4>The best entertainemt ... all in one place.</h4>
        <router-link to="/register/connoisseur" custom v-slot="{ navigate }">
          <button class="register" @click="navigate" role="link">Register</button>
        </router-link>
      </div>
    </div>
    <div class="books-container">
      <div class="description">
        <h1>Books to keep you company.</h1>
        <h2>Read titles from your favourite authors.</h2>
      </div>
      <img class="image" :src="booksImage" />
    </div>
    <div class="games-container">
      <div class="description">
        <h1>Games to test your skills.</h1>
        <h2>Play the hottest videos games on the market.</h2>
      </div>
      <img class="image" :src="gamesImage" />
    </div>
    <div class="movies-container">
      <div class="description">
        <h1>Movies to share quality time with.</h1>
        <h2>Watch the latest releases from any genre.</h2>
      </div>
      <img class="image" :src="moviesImage" />
    </div>
    <div class="music-container">
      <div class="description">
        <h1>Music to suit your mood.</h1>
        <h2>Listen to the coolest music playing.</h2>
      </div>
      <img class="image" :src="musicImage" />
    </div>
    <div class="explanation-container">
      <h1>Our System</h1>
      <h2>
        At iEntertain we believe that owning your entertainment is always better than streaming or
        renting. This is why we have partnered with the biggest names in the entertainemt industry
        to bring you the latest releases. Whether you love books, games, movies or music, we got you
        covered. Best of all, you can try our service for FREE for a month.
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
            <li><b>5 Books</b></li>
            <li><b>5 Games</b></li>
            <li><b>5 Movies</b></li>
            <li><b>5 Albums</b></li>
          </ul>
          <h3>$19.99/m</h3>
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
          <h3>$9.99/m</h3>
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
          <h3>$9.99/m</h3>
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
          <h3>$9.99/m</h3>
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
          <h3>$9.99/m</h3>
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
    width: 100vw;
    height: 75vh;

    .image {
      width: 100%;
      height: 100%;
      opacity: 0.75;
      object-fit: cover;
    }

    .logo {
      position: absolute;
      top: 3%;
      left: 3%;
      font-size: 2rem;
    }

    .login {
      position: absolute;
      top: 3%;
      right: 3%;
      background: $red;
      text-align: center;
      border: none;
      font-weight: bold;
      padding: 0.75rem;
      font-size: 1rem;
      border-radius: 0.75rem;
      color: white;
    }

    .message {
      position: absolute;
      text-align: center;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0% 3%;

      h1 {
        font-size: 2.75rem;
      }

      h4 {
        font-size: 1.25rem;
        font-weight: lighter;
      }

      .register {
        margin-top: 1%;
        background: $red;
        text-align: center;
        border: none;
        font-weight: bold;
        padding: 0.75rem;
        font-size: 1rem;
        border-radius: 0.75rem;
        color: white;
      }
    }
  }

  .books-container,
  .games-container,
  .movies-container,
  .music-container {
    width: 100%;
    padding: 2% 10%;

    .description {
      h1 {
        text-align: center;
        font-size: 2rem;
        font-weight: 700;
      }

      h2 {
        text-align: center;
        font-size: 1rem;
        font-weight: 400;
      }
    }

    .image {
      width: 100%;
      aspect-ratio: 16 / 9;
    }
  }

  .explanation-container {
    text-align: center;
    padding: 2% 3%;
    width: 100%;

    h1 {
      font-size: 2rem;
      font-weight: 700;
      color: $red;
    }

    h2 {
      font-size: 1rem;
      font-weight: 400;
    }
  }

  .plans-container {
    width: 100%;
    padding: 2% 10%;

    h1 {
      font-size: 2rem;
      font-weight: 700;
      color: $red;
      text-align: center;
    }

    .all-plans {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 2.5%;

      .plan {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: $grey;
        padding: 10% 10%;

        .fa-2x {
          font-size: 2.5rem;
        }

        h3 {
          font-size: 1.5rem;
          color: $blue;
        }

        ul {
          li {
            list-style: none;
            font-size: 1rem;
          }

          b {
            color: $red;
          }
        }

        button {
          background: $red;
          border: none;
          color: white;
          padding: 0.75rem;
          align-self: center;
          font-size: 1rem;
          border-radius: 0.75rem;
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

@media (orientation: landscape) {
  #main {
    .books-container,
    .games-container,
    .movies-container,
    .music-container {
      display: flex;
      align-items: center;
      padding: 2% 20%;

      .description {
        width: 50%;

        h1 {
          text-align: left;
          line-height: 1;
        }

        h2 {
          text-align: left;
          margin-top: 0.3rem;
        }
      }

      .image {
        width: 50%;
        border-radius: 0.75rem;
      }
    }

    .games-container,
    .music-container {
      flex-direction: row-reverse;
      gap: 10%;
    }
  }
}
</style>
