<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faGamepad, faFilm, faMusic } from '@fortawesome/free-solid-svg-icons'

library.add(faBook);
library.add(faGamepad);
library.add(faFilm);
library.add(faMusic);
</script>

<template>
  <form>
    <label>Name:</label>
    <br />
    <input type="text" />
    <br />
    <label>Address:</label>
    <br />
    <input type="text" />
    <br />
    <label>Apartment, suite, etc.</label>
    <br />
    <input type="text" />
    <br />
    <label>City</label>
    <br />
    <input type="text" />
    <br />
    <label>Province</label>
    <br />
    <select>
      <option>AB</option>
      <option>BC</option>
      <option>MB</option>
      <option>NB</option>
      <option>NL</option>
      <option>NS</option>
      <option>NT</option>
      <option>NU</option>
      <option>ON</option>
      <option>PE</option>
      <option>QC</option>
      <option>SK</option>
      <option>YT</option>
    </select>
    <br />
    <label>Postal Code</label>
    <br />
    <input type="text" />
    <br />
    <input type="submit" value="Submit"/>
  </form>
</template>

<style lang="scss" scoped>
.quotas {
  display: flex;
  gap: 50px;
}
</style>
