<template>
  <div class="main-image-container">
    <img src="../assets/img/main.jpg" />
    <div class="logo">
      <h1>iEntertain</h1>
    </div>
    <div class="login">
      <router-link to="/login" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">Sign In</button>
      </router-link>
    </div>
    <div class="main-message">
      <h1>Own Your Entertainment!</h1>
      <h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero officia
        totam ipsam blanditiis possimus autem doloremque veniam delectus.
        Necessitatibus quo possimus sequi corrupti magnam incidunt excepturi
        sapiente laudantium laboriosam quidem, neque qui eos autem libero atque
        ad harum optio quod consequatur minus veritatis explicabo nostrum
        numquam impedit. Consectetur, tempore odio.
      </h2>
      <router-link to="/register" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">Sign Up</button>
      </router-link>
    </div>
  </div>
  <div class="main-movies-container">
    <div class="description">
      <h1>WATCH </h1>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quam
        quibusdam sapiente, omnis at velit ullam modi numquam, minima incidunt
        repellendus soluta placeat quo debitis quas vel! Ipsa accusantium
        dolores tempora hic assumenda culpa cumque consequuntur maxime optio non
        obcaecati nam numquam libero tenetur laboriosam, rerum ad nulla eum
        nihil.
      </h3>
    </div>
    <img src="../assets/img/movies.jpg" />
  </div>
  <div class="main-games-container">
    <img src="../assets/img/games.jpg" />
    <div class="description">
      <h1>PLAY </h1>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
        aspernatur et quidem dolor sunt facilis in quo fuga provident facere
        voluptatum, explicabo ducimus itaque error tenetur dignissimos officia.
        Cumque maiores, atque, numquam accusantium obcaecati fugiat vel quo,
        ducimus nam omnis consequuntur eos provident labore. Debitis provident
        ratione ipsam consequatur dolore!
      </h3>
    </div>
  </div>
  <div class="main-music-container">
    <div class="description">
      <h1>LISTEN </h1>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt a nostrum
        et aut alias praesentium eveniet, magni labore quasi sit fuga asperiores
        dignissimos iste quae, officiis, consectetur tempora blanditiis est
        voluptas molestias atque ut nihil corporis? Accusamus natus, aliquam,
        veritatis repellendus nobis ex laudantium rem, ea laboriosam
        voluptatibus consequuntur earum!
      </h3>
    </div>
    <img src="../assets/img/music.jpg" />
  </div>
  <div class="main-books-container">
    <img src="../assets/img/books.jpg" />
    <div class="description">
      <h1>READ </h1>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt a nostrum
        et aut alias praesentium eveniet, magni labore quasi sit fuga asperiores
        dignissimos iste quae, officiis, consectetur tempora blanditiis est
        voluptas molestias atque ut nihil corporis? Accusamus natus, aliquam,
        veritatis repellendus nobis ex laudantium rem, ea laboriosam
        voluptatibus consequuntur earum!
      </h3>
    </div>
  </div>
  <div class="explanation-container">
    <h1>How it Works!</h1>
    <h2>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti ipsam
      optio id recusandae excepturi ullam repellendus aperiam tempore, modi
      debitis saepe blanditiis dolores rerum quisquam cum eveniet? Earum, velit
      molestiae iste possimus, quis culpa recusandae quam porro, voluptate omnis
      perferendis hic assumenda sapiente corrupti. Nulla illo odio non culpa
      modi repellat atque incidunt quidem qui beatae? Nostrum autem qui delectus
      distinctio. Eius, commodi itaque! Labore debitis blanditiis mollitia
      quibusdam fuga magni, est quis voluptatibus eveniet sequi eius deleniti
      voluptate ratione omnis adipisci amet id itaque esse optio, ipsam tempora
      saepe hic! Repellendus quis ratione quasi quisquam consequuntur reiciendis
      at rerum?
    </h2>
  </div>
  <div class="plans-container">
    <h1>Select a Plan:</h1>
    <div class="all-plans">
      <div class="plan">
        <h3>The Connoisseur</h3>
        <ul>
          <li>1 Movie</li>
          <li>1 Game</li>
          <li>1 Album</li>
          <li>1 Book</li>
        </ul>
        <h3>$9.99 / month</h3>
        <button>Select</button>
      </div>
      <div class="plan">
        <h3>The Critic</h3>
        <ul>
          <li>4 Movies</li>
        </ul>
        <h3>$9.99 / month</h3>
        <button>Select</button>
      </div>
      <div class="plan">
        <h3>The Gamer</h3>
        <ul>
          <li>4 Games</li>
        </ul>
        <h3>$9.99 / month</h3>
        <button>Select</button>
      </div>
      <div class="plan">
        <h3>The Audiophile</h3>
        <ul>
          <li>4 Albums</li>
        </ul>
        <h3>$9.99 / month</h3>
        <button>Select</button>
      </div>
      <div class="plan">
        <h3>The Bookworm</h3>
        <ul>
          <li>4 Books</li>
        </ul>
        <h3>$9.99 / month</h3>
        <button>Select</button>
      </div>
    </div>
  </div>
  <footer>Copyright Omar Qayum</footer>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.main-image-container {
  height: 500px;
  width: 100%;
  position: relative;
  img {
    height: 100%;
    width: 100%;
    opacity: 0.75;
  }
  .logo {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .login {
    position: absolute;
    top: 20px;
    right: 20px;
    button {
      background: $red;
      border: none;
      color: white;
      height: 40px;
      width: 70px;
    }
  }
  .main-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    button {
      background: $red;
      border: none;
      color: white;
      height: 40px;
      width: 70px;
    }
  }
}

.main-movies-container,
.main-games-container,
.main-music-container,
.main-books-container {
  display: flex;
  border-top: 5px solid grey;
  height: 400px;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 100px;
  img {
    height: 300px;
    width: 600px;
  }
  .description {
    width: 400px;
    h1 {
      color: $red;
      display: inline;
    }
    h3 {
      display: inline;
    }
  }
}

.explanation-container {
  border-top: 5px solid grey;
  height: 400px;
  width: 100%;
  text-align: center;
}

.plans-container {
  border-top: 5px solid grey;
  height: 500px;
  width: 100%;
  h1 {
    text-align: center;
  }
  .all-plans {
    display: flex;
    justify-content: center;
    gap: 50px;
    .plan {
      height: 250px;
      width: 200px;
      background: $grey;
      &:hover {
        border: 2px solid white;
      }
      button {
        background: $red;
        border: none;
        color: white;
        height: 40px;
        width: 70px;
      }
    }
  }
}
</style>
