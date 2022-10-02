<template>
  <div class="error-container">
    <p>404 Error</p>
    <p>Page not found!</p>
  </div>
</template>

<style lang="scss" scoped>
.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: $navyBlue;
  gap: 0.5rem;

  p {
    font-weight: 700;
    font-size: 3rem;
    color: white;
    text-align: center;
  }
}
</style>
