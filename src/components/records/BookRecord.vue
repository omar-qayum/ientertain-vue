<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping, faMinus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartR } from "@fortawesome/free-regular-svg-icons";
import RecordControls from "@/components/records/RecordControls.vue";
import RecordTabs from "@/components/records/RecordTabs.vue";

library.add(faCartShopping);
library.add(faMinus);
library.add(faHeart);
library.add(faHeartR);

const props = defineProps(["record", "controls"]);
</script>

<template>
  <div class="content">
    <RecordTabs :tabs="['about', 'summary', 'details']" class="tabs">
      <template #about>
        <div class="about">
          <img :src="props.record.image" />
          <div class="details">
            <h1 class="title">{{ props.record.title }}</h1>
            <h1 class="authors">{{ props.record.authors.join(", ") }}</h1>
            <h1 class="genre">{{ props.record.genre }}</h1>
            <h1 class="date">{{ props.record.date.substring(0, 4) }}</h1>
            <h1 class="pages">{{ props.record.pages }} pgs.</h1>
          </div>
        </div>
      </template>
      <template #summary>
        <div class="summary">
          {{
            props.record.summary === null
              ? "A summary for this book is unavailable."
              : props.record.summary
          }}
        </div>
      </template>
      <template #details>
        <div class="details"></div>
      </template>
    </RecordTabs>
    <div v-if="props.controls" class="controls">
      <RecordControls category="books" :record="props.record" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  width: 100%;
  height: 100%;
  padding: 1rem;
  gap: 0.5rem;
  background-color: $lightBlack;

  .tabs {
    grid-column: span 10;
    grid-row: 1 / span 9;

    .about {
      display: flex;
      flex-direction: column;
      background: $lightBlack;
      gap: 0.5rem;

      img {
        height: 40%;
        aspect-ratio: 3 / 4;
        align-self: center;
      }

      .details {
        line-height: 1.5rem;

        h1.title {
          font-size: 1.5rem;
          color: $lightBlue;
        }
      }
    }

    .summary {
      height: 100%;
      overflow-y: auto;
    }
  }

  .controls {
    grid-column: span 10;
    display: flex;
    gap: 0.5rem;
  }
}

@media (orientation: landscape) and (min-width: 568px) {
  .content {
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: repeat(16, 1fr);

    .tabs {
      grid-column: span 16;
      grid-row: 1 / span 15;

      .about {
        height: 100%;
        flex-direction: row;
        align-items: center;

        img {
          height: 100%;
        }
      }
    }

    .controls {
      grid-column: span 16;
    }
  }
}
</style>
