<script setup>
import { useUserStore } from "@/store/index.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBook, faGamepad, faFilm, faMusic } from "@fortawesome/free-solid-svg-icons";

library.add(faBook);
library.add(faGamepad);
library.add(faFilm);
library.add(faMusic);

const userStore = useUserStore();
</script>

<template>
  <div class="quota-count-container">
    <p>Quotas:</p>
    <div class="quotas">
      <div class="quota">
        <icon class="icon" icon="fa-solid fa-book" />
        <p class="plan-quota">{{ userStore.quotas.get("books") }}</p>
      </div>
      <div class="quota">
        <icon class="icon" icon="fa-solid fa-gamepad" />
        <p class="plan-quota">{{ userStore.quotas.get("games") }}</p>
      </div>
      <div class="quota">
        <icon class="icon" icon="fa-solid fa-film" />
        <p class="plan-quota">{{ userStore.quotas.get("movies") }}</p>
      </div>
      <div class="quota">
        <icon class="icon" icon="fa-solid fa-music" />
        <p class="plan-quota">{{ userStore.quotas.get("music") }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.quota-count-container {
  display: flex;
  flex-direction: column;

  p {
    font-weight: 700;
    font-size: 1.25rem;
    text-align: center;
    color: white;
  }

  .quotas {
    display: flex;
    justify-content: space-around;

    .quota {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .icon {
        font-size: 2rem;
        color: $navyBlue;
      }

      .plan-quota {
        align-self: flex-start;
        font-size: 2rem;
        font-weight: 700;
        color: $lightBlue;
      }
    }
  }
}
</style>
