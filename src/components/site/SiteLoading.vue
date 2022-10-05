<template>
  <div class="loading-container">
    <slot />
    <div class="spinner">
      <span class="text">Loading...</span>
      <div class="sector sector-one"></div>
      <div class="sector sector-two"></div>
      <div class="sector sector-three"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: $navyBlue;
  gap: 2rem;

  ::v-slotted(p) {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    color: white;
  }

  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;
    width: 10rem;
    overflow: hidden;
    position: relative;

    .text {
      font-size: 1.25rem;
      color: white;
      animation: fade 3s ease-in-out infinite alternate;
    }

    .sector {
      position: absolute;
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
      border: 15px solid transparent;
      mix-blend-mode: overlay;
      animation: rotate var(--duration) var(--timing) infinite;
    }

    .sector-one {
      border-left-color: $skyBlue;
      --duration: 1.5s;
      --timing: ease-in;
    }

    .sector-two {
      border-top-color: $lightBlue;
      --duration: 2.5s;
      --timing: ease-out;
    }

    .sector-three {
      border-right-color: white;
      --duration: 3.5s;
      --timing: ease-in-out;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes fade {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
