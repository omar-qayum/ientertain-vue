<script setup>
import { ref, onUnmounted } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBackward, faForward, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

library.add(faBackward);
library.add(faForward);
library.add(faPause);
library.add(faPlay);

const props = defineProps(["tracks"]);
const hasPreviews = props.tracks.at(0).trackPreview !== null;
const player = ref(new Audio(props.tracks.at(0).trackPreview));
const currentTrack = ref(0);
const time = ref(0);

const getCurrentTime = async () => {
  time.value = player.value.currentTime;
};

const play = async () => {
  if (player.value.paused) {
    player.value.addEventListener("timeupdate", getCurrentTime);
    await player.value.play();
  } else {
    player.value.pause();
  }
};

const changeTrack = async (index) => {
  currentTrack.value = index;
  player.value.pause();
  player.value = new Audio(props.tracks.at(currentTrack.value % props.tracks.length).trackPreview);
  await player.value.play();
  player.value.addEventListener("timeupdate", getCurrentTime);
};

const seek = (event) => {
  player.value.currentTime = event.target.valueAsNumber;
};

onUnmounted(() => {
  player.value.pause();
});
</script>

<template>
  <div class="audio-player-container">
    <div v-if="hasPreviews" class="player">
      <div class="controls">
        <button @click="changeTrack(currentTrack - 1)">
          <icon class="icon" icon="fa-solid fa-backward" />
        </button>
        <button @click="play">
          <icon v-if="player.paused" class="icon" icon="fa-solid fa-play" />
          <icon v-else class="icon" icon="fa-solid fa-pause" />
        </button>
        <button @click="changeTrack(currentTrack + 1)">
          <icon class="icon" icon="fa-solid fa-forward" />
        </button>
      </div>
      <input class="play-bar" type="range" min="0" max="30" step="1" :value="time" @change="seek($event)" />
    </div>
    <h1 v-else class="player">No audio previews are available for this album.</h1>
    <div class="playlist">
      <div v-if="hasPreviews">
        <p v-for="(track, index) in tracks" :key="track.trackName" @click="changeTrack(index)" :class="currentTrack % tracks.length === index ? 'active' : ''">
          {{ `${index + 1}. ${track.trackName}` }}
        </p>
      </div>
      <div v-else>
        <p v-for="(track, index) in tracks" :key="track.trackName">
          {{ `${index + 1}. ${track.trackName}` }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.audio-player-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  width: 100%;
  height: 100%;

  .player {
    grid-column: span 10;
    display: flex;
    gap: 0.5rem;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: $lightBlue;

    .play-bar {
      width: 50%;
    }

    .controls {
      button {
        padding: 1rem;
        border: none;
        background: none;
        font-weight: bold;

        .icon {
          font-size: 1.25rem;
          color: $lightBlue;
        }
      }
    }
  }

  .playlist {
    grid-column: span 10;
    grid-row: 2 / span 9;
    height: 100%;
    overflow-y: auto;
    color: white;

    .active {
      background-color: $navyBlue;
    }
  }
}
</style>
