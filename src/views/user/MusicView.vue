<template>
  <section>
    <h1 v-if="!store.state.music.length">Page is loading... Please wait :)</h1>
    <ItemCarousel v-for="music in store.state.music" :key="music.genre" :data="music">
      <template #music="{ item }">
        <div class="modal-inner-container">
          <div class="details">
            <h1>{{ item.title }}</h1>
            <h3>
              {{ item.releaseDate }}
              {{ item.voteAverage }}
            </h3>
          </div>
          <h4 class="summary">{{ item.overview }}</h4>
        </div>
      </template>
    </ItemCarousel>
  </section>
</template>

<script setup>
import ItemCarousel from "@/components/ItemCarousel.vue";
import { useStore } from "vuex";

const store = useStore();
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal-inner-container {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(6, 1fr);
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 600px;
  width: 600px;
  background: #000000cc;
  border: white solid 1px;
  grid-template-areas:
    "trailer trailer trailer trailer trailer"
    "trailer trailer trailer trailer trailer"
    "trailer trailer trailer trailer trailer"
    "trailer trailer trailer trailer trailer"
    "details details details details details"
    "summary summary summary summary summary";
}

.trailer {
  grid-area: trailer;
}

.details {
  grid-area: details;
  align-items: center;

  h1 {
    margin: 0px;
  }

  h3 {
    margin: 0px;
    padding-top: 10px;
    word-spacing: 10px;
  }
}

.summary {
  margin: 0px;
  grid-area: summary;
  font-weight: lighter;
}
</style>
