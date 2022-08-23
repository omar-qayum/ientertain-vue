<template>
  <Suspense>
    <router-view />
  </Suspense>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  margin: 0;
  padding: 0;
  min-width: 100%;
  min-height: 100%;
  font-family: 'Roboto', sans-serif;
  background: #000000;
  color: white;
}
</style>
