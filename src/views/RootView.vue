<script setup>
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import { ref } from "vue";

const storage = getStorage();
const mainImage = ref(await getDownloadURL(storageRef(storage, 'site/main/main.jpg')));
const moviesImage = ref(await getDownloadURL(storageRef(storage, 'site/main/movies.jpg')));
const gamesImage = ref(await getDownloadURL(storageRef(storage, 'site/main/games.jpg')));
const musicImage = ref(await getDownloadURL(storageRef(storage, 'site/main/music.jpg')));
const booksImage = ref(await getDownloadURL(storageRef(storage, 'site/main/books.jpg')));
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
        <h2>
          Get the hottest movies, games, music and books, all in one place.
        </h2>
        <router-link to="/register" custom v-slot="{ navigate }">
          <button class="register" @click="navigate" role="link">Register</button>
        </router-link>
      </div>
    </div>
    <div class="movies-container">
      <div class="description">
        <h1 class="first-word">WATCH </h1>
        <h2 class="category-text">
          the latest movies!
        </h2>
      </div>
      <img class="image" :src="moviesImage" />
    </div>
    <div class="games-container">
      <img class="image" :src="gamesImage" />
      <div class="description">
        <h1 class="first-word">PLAY </h1>
        <h2 class="category-text">
          the collest games!
        </h2>
      </div>
    </div>
    <div class="music-container">
      <div class="description">
        <h1 class="first-word">LISTEN </h1>
        <h2 class="category-text">
          to the hottest music!
        </h2>
      </div>
      <img class="image" :src="musicImage" />
    </div>
    <div class="books-container">
      <img class="image" :src="booksImage" />
      <div class="description">
        <h1 class="first-word">READ </h1>
        <h2 class="category-text">
          the greatest books!
        </h2>
      </div>
    </div>
    <div class="explanation-container">
      <div class="explanation">
        <h1>How it Works!</h1>
        <h2>
          At iEntertain we believe that owning your entertainment is always better than streaming or renting. This is
          why we have
          partnered with the biggest names in the entertainemt industry. Our platform gives you access to the latest
          releases when it
          comes to movies, video games, music and books. Best of all, you can try our service for FREE for a month.
          Register today and
          we will ship your entertainemt right to your door.
        </h2>
      </div>
    </div>
    <div class="plans-container">
      <h1>Select a Plan:</h1>
      <div class="all-plans">
        <div class="plan">
          <h3>The Connoisseur</h3>
          <ul>
            <li>1 Movie</li>
            <li>1 Game</li>
            <li>1 Album</li>
            <li>1 Book</li>
          </ul>
          <h3>$9.99 / month</h3>
          <button>Select</button>
        </div>
        <div class="plan">
          <h3>The Critic</h3>
          <ul>
            <li>4 Movies</li>
          </ul>
          <h3>$9.99 / month</h3>
          <button>Select</button>
        </div>
        <div class="plan">
          <h3>The Gamer</h3>
          <ul>
            <li>4 Games</li>
          </ul>
          <h3>$9.99 / month</h3>
          <button>Select</button>
        </div>
        <div class="plan">
          <h3>The Audiophile</h3>
          <ul>
            <li>4 Albums</li>
          </ul>
          <h3>$9.99 / month</h3>
          <button>Select</button>
        </div>
        <div class="plan">
          <h3>The Bookworm</h3>
          <ul>
            <li>4 Books</li>
          </ul>
          <h3>$9.99 / month</h3>
          <button>Select</button>
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
    height: 75vh;
    width: 100%;
    position: relative;

    .image {
      height: 100%;
      width: 100%;
      opacity: 0.75;
    }

    .logo {
      position: absolute;
      top: 30px;
      left: 50px;
    }

    .login {
      position: absolute;
      top: 30px;
      right: 50px;
      background: $red;
      text-align: center;
      border: none;
      border-radius: 0%;
      color: white;
      font-weight: bold;
      font-size: larger;
      height: 50px;
      width: 120px;
    }

    .message {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .register {
      background: $red;
      border: none;
      border-radius: 0%;
      color: white;
      font-weight: bold;
      font-size: larger;
      height: 50px;
      width: 120px;
    }
  }

  .movies-container,
  .games-container,
  .music-container,
  .books-container {
    display: flex;
    border-top: 5px solid grey;
    height: 400px;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 100px;

    .image {
      height: 300px;
      width: 600px;
    }

    .description {
      width: 500px;

      .first-word {
        color: $red;
        display: inline;
      }

      .category-text {
        display: inline;
      }
    }
  }

  .explanation-container {
    border-top: 5px solid grey;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    .explanation {
      width: 75%;
    }
  }

  .plans-container {
    border-top: 5px solid grey;
    height: 500px;
    width: 100%;

    h1 {
      text-align: center;
    }

    .all-plans {
      display: flex;
      justify-content: center;
      gap: 50px;

      .plan {
        height: 250px;
        width: 200px;
        background: $grey;

        &:hover {
          border: 2px solid white;
        }

        button {
          background: $red;
          border: none;
          color: white;
          height: 40px;
          width: 70px;
        }
      }
    }
  }
}
</style>
