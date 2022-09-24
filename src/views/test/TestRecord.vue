<script setup>
import RecordControls from "@/components/records/RecordControls.vue";
import RecordTabs from "@/components/records/RecordTabs.vue";
import SiteModal from "@/components/site/SiteModal.vue";
import RecordAudioPlayer from "@/components/records/RecordAudioPlayer.vue";
</script>

<template>
  <SiteModal>
    <div class="record">
      <RecordTabs :tabs="['about', 'tracks', 'details']" class="tabs">
        <template #about>
          <div class="about">
            <img src="https://i.scdn.co/image/ab67616d0000b2738265a736a1eb838ad5a0b921" />
            <div class="details">
              <h1 class="title">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta, repudiandae.
              </h1>
              <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, mollitia.</h1>
              <h1>Pop</h1>
              <h1>2020</h1>
              <h1>16</h1>
            </div>
          </div>
        </template>
        <template #tracks>
          <RecordAudioPlayer class="tracks"></RecordAudioPlayer>
        </template>
        <template #details>
          <div class="details"></div>
        </template>
      </RecordTabs>
      <div v-if="true" class="controls">
        <RecordControls category="music" :record="{ id: 9999 }" />
      </div>
    </div>
  </SiteModal>
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
      width: 100%;

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
    display: flex;
    gap: 0.5rem;
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
