<template>
  <Suspense>
    <router-view />
  </Suspense>
</template>

<style lang="scss">
*,
*:before,
*:after {
  font-family: "Roboto", sans-serif;
  font-size: calc(15px + 0.390625vw);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  box-sizing: inherit;
  background: $darkBlack;
  color: white;

  body {
    //max-width: 1600px;
  }
}
</style>
