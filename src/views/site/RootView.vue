<script setup>
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import { ref, onMounted } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBook, faGamepad, faFilm, faMusic } from "@fortawesome/free-solid-svg-icons";

library.add(faBook);
library.add(faGamepad);
library.add(faFilm);
library.add(faMusic);

const storage = getStorage();
const heroImage = ref(await getDownloadURL(storageRef(storage, "site/main/hero1.jpg")));
const booksImage = ref(await getDownloadURL(storageRef(storage, "site/main/books.jpg")));
const gamesImage = ref(await getDownloadURL(storageRef(storage, "site/main/games.jpg")));
const moviesImage = ref(await getDownloadURL(storageRef(storage, "site/main/movies.jpg")));
const musicImage = ref(await getDownloadURL(storageRef(storage, "site/main/music.jpg")));

const booksContainer = ref(null);
const gamesContainer = ref(null);
const moviesContainer = ref(null);
const musicContainer = ref(null);
const plansContainer = ref(null);

const containers = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("plans-container")) {
        entry.target.classList.add("animate-plans-entry");
      } else {
        entry.target.classList.add("animate-category-entry");
      }
      observer.unobserve(entry.target);
    }
  });
};

onMounted(() => {
  const observer = new IntersectionObserver(containers, {
    threshold: 0.5,
  });
  observer.observe(booksContainer.value);
  observer.observe(gamesContainer.value);
  observer.observe(moviesContainer.value);
  observer.observe(musicContainer.value);
  observer.observe(plansContainer.value);
});
</script>

<template>
  <div class="main-container">
    <nav>
      <p class="logo">iEntertain</p>
      <RouterLink to="/login" custom v-slot="{ navigate }">
        <button class="login-button" @click="navigate" role="link">Login</button>
      </RouterLink>
    </nav>
    <div class="hero-container">
      <img class="hero-image" :src="heroImage" />
      <div class="hero-message">
        <p class="hero-message-main">OWN Your Entertainment!</p>
        <p class="hero-message-sub">The best entertainment ... all in one place.</p>
        <RouterLink to="/register/bookworm" custom v-slot="{ navigate }">
          <button class="register-button" @click="navigate" role="link">Register</button>
        </RouterLink>
      </div>
    </div>
    <div class="books-container" ref="booksContainer">
      <div class="description">
        <p class="category-slogan-main">Books to keep</p>
        <p class="category-slogan-main">you company.</p>
        <p class="category-slogan-sub">Read titles from your favourite authors.</p>
      </div>
      <img class="category-image" :src="booksImage" />
    </div>
    <div class="games-container" ref="gamesContainer">
      <div class="description">
        <p class="category-slogan-main">Games to test</p>
        <p class="category-slogan-main">your skills.</p>
        <p class="category-slogan-sub">Play the hottest videos games on the market.</p>
      </div>
      <img class="category-image" :src="gamesImage" />
    </div>
    <div class="movies-container" ref="moviesContainer">
      <div class="description">
        <p class="category-slogan-main">Movies to share</p>
        <p class="category-slogan-main">quality time.</p>
        <p class="category-slogan-sub">Watch the latest releases from any genre.</p>
      </div>
      <img class="category-image" :src="moviesImage" />
    </div>
    <div class="music-container" ref="musicContainer">
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
        At iEntertain we believe that owning your entertainment is always better than streaming or renting. This is why we have partnered with the biggest names in the entertainemt industry to bring
        you the latest releases. Whether you love books, games, movies or music, we got you covered. Best of all, you can try our service for FREE for a month.
        <RouterLink class="register-link" to="/register/bookworm">Register</RouterLink> today and start owning your entertainment!
      </p>
    </div>
    <div class="plans-container" ref="plansContainer">
      <p class="plans-title">Select a Plan:</p>
      <div class="all-plans">
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
          <RouterLink to="/register/bookworm" custom v-slot="{ navigate }">
            <button class="plan-button" @click="navigate" role="link">Select</button>
          </RouterLink>
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
          <RouterLink to="/register/geek" custom v-slot="{ navigate }">
            <button class="plan-button" @click="navigate" role="link">Select</button>
          </RouterLink>
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
          <RouterLink to="/register/binger" custom v-slot="{ navigate }">
            <button class="plan-button" @click="navigate" role="link">Select</button>
          </RouterLink>
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
          <RouterLink to="/register/audiophile" custom v-slot="{ navigate }">
            <button class="plan-button" @click="navigate" role="link">Select</button>
          </RouterLink>
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
.main-container {
  align-self: center;
  color: white;

  nav {
    display: flex;
    background-color: $skyBlue;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;

    .logo {
      font-size: 2rem;
      font-weight: 700;
    }

    .login-button {
      color: white;
      background: $red;
      border: none;
      font-weight: bold;
      padding: 0.75rem;
      border-radius: 0.5rem;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
        transition: all 0.25s ease-in-out;
      }
    }
  }

  .hero-container {
    position: relative;
    min-height: 75vh;

    .hero-image {
      width: 100%;
      height: 75vh;
      filter: blur(3px);
    }

    .hero-message {
      position: absolute;
      display: flex;
      flex-direction: column;
      top: 25%;
      left: 5%;
      gap: 0.5rem;

      .hero-message-main {
        font-size: 2rem;
        font-weight: 700;
      }

      .hero-message-sub {
        font-size: 1.25rem;
      }

      .register-button {
        padding: 0.5rem;
        border: none;
        color: white;
        background-color: $navyBlue;
        cursor: pointer;
        transition: 0.3s;
        font-weight: bold;
        width: 25%;

        &:hover {
          transform: scale(1.1);
          transition: all 0.25s ease-in-out;
        }
      }
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
    padding: 4rem;
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
      color: $lightBlack;

      &:hover {
        color: white;
      }
    }
  }

  .plans-container {
    padding: 1rem 2rem;
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
        border-radius: 0.75rem;

        .plan-name {
          font-size: 1.5rem;
          font-weight: 700;
          background-color: $lightBlue;
          color: $lightBlack;
          width: 100%;
          padding: 0.5rem;
          border-radius: 0.75rem 0.75rem 0 0;
        }

        .plan-icon {
          color: white;
          font-size: 2.5rem;
        }

        ul {
          li {
            list-style: none;
            font-size: 1.25rem;
            color: white;
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
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: bold;
          cursor: pointer;

          &:hover {
            transform: scale(1.1);
            transition: all 0.25s ease-in-out;
          }
        }
      }
    }
  }

  footer {
    padding: 2rem;
    p {
      font-size: 1.5rem;
      font-weight: 700;
      text-align: center;
    }
  }
}

@media (orientation: landscape) {
  .main-container {
    max-width: 1400px;

    .books-container,
    .games-container,
    .movies-container,
    .music-container {
      display: flex;
      align-items: center;
      padding: 1rem 2rem;
      opacity: 0.1;

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

      &.animate-category-entry {
        opacity: 1;
        transition: all 2s ease-in;
        .description {
          left: 0;
          transition: all 1s ease-in;
        }
        .category-image {
          left: 0;
          transition: all 1s ease-in;
        }
      }
    }

    .books-container,
    .movies-container {
      .description {
        position: relative;
        left: -1000px;
      }
      .category-image {
        position: relative;
        left: 1000px;
      }
    }

    .games-container,
    .music-container {
      flex-direction: row-reverse;
      .description {
        position: relative;
        left: -1000px;
      }
      .category-image {
        position: relative;
        left: 1000px;
      }
    }

    .plans-container {
      .all-plans {
        .plan {
          position: relative;
          top: 500px;
        }
      }
      &.animate-plans-entry {
        .all-plans {
          .plan:nth-child(1) {
            top: 0;
            transition: all 1s ease-in;
          }
          .plan:nth-child(2) {
            top: 0;
            transition: all 1s ease-in 0.25s;
          }
          .plan:nth-child(3) {
            top: 0;
            transition: all 1s ease-in 0.5s;
          }
          .plan:nth-child(4) {
            top: 0;
            transition: all 1s ease-in 0.75s;
          }
        }
      }
    }
  }
}
</style>
