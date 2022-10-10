<script setup>
import axios from "axios";
import SiteTabs from "@/components/site/SiteTabs.vue";
import RecordControls from "@/components/records/RecordControls.vue";

const props = defineProps(["id"]);
const record = (await axios.get(`http://localhost:5000/api/v1/user/search/books/${props.id}`)).data;
</script>

<template>
  <div class="record">
    <SiteTabs :tabs="['about', 'summary', 'details']" class="tabs">
      <template #about>
        <div class="about">
          <img :src="record.image" />
          <div class="details">
            <p class="title">{{ record.title }}</p>
            <p>{{ record.authors }}</p>
            <p>{{ record.publisher }}</p>
            <p>{{ record.genre }}</p>
            <p>{{ record.date }}</p>
            <p>{{ record.pages }} pgs.</p>
            <p>{{ `ISBN ${record.isbn}` }}</p>
          </div>
        </div>
      </template>
      <template #summary>
        <div class="summary">
          {{ record.summary }}
        </div>
      </template>
      <template #details>
        <div class="details"></div>
      </template>
    </SiteTabs>
    <RecordControls class="controls" category="books" :record="record" />
  </div>
</template>

<style lang="scss" scoped>
.record {
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
      height: 100%;

      img {
        height: 40%;
        aspect-ratio: 3 / 4;
        align-self: center;
      }

      .details {
        width: 100%;
        line-height: 1.5rem;
        overflow-y: auto;

        p.title {
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
  }
}

@media (orientation: landscape) and (min-width: 568px) {
  .record {
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

        .details {
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
