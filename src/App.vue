<template>
  <div class="app-container">
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>

<style lang="scss">
*,
*::before,
*::after {
  font-family: "Roboto", sans-serif;
  font-size: calc(15px + 0.390625vw);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #00000000;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.app-container {
  display: flex;
  flex-direction: column;
  width: clamp(280px, 100vw, 1920px);
}
</style>
