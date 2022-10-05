<script setup>
import SiteTabs from "@/components/site/SiteTabs.vue";
import RecordControls from "@/components/records/RecordControls.vue";
import RecordAudioPlayer from "@/components/records/RecordAudioPlayer.vue";

const props = defineProps(["record"]);
</script>

<template>
  <div class="record">
    <SiteTabs :tabs="['about', 'tracks', 'details']" class="tabs">
      <template #about>
        <div class="about">
          <img :src="props.record.image" />
          <div class="details">
            <h1 class="title">{{ props.record.title }}</h1>
            <h1>{{ props.record.artist }}</h1>
            <h1>{{ props.record.genre }}</h1>
            <h1>{{ props.record.date }}</h1>
            <h1>{{ props.record.totalTracks }} Tracks</h1>
          </div>
        </div>
      </template>
      <template #tracks>
        <RecordAudioPlayer :tracks="props.record.tracks" />
      </template>
      <template #details>
        <div class="details"></div>
      </template>
    </SiteTabs>
    <RecordControls class="controls" category="music" :record="props.record" />
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

        h1.title {
          font-size: 1.5rem;
          color: $lightBlue;
        }
      }
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
