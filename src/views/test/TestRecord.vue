<script setup>
import RecordControls from "@/components/records/RecordControls.vue";
import RecordTabs from "@/components/records/RecordTabs.vue";
import SiteModal from "@/components/site/SiteModal.vue";
</script>

<template>
  <SiteModal>
    <div class="record">
      <RecordTabs :tabs="['about', 'trailer', 'details']" class="tabs">
        <template #about>
          <div class="about">
            <img src="https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2g7m.jpg" />
            <div class="details">
              <h1 class="title">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, quasi?
              </h1>
              <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, autem.</h1>
              <h1>Science Fiction</h1>
              <h1>1979</h1>
              <h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, asperiores
                dolorem vel numquam quam nihil impedit totam vitae consequatur, doloribus cum. Amet
                iste illo consequatur quam quia odit aliquam corrupti asperiores possimus explicabo
                saepe, tempore est illum atque enim molestiae numquam. Sed consequatur delectus
                vitae quibusdam dignissimos, adipisci ab tempore quam corrupti ipsa voluptatem
                pariatur in eum assumenda dolore itaque saepe, asperiores illo repellat nemo. Iure
                aperiam sed corrupti temporibus nihil harum saepe vero inventore ratione possimus
                nam ab quibusdam, soluta voluptatem assumenda magni expedita delectus eaque nisi
                excepturi doloribus at illo commodi vel? Distinctio ad error dolor nulla et.
              </h1>
            </div>
          </div>
        </template>
        <template #trailer>
          <iframe
            class="trailer"
            src="https://www.youtube.com/embed/TZfZsmbRDVU?autoplay=1&mute=1&vq=hd1080"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </template>
        <template #details>
          <div class="details"></div>
        </template>
      </RecordTabs>
      <div v-if="true" class="controls">
        <RecordControls category="books" :record="{ id: 9999 }" />
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

    .trailer {
      height: 100%;
      width: 100%;
      aspect-ratio: 16 / 9;
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
