<template>
  <Suspense>
    <div class="app-container">
      <RouterView />
    </div>
  </Suspense>
</template>

<style lang="scss">
* {
  font-family: "Roboto", sans-serif;
  font-size: calc(15px + 0.390625vw);
  color: white;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  width: clamp(280px, 100vw, 1920px);
}
</style>
