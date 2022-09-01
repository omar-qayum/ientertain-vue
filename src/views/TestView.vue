<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faGamepad, faFilm, faMusic } from '@fortawesome/free-solid-svg-icons'

library.add(faBook);
library.add(faGamepad);
library.add(faFilm);
library.add(faMusic);
</script>

<template>
  <div class="quotas">
    <icon-layers class="fa-fw fa-2x">
      <icon icon="fa-solid fa-book" />
      <icon-layers-text style="color:green" transform="right-20" value="-99" />
    </icon-layers>
    <icon-layers class="fa-fw fa-2x">
      <icon icon="fa-solid fa-gamepad" />
      <icon-layers-text style="color:green" transform="right-23" value="-99" />
    </icon-layers>
    <icon-layers class="fa-fw fa-2x">
      <icon icon="fa-solid fa-film" />
      <icon-layers-text style="color:green" transform="right-21" value="-99" />
    </icon-layers>
    <icon-layers class="fa-fw fa-2x">
      <icon icon="fa-solid fa-music" />
      <icon-layers-text style="color:green" transform="right-21" value="-99" />
    </icon-layers>
  </div>
</template>

<style lang="scss" scoped>
.quotas {
  display: flex;
  gap: 50px;
}
</style>
