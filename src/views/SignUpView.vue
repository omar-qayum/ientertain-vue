<template>
  <div class="background"></div>
  <div class="signin-container">
    <form>
      <label>Sign Up</label>
      <input type="email" placeholder="Email"/>
      <input type="password" placeholder="Password"/>
      <label for="PlanA">Plan A</label>
      <input type="radio" id="PlanA" value="Plan A"/>
      <label for="PlanB">Plan B</label>
      <input type="radio" id="PlanB" value="Plan B"/>
      <label for="PlanC">Plan C</label>
      <input type="radio" id="PlanC" value="Plan C"/>
      <label for="PlanD">Plan D</label>
      <input type="radio" id="PlanD" value="Plan D"/>
      <label for="PlanE">Plan E</label>
      <input type="radio" id="PlanE" value="Plan E"/>
      <input type="submit" value="Sign Up"/>
    </form>
    <h1>iEntertain</h1>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.background {
  background: url("../assets/img/signin.jpg") no-repeat center;
  background-size: cover;
  opacity: 0.75;
  height: 100%; 
  position: relative;
}
.signin-container {
  position: absolute;
  height: 600px;
  width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #00000099;
  box-sizing: border-box;
  padding: 50px;

  form {
    display: flex;
    flex-direction: column;
    text-justify: center;
    align-items: center;
    opacity: 1;
    label {
      font-size: xx-large;
    }
    input[type="email"], input[type="password"] {
      margin-top: 20px;
      height: 50px;
      width: 100%;
    }
    input[type="submit"] {
      background: red;
      height: 50px;
      width: 100%;
      border: none;
    }
  }
}
</style>
