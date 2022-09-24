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
      <h1>iEntertain</h1>
      <router-link to="/login" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">Login</button>
      </router-link>
    </nav>
    <div class="welcome-container">
      <h1>OWN</h1>
      <h1>Your Entertainment!</h1>
      <h4>The best entertainment</h4>
      <h4>... all in one place.</h4>
      <router-link to="/register/connoisseur" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">Register</button>
      </router-link>
    </div>
    <div class="books-container">
      <div class="description">
        <h1>Books to keep</h1>
        <h1>you company.</h1>
        <h2>Read titles from your favourite authors.</h2>
      </div>
      <img class="image" :src="booksImage" />
    </div>
    <div class="games-container">
      <div class="description">
        <h1>Games to test</h1>
        <h1>your skills.</h1>
        <h2>Play the hottest videos games on the market.</h2>
      </div>
      <img class="image" :src="gamesImage" />
    </div>
    <div class="movies-container">
      <div class="description">
        <h1>Movies to share</h1>
        <h1>quality time.</h1>
        <h2>Watch the latest releases from any genre.</h2>
      </div>
      <img class="image" :src="moviesImage" />
    </div>
    <div class="music-container">
      <div class="description">
        <h1>Music to suit</h1>
        <h1>your mood.</h1>
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
        <router-link to="/register/connoisseur">Register</router-link> today and start owning your
        entertainment!
      </h2>
    </div>
    <div class="plans-container">
      <h1>Select a Plan:</h1>
      <div class="all-plans">
        <div class="plan">
          <h3 class="plan-name">Connoisseur</h3>
          <icon class="icon" icon="fa-solid fa-palette" />
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
          <h3 class="plan-name">Bookworm</h3>
          <icon class="icon" icon="fa-solid fa-book" />
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
          <h3 class="plan-name">Geek</h3>
          <icon class="icon" icon="fa-solid fa-gamepad" />
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
          <h3 class="plan-name">Binger</h3>
          <icon class="icon" icon="fa-solid fa-film" />
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
          <h3 class="plan-name">Audiophile</h3>
          <icon class="icon" icon="fa-solid fa-music" />
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
  nav {
    display: flex;
    background-color: $skyBlue;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem;

    h1 {
      font-size: 2rem;
    }

    button {
      background: $red;
      border: none;
      font-weight: bold;
      padding: 0.5rem;
      border-radius: 0.5rem;
      color: white;
    }
  }

  .welcome-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
    background-color: #1a74e2;

    h1 {
      font-size: 2.5rem;
      line-height: 2.5rem;
      text-align: center;
    }

    h4 {
      font-size: 1.25rem;
      font-weight: 400;
      text-align: center;
    }

    button {
      margin-top: 0.5rem;
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

  .books-container,
  .games-container,
  .movies-container,
  .music-container {
    position: relative;
    padding: 0.5rem 2rem;
    margin-top: 0.5rem;
    background-color: #1a74e2;

    .description {
      h1 {
        font-size: 2rem;
        font-weight: 700;
        line-height: 2rem;
        text-align: center;
      }

      h2 {
        font-size: 1rem;
        font-weight: 400;
        text-align: center;
      }
    }

    .image {
      width: 100%;
      border-radius: 0.75rem;
      aspect-ratio: 16 / 9;
    }
  }

  .explanation-container {
    padding: 0.5rem 2rem;
    margin-top: 0.5rem;
    background-color: #1a74e2;
    text-align: center;

    h1 {
      font-size: 2rem;
      font-weight: 700;
    }

    h2 {
      font-size: 1rem;
      font-weight: 400;
    }
  }

  .plans-container {
    padding: 0.5rem 2rem;
    margin-top: 0.5rem;
    background-color: #1a74e2;

    h1 {
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
    }

    .all-plans {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;

      .plan {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #3fa0ef;
        color: $lightBlack;
        gap: 0.5rem;
        padding-bottom: 0.5rem;

        .plan-name {
          font-size: 1.5rem;
          background-color: #6bd0ff;
          width: 100%;
          text-align: center;
          padding: 0.5rem 0;
        }

        .icon {
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
            color: $darkBlack;
          }
        }

        h3 {
          font-size: 1.5rem;
        }

        button {
          background: $red;
          border: none;
          color: white;
          padding: 0.75rem;
          font-size: 1rem;
          border-radius: 0.75rem;
          font-weight: bold;
        }
      }
    }
  }

  footer {
    h1 {
      text-align: center;
      font-size: 2rem;
    }
  }
}

@media (orientation: landscape) {
  #main {
    nav {
      margin: 0 10rem;
    }

    .welcome-container {
      margin: 0 10rem;
    }

    .books-container,
    .games-container,
    .movies-container,
    .music-container {
      display: flex;
      align-items: center;
      padding: 1rem 2rem;
      margin: 1rem 10rem;

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

    .explanation-container {
      margin: 1rem 10rem;
    }

    .plans-container {
      margin: 1rem 10rem;
    }
  }
}
</style>
