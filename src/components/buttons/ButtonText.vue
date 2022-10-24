<template>
  <button><slot /></button>
</template>

<style lang="scss" scoped>
button {
  padding: 0.5rem;
  border: none;
  color: white;
  background-color: $navyBlue;
  transition: 0.3s;
  font-weight: bold;
  text-transform: capitalize;
  cursor: pointer;

  &.active {
    background-color: $lightBlue;
  }

  &:hover {
    background-color: $lightBlack;
  }
}
</style>
