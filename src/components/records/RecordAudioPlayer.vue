<script setup>
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBackward, faForward, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

library.add(faBackward);
library.add(faForward);
library.add(faPause);
library.add(faPlay);

const props = defineProps("tracks");
const player = ref(new Audio(props.tracks.at(0)).trackPreview);
const currentTrack = ref(0);
const time = ref(0);

const getCurrentTime = async () => {
  time.value = player.value.currentTime;
  console.log("here");
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
  player.value = new Audio(
    props.tracks.at(currentTrack.value % props.tracks.value.length).trackPreview
  );
  await player.value.play();
  player.value.addEventListener("timeupdate", getCurrentTime);
};

const seek = (event) => {
  player.value.currentTime = event.target.valueAsNumber;
};
</script>

<template>
  <div class="player-container">
    <div class="player">
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
      <input
        class="play-bar"
        type="range"
        min="0"
        max="30"
        step="1"
        :value="time"
        @change="seek($event)"
      />
    </div>
    <div class="playlist">
      <p
        v-for="(track, index) in props.tracks"
        :key="track.trackName"
        @click="changeTrack(index)"
        :class="currentTrack % props.tracks.length === index ? 'active' : ''"
      >
        {{ `${index + 1}. ${track.trackName}` }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.player-container {
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

    .active {
      background-color: $navyBlue;
    }
  }
}
</style>
