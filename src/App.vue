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
  font-family: "Helvetica";
  height: 100%;
  background: #000000;
  color: white;
}
</style>
