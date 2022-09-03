<script setup>
const props = defineProps(["record"]);
</script>
  
<template>
  <div class="modal-inner-container">
    <div class="details-container">
      <img :src="props.record.image" />
      <div>
        <h2>{{ props.record.title }}</h2>
        <h3>{{ props.record.authors }}</h3>
        <h3>{{ props.record.date }}</h3>
        <h3>{{ props.record.pages }}</h3>
        <slot></slot>
      </div>
    </div>
    <h4 class="summary">{{ props.record.summary }}</h4>
  </div>
</template>
  
<style lang="scss" scoped>
.modal-inner-container {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 20px;
  transform: translate(-50%, -50%);
  height: 600px;
  width: 600px;
  background: #000000cc;
  border: white solid 1px;

  .details-container {
    display: flex;
    gap: 10px;

    img {
      width: 150px;
      height: 200px;
    }

    .summary {}

    :slotted(button) {
      background: $red;
      height: 50px;
      width: 25%;
      border: none;
    }
  }
}
</style>
  