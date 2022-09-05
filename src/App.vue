<template>
  <Suspense>
    <router-view />
  </Suspense>
</template>

<style lang="scss">
*,
*:before,
*:after {
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: white;
}

html {
  box-sizing: inherit;
  background: #000000;
}
</style>
