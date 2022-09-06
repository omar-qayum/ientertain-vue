<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faGamepad, faFilm, faMusic } from '@fortawesome/free-solid-svg-icons'

library.add(faBook);
library.add(faGamepad);
library.add(faFilm);
library.add(faMusic);
</script>

<template>
  <icon-layers class="fa-1x">
    <icon icon="fa-solid fa-book" />
    <icon icon="fa-solid fa-gamepad" transform="right-17" />
    <icon icon="fa-solid fa-film" transform="down-17" />
    <icon icon="fa-solid fa-music" transform="down-17 right-17" />
  </icon-layers>
</template>

<style lang="scss" scoped>
.quotas {
  display: flex;
  gap: 50px;
}
</style>
