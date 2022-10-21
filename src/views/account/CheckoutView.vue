<script setup></script>
<template>
  <div class="checkout-container">
    <p class="heading">Checkout</p>

    <div>
      <p>Shipping Information:</p>
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
          <option v-for="province in ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT']" :key="province">{{ province }}</option>
        </select>
        <br />
        <label>Postal Code</label>
        <br />
        <input type="text" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkout-container {
  display: flex;

  .heading {
    color: $navyBlue;
    font-weight: 700;
    font-size: 1.5rem;
    text-transform: capitalize;
  }
}
</style>
