<script setup>
import axios from "axios";
import { useUserStore } from "@/store/index.js";
import SiteTabs from "@/components/site/SiteTabs.vue";
import RecordVideoPlayer from "@/components/records/RecordVideoPlayer.vue";
import RecordControls from "@/components/records/RecordControls.vue";

const props = defineProps(["id"]);
const userStore = useUserStore();

const record = (
  await axios.get(`http://localhost:5000/api/v1/user/search/games/${props.id}`, {
    headers: {
      Authorization: `Bearer ${userStore.idToken}`,
    },
    params: {
      igdbAccessToken: userStore.igdbAccessToken,
    },
  })
).data;
</script>

<template>
  <div class="record">
    <SiteTabs :tabs="['about', 'trailers', 'details']" class="tabs">
      <template #0>
        <div class="about">
          <img :src="record.image" />
          <div class="info">
            <p class="title">{{ record.title }}</p>
            <p>{{ record.publisher }}</p>
            <p>{{ record.genre }}</p>
            <p>{{ record.date }}</p>
            <p>{{ record.summary }}</p>
          </div>
        </div>
      </template>
      <template #1>
        <RecordVideoPlayer :videos="record.videos" />
      </template>
      <template #2>
        <div class="details"></div>
      </template>
    </SiteTabs>
    <RecordControls class="controls" category="games" :record="record" />
  </div>
</template>

<style lang="scss" scoped>
.record {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  padding: 1rem;
  gap: 0.5rem;
  background-color: $lightBlack;
  height: 100%;

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
        width: 40%;
        aspect-ratio: 3 / 4;
        align-self: center;
      }

      .info {
        line-height: 1.5rem;
        color: white;

        p.title {
          font-size: 1.5rem;
          font-weight: 700;
          color: $lightBlue;
        }
      }
    }

    .details {
      color: white;
      height: 90%;
      overflow-y: scroll;
    }
  }

  .controls {
    grid-column: span 10;
  }
}

@media (min-width: 480px) {
  .record {
    .tabs {
      .about {
        flex-direction: row;

        img {
          height: 80%;
          width: auto;
          align-self: unset;
        }
      }
    }
  }
}
</style>
