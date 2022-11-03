<script setup>
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import { ref, onMounted } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBook, faGamepad, faFilm, faMusic } from "@fortawesome/free-solid-svg-icons";
import ButtonText from "@/components/buttons/ButtonText.vue";
import SiteFooter from "@/components/site/SiteFooter.vue";

library.add(faBook);
library.add(faGamepad);
library.add(faFilm);
library.add(faMusic);

const storage = getStorage();
const heroImage = ref(await getDownloadURL(storageRef(storage, "site/main/hero.jpg")));
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
        <ButtonText @click="navigate" role="link">Login</ButtonText>
      </RouterLink>
    </nav>
    <div class="hero-container">
      <img class="hero-image" :src="heroImage" />
      <div class="hero-message">
        <p class="hero-message-main">OWN Your Entertainment!</p>
        <p class="hero-message-sub">The best entertainment ... all in one place.</p>
        <RouterLink to="/register/bookworm" custom v-slot="{ navigate }">
          <ButtonText class="register-button" @click="navigate" role="link">Register</ButtonText>
        </RouterLink>
      </div>
    </div>
    <div class="books-container" ref="booksContainer">
      <div class="description">
        <p class="category-slogan-main">Books to keep you company.</p>
        <p class="category-slogan-sub">Read titles from your favourite genres.</p>
      </div>
      <div class="images">
        <img class="category-image" src="http://books.google.com/books/content?id=ncUWEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" />
        <img class="category-image" src="http://books.google.com/books/content?id=3_9bAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" />
        <img class="category-image" src="http://books.google.com/books/content?id=2tKSDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" />
      </div>
    </div>
    <div class="games-container" ref="gamesContainer">
      <div class="description">
        <p class="category-slogan-main">Games to test your skills.</p>
        <p class="category-slogan-sub">Play the hottest videos games on the market.</p>
      </div>
      <div class="images">
        <img class="category-image" src="https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1r0o.jpg" />
        <img class="category-image" src="https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3dsm.jpg" />
        <img class="category-image" src="https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4tt2.jpg" />
      </div>
    </div>
    <div class="movies-container" ref="moviesContainer">
      <div class="description">
        <p class="category-slogan-main">Movies to share quality time.</p>
        <p class="category-slogan-sub">Watch the latest releases from Hollywood.</p>
      </div>
      <div class="images">
        <img class="category-image" src="https://image.tmdb.org/t/p/w500/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg" />
        <img class="category-image" src="https://image.tmdb.org/t/p/w500/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg" />
        <img class="category-image" src="https://image.tmdb.org/t/p/w500/uJYYizSuA9Y3DCs0qS4qWvHfZg4.jpg" />
      </div>
    </div>
    <div class="music-container" ref="musicContainer">
      <div class="description">
        <p class="category-slogan-main">Music to suit your mood.</p>
        <p class="category-slogan-sub">Listen to the coolest music playing.</p>
      </div>
      <div class="images">
        <img class="category-image" src="https://i.scdn.co/image/ab67616d0000b2730389027010b78a5e7dce426b" />
        <img class="category-image" src="https://i.scdn.co/image/ab67616d0000b2737fcead687e99583072cc217b" />
        <img class="category-image" src="https://i.scdn.co/image/ab67616d0000b27387459a563f92e336d282ca59" />
      </div>
    </div>
    <div class="explanation-container">
      <p class="explanation-title">Our Program</p>
      <p class="explanation-summary">
        At iEntertain we believe that owning your entertainment is always better than streaming or renting. This is why we have partnered with the biggest names in the entertainemt industry and strive
        to bring you the freshest content. Whether you love books, games, movies or music, we got you covered! Best of all, you can try our service for FREE for a month.
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
            <ButtonText @click="navigate" role="link">Select</ButtonText>
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
            <ButtonText @click="navigate" role="link">Select</ButtonText>
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
            <ButtonText @click="navigate" role="link">Select</ButtonText>
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
            <ButtonText @click="navigate" role="link">Select</ButtonText>
          </RouterLink>
        </div>
      </div>
    </div>
    <SiteFooter />
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
  }

  .hero-container {
    position: relative;
    min-height: 75vh;

    .hero-image {
      width: 100%;
      height: 75vh;
      filter: opacity(25%);
    }

    .hero-message {
      position: absolute;
      display: flex;
      flex-direction: column;
      top: 25%;
      left: 5%;
      gap: 0.5rem;

      .hero-message-main {
        font-size: 2.75rem;
        font-weight: 700;
      }

      .hero-message-sub {
        font-size: 2rem;
      }

      .register-button {
        width: min-content;
      }
    }
  }

  .books-container,
  .games-container,
  .movies-container,
  .music-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    margin-top: 1rem;
    background-color: $navyBlue;

    .description {
      .category-slogan-main {
        font-size: 2rem;
        font-weight: 700;
        text-align: center;
      }

      .category-slogan-sub {
        text-align: center;
      }
    }

    .images {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;

      .category-image {
        width: 100%;
        aspect-ratio: 3 / 4;
        border-radius: 0.75rem;
      }
    }
  }

  .explanation-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    margin-top: 1rem;
    background-color: $navyBlue;
    min-height: 30vh;

    .explanation-title {
      font-size: 2rem;
      font-weight: 700;
    }

    .explanation-summary {
      font-size: 1.25rem;
    }

    .register-link {
      color: $lightBlack;
      font-size: 1.25rem;

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
      }
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
      flex-direction: row;
      align-items: center;

      .description {
        width: 50%;
      }

      .images {
        width: 50%;
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
