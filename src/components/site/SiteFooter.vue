<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

library.add(faGithub);
library.add(faLinkedin);
</script>

<template>
  <footer class="footer-container">
    <p>APIs: Google Books, IGDB, TMDB and Spotify</p>
    <div class="icons">
      <p class="name">Omar Qayum</p>
      <a class="link" href="https://github.com/omar-qayum?tab=repositories" target="_blank">
        <icon class="icon" icon="fa-brands fa-github" />
      </a>
      <a class="link" href="https://www.linkedin.com/in/omar-qayum" target="_blank">
        <icon class="icon" icon="fa-brands fa-linkedin" />
      </a>
    </div>
    <p class="disclaimer">Disclaimer: This website is for demonstration purposes only!</p>
  </footer>
</template>

<style lang="scss" scoped>
.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: white;

  p {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .icons {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;

    .link {
      .icon {
        font-size: 3rem;
      }

      &:visited {
        color: white;
      }

      &:hover {
        color: $lightBlue;
      }
    }
  }

  .name {
    color: $lightBlue;
  }

  .disclaimer {
    font-size: 1rem;
    text-decoration: underline;
  }
}
</style>
