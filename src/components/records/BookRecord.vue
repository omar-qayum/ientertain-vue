<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping, faMinus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartR } from "@fortawesome/free-regular-svg-icons";
import RecordControls from "@/components/records/RecordControls.vue";

library.add(faCartShopping);
library.add(faMinus);
library.add(faHeart);
library.add(faHeartR);

const props = defineProps(["record", "controls"]);
</script>

<template>
  <div class="modal-inner-container">
    <img :src="props.record.image" />
    <div class="details">
      <h1 class="title">{{ props.record.title }}</h1>
      <h1 class="authors">{{ props.record.authors.join(", ") }}</h1>
      <h1 class="genre">{{ props.record.genre }}</h1>
      <h1 class="date">{{ props.record.date.substring(0, 4) }}</h1>
      <h1 class="pages">{{ props.record.pages }} pgs.</h1>
      <div v-if="props.controls" class="desktop-controls">
        <RecordControls category="books" :record="props.record" />
      </div>
    </div>
    <div class="summary">
      {{
        props.record.summary === null
          ? "A summary for this book is unavailable."
          : props.record.summary
      }}
    </div>
    <div v-if="props.controls" class="mobile-controls">
      <RecordControls category="books" :record="props.record" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-inner-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(10, 1fr);
  grid-template-areas:
    "image image image image image image image image image image"
    "details details details details details details details details details details"
    "summary summary summary summary summary summary summary summary summary summary"
    "mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls";
  border: white solid 1px;
  background: $lightBlack;
  padding: 2rem;
  gap: 0.5rem;

  img {
    grid-area: image;
    height: 100%;
    aspect-ratio: 3 / 4;
    align-self: center;
    justify-self: center;
  }

  .details {
    grid-area: details;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "title title"
      "authors authors"
      "genre genre"
      "date pages";
    gap: 0.25rem;
    align-items: center;
    align-self: center;

    .title {
      grid-area: title;
      font-size: 1.5rem;
      color: $lightBlue;
    }

    .authors {
      grid-area: authors;
    }

    .genre {
      grid-area: genre;
      justify-self: center;
    }

    .date {
      grid-area: date;
      justify-self: center;
    }

    .pages {
      grid-area: pages;
      justify-self: center;
    }

    .desktop-controls {
      grid-area: desktop-controls;
      display: none;
    }
  }

  .summary {
    overflow-y: auto;
    grid-area: summary;
  }

  .mobile-controls {
    grid-area: mobile-controls;
    display: flex;
    gap: 0.5rem;
  }
}

@media (min-width: 480px) {
  .modal-inner-container {
    grid-template-areas:
      "image image image image details details details details details details"
      "summary summary summary summary summary summary summary summary summary summary"
      "mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls";

    .details {
      .genre {
        justify-self: start;
      }

      .date {
        justify-self: start;
      }

      .pages {
        justify-self: start;
      }
    }
  }
}

@media (min-width: 768px) {
  .modal-inner-container {
    grid-template-areas:
      "image image image details details details details details details details"
      "summary summary summary summary summary summary summary summary summary summary"
      "mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls";
  }
}

@media (orientation: landscape) and (min-width: 568px) {
  .modal-inner-container {
    grid-template-columns: repeat(10, 1fr);
    grid-template-areas:
      "image image details details details details details details details mobile-controls"
      "summary summary summary summary summary summary summary summary summary mobile-controls";

    img {
      height: auto;
      width: 100%;
    }

    .details {
      .genre {
        justify-self: start;
      }

      .date {
        justify-self: start;
      }

      .pages {
        justify-self: start;
      }
    }

    .mobile-controls {
      flex-direction: column;
      height: 100%;

      &:deep(button) {
        width: 100%;
        height: 100%;
      }
    }
  }
}

// Desktop
@media (orientation: landscape) and (min-width: 1024px) {
  .modal-inner-container {
    width: 80%;
    height: 80%;
    grid-template-areas:
      "image image image details details details details details details details"
      "summary summary summary summary summary summary summary summary summary summary";

    .details {
      grid-template-areas:
        "title title"
        "authors authors"
        "genre genre"
        "date ."
        "pages ."
        "desktop-controls desktop-controls";

      .desktop-controls {
        display: flex;
        gap: 0.5rem;

        &:deep(button) {
          width: 25%;
        }
      }
    }

    .mobile-controls {
      display: none;
    }
  }
}

@media (orientation: landscape) and (min-width: 1200px) {
  .modal-inner-container {
    width: 70%;
  }
}

@media (orientation: landscape) and (min-width: 1400px) {
  .modal-inner-container {
    width: 60%;
  }
}

@media (orientation: landscape) and (min-width: 1600px) {
  .modal-inner-container {
    width: 50%;
  }
}
</style>
