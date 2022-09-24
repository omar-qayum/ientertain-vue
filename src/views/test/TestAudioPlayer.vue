<script setup>
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBackward, faForward, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

library.add(faBackward);
library.add(faForward);
library.add(faPause);
library.add(faPlay);

const currentTrack = ref(0);
const tracks = ref([
  "https://p.scdn.co/mp3-preview/9f110dbdde66d0a4f3151a67dab5b1b61d6770c1?cid=efd30308190a44eebd025f92d984bdf7",
  "https://p.scdn.co/mp3-preview/aa7132c63b971ab31eccfebb286d2aaa80496598?cid=efd30308190a44eebd025f92d984bdf7",
  "https://p.scdn.co/mp3-preview/b11a5386b74b0eae68b4afbae99597c6915bac53?cid=efd30308190a44eebd025f92d984bdf7",
  "https://p.scdn.co/mp3-preview/3589a34bb22f3851b42ef249488f4b63002fda7a?cid=efd30308190a44eebd025f92d984bdf7",
  "https://p.scdn.co/mp3-preview/9f110dbdde66d0a4f3151a67dab5b1b61d6770c1?cid=efd30308190a44eebd025f92d984bdf7",
  "https://p.scdn.co/mp3-preview/aa7132c63b971ab31eccfebb286d2aaa80496598?cid=efd30308190a44eebd025f92d984bdf7",
  "https://p.scdn.co/mp3-preview/b11a5386b74b0eae68b4afbae99597c6915bac53?cid=efd30308190a44eebd025f92d984bdf7",
  "https://p.scdn.co/mp3-preview/3589a34bb22f3851b42ef249488f4b63002fda7a?cid=efd30308190a44eebd025f92d984bdf7",
  "https://p.scdn.co/mp3-preview/9f110dbdde66d0a4f3151a67dab5b1b61d6770c1?cid=efd30308190a44eebd025f92d984bdf7",
  "https://p.scdn.co/mp3-preview/aa7132c63b971ab31eccfebb286d2aaa80496598?cid=efd30308190a44eebd025f92d984bdf7",
  "https://p.scdn.co/mp3-preview/b11a5386b74b0eae68b4afbae99597c6915bac53?cid=efd30308190a44eebd025f92d984bdf7",
  "https://p.scdn.co/mp3-preview/3589a34bb22f3851b42ef249488f4b63002fda7a?cid=efd30308190a44eebd025f92d984bdf7",
  "https://p.scdn.co/mp3-preview/9f110dbdde66d0a4f3151a67dab5b1b61d6770c1?cid=efd30308190a44eebd025f92d984bdf7",
  "https://p.scdn.co/mp3-preview/aa7132c63b971ab31eccfebb286d2aaa80496598?cid=efd30308190a44eebd025f92d984bdf7",
  "https://p.scdn.co/mp3-preview/b11a5386b74b0eae68b4afbae99597c6915bac53?cid=efd30308190a44eebd025f92d984bdf7",
  "https://p.scdn.co/mp3-preview/3589a34bb22f3851b42ef249488f4b63002fda7a?cid=efd30308190a44eebd025f92d984bdf7",
]);

const trackNames = ref([
  "Running Up That Hill (A Deal With God) - 2018 Remaster",
  "Hounds Of Love - 2018 Remaster",
  "The Big Sky - 2018 Remaster",
  "How",
  "Running Up That Hill (A Deal With God) - 2018 Remaster",
  "Hounds Of Love - 2018 Remaster",
  "The Big Sky - 2018 Remaster",
  "How",
  "Running Up That Hill (A Deal With God) - 2018 Remaster",
  "Hounds Of Love - 2018 Remaster",
  "The Big Sky - 2018 Remaster",
  "How",
  "Running Up That Hill (A Deal With God) - 2018 Remaster",
  "Hounds Of Love - 2018 Remaster",
  "The Big Sky - 2018 Remaster",
  "How",
]);

const player = ref(new Audio(tracks.value.at(0)));
const track = ref(tracks.value.at(0));
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
  player.value = new Audio(tracks.value.at(currentTrack.value % trackNames.value.length));
  track.value = tracks.value.at(currentTrack.value % trackNames.value.length);
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
      <input
        class="play-bar"
        type="range"
        min="0"
        max="30"
        step="0.1"
        :value="time"
        @change="seek($event)"
      />
      <div class="controls">
        <button @click="changeTrack(currentTrack - 1)">
          <icon class="icon" icon="fa-solid fa-backward" />
        </button>
        <button @click="play">
          <icon v-if="player.paused" class="icon" icon="fa-solid fa-play" /><icon
            class="icon"
            v-else
            icon="fa-solid fa-pause"
          />
        </button>
        <button @click="changeTrack(currentTrack + 1)">
          <icon class="icon" icon="fa-solid fa-forward" />
        </button>
      </div>
      <p class="playing">{{ trackNames.at(currentTrack % trackNames.length) }}</p>
    </div>
    <ol class="playlist">
      <li
        v-for="(trackName, index) in trackNames"
        :key="trackName"
        @click="changeTrack(index)"
        :class="currentTrack % trackNames.length === index ? 'active' : ''"
      >
        {{ trackName }}
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
.player-container {
  display: flex;
  flex-direction: column;

  .player {
    display: grid;
    gap: 0.5rem;
    width: 50%;
    align-self: center;

    .controls {
      button {
        padding: 0.5rem;
        border: none;
        background: none;
        font-weight: bold;
        .icon {
          font-size: 1.25rem;
          color: $lightBlue;
        }
      }
    }
    .playing {
      color: $lightBlue;
    }
  }

  .playlist {
    margin-left: 2rem;

    .active {
      background-color: $navyBlue;
    }
  }
}
</style>
