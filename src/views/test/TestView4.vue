<script setup>
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping, faMinus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartR } from "@fortawesome/free-regular-svg-icons";
import SiteModal from "@/components/site/SiteModal.vue";

library.add(faCartShopping);
library.add(faMinus);
library.add(faHeart);
library.add(faHeartR);

const option = ref(1);

const select = (choice) => {
  option.value = choice;
};
</script>

<template>
  <SiteModal>
    <div class="content">
      <div class="tabs">
        <button @click="select(1)" :class="option === 1 ? 'active' : ''">About</button>
        <button @click="select(2)" :class="option === 2 ? 'active' : ''">Details</button>
        <button @click="select(3)" :class="option === 3 ? 'active' : ''">Summary</button>
      </div>
      <div v-if="option === 1" class="about">
        <img :src="`https://via.placeholder.com/128x197?text=1`" />
        <div class="details">
          <h1 class="title">Lorem ipsum dolor sit amet consectetur</h1>
          <h1 class="authors">Lorem ipsum dolor sit amet consectetur.</h1>
          <h1 class="genre">Science Fiction</h1>
          <h1 class="date">2001</h1>
          <h1 class="pages">210 pgs.</h1>
        </div>
      </div>
      <div v-if="option === 2" class="details"></div>
      <div v-if="option === 3" class="summary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ut repellat dignissimos
        maxime doloremque ex officiis doloribus est blanditiis? Fugiat dolore illum ipsa, saepe quas
        quisquam! Inventore, atque optio sunt non consectetur iusto dolorem molestias odit dolore
        animi consequuntur neque, voluptatum officia ea rerum vel, deleniti obcaecati ut recusandae
        unde repellendus fugit eos. Laboriosam exercitationem quisquam accusantium ipsam!
        Consequuntur porro voluptatibus consectetur aspernatur! Eius, officiis! Consectetur minus
        doloremque veniam hic quos eius mollitia voluptates, praesentium obcaecati aliquid, quae
        pariatur perspiciatis nemo quidem ipsam ab totam odio esse est libero? Velit, dicta, enim,
        cum ipsam ratione ut incidunt ipsum libero culpa modi dignissimos placeat cumque itaque
        excepturi fuga ea! Porro iste vero reprehenderit ratione laudantium officiis veniam aliquid
        dolores perspiciatis laboriosam, illum culpa voluptatem tempora quae velit a, nulla impedit,
        dicta enim vitae unde at. Rerum, sed fuga accusamus officiis facilis mollitia ut. Nulla
        magni minus dolorem nobis. Porro error, molestias similique non excepturi minima at itaque
        dicta quisquam odio sequi accusamus maiores neque incidunt sunt quidem natus fuga ullam
        labore quas. Optio ab repudiandae adipisci esse exercitationem obcaecati beatae illum
        molestiae? Ea harum quis magnam eaque ab voluptas quaerat quod ut nostrum cupiditate maxime
        obcaecati sit, odit fugiat deserunt vero minus consequatur corrupti dolor, rerum quia
        numquam provident. Ipsa dolor asperiores, iste voluptas eius, earum sequi assumenda pariatur
        provident iusto aspernatur soluta doloribus sapiente nemo porro quidem. Consectetur saepe,
        eos incidunt vel tempora optio deleniti repudiandae odit enim provident ullam, accusantium
        aliquam ipsam repellat amet tempore? Ut iure, molestias fugit dignissimos consequuntur quia
        ipsum sapiente a quidem incidunt labore architecto numquam corporis voluptas libero, eveniet
        sit magni reprehenderit nobis doloribus blanditiis, ratione perferendis. Sapiente dolor
        dolore quis quaerat in laborum consectetur vel. Optio dolorem laboriosam illum architecto
        obcaecati tempora facere, molestias eos eveniet voluptatibus ipsam provident ipsum illo
        minus, veniam quas adipisci rem unde enim inventore tenetur accusantium, dolor quibusdam
        libero. Provident, amet? Perspiciatis, unde distinctio. Delectus ducimus, ab inventore quia,
        nobis ipsam quisquam provident, sunt vitae nam assumenda ut totam aliquam nulla laborum
        dolorum. Ipsa ex, reiciendis perferendis dolore, a quasi mollitia nobis maxime voluptatibus
        expedita animi possimus distinctio sunt, et molestias odit. Repudiandae quae, rem error
        obcaecati, odio consectetur, optio quidem quam velit rerum veniam cupiditate explicabo
        ratione beatae assumenda ullam deleniti! Debitis sed laudantium eligendi. Enim dolores
        mollitia dignissimos blanditiis quidem est provident ex dolorem a perferendis omnis delectus
        quia deleniti sed, maxime adipisci cum asperiores porro voluptates obcaecati consequatur
        veniam optio iure explicabo. Officiis, dolore! Architecto maiores, doloremque doloribus
        delectus quisquam harum facere nam illum eligendi omnis, fugiat odio nobis mollitia
        quibusdam? Neque temporibus odio iusto itaque autem totam excepturi voluptas recusandae
        vitae natus deserunt minus cumque molestias expedita id repellendus, tenetur quis iure fuga
        et eligendi, doloremque qui error? Earum laborum a fugiat dicta ullam, ad neque, eaque
        quidem porro itaque natus ipsam eos. Nulla officia architecto veniam voluptatibus corporis
        quas perferendis aperiam, totam voluptates, sunt numquam non corrupti! Esse ipsam odio
        quibusdam repellat sapiente nobis unde ab. Molestiae odit facilis iure delectus laborum
        mollitia unde repellendus error tenetur nam esse numquam provident laboriosam dolores
        voluptatem quos harum magnam sint aut quisquam aspernatur, commodi illo, quo vero! Sint,
        obcaecati maiores. Possimus quos corporis omnis magni quibusdam rerum, mollitia aperiam unde
        porro perferendis quam aliquid eos blanditiis adipisci, et, id accusamus hic dignissimos.
        Reiciendis, magni beatae. Vitae voluptas numquam quam, perferendis beatae pariatur
        praesentium nobis vero qui, adipisci porro inventore repellat. Ab dolores quia corporis et!
        Molestias error dolorum doloribus ipsum, placeat vero repellat voluptatibus harum aliquam
        reiciendis cumque deserunt aspernatur, ullam enim nesciunt. Tenetur quo nesciunt recusandae
        obcaecati ratione earum fuga impedit repudiandae! Vel illum ipsum accusamus id laboriosam
        soluta nesciunt nobis iste sit accusantium, voluptatem provident. Nihil autem, atque quo
        voluptate, nemo laborum ratione tempora dicta modi maiores quis ut alias necessitatibus
        perferendis est iste, repellendus dolores rem veniam! Nulla adipisci voluptas magnam
        dolores, illo dolor nesciunt veritatis illum incidunt quasi saepe voluptatem tempora
        aspernatur cumque? Quae animi natus sed nesciunt sequi veniam quidem? Neque beatae, esse
        ipsa impedit, repellat deleniti sunt velit recusandae molestias voluptates a cumque amet ab,
        nulla repellendus praesentium. Provident unde distinctio aliquid, necessitatibus assumenda
        quibusdam eum obcaecati aut amet veritatis tempora laudantium iure sit. Porro, maxime. In
        adipisci doloremque officia fuga doloribus modi, explicabo harum sequi labore repellat
        magnam culpa amet? Maxime dicta, iusto ipsum vitae accusamus, doloremque aperiam et quae
        nisi veritatis molestiae quo deleniti reiciendis consectetur accusantium dolore est corrupti
        voluptatum ipsam sit. Placeat ducimus unde corporis eligendi sequi! Accusantium eveniet
        quisquam quaerat natus itaque similique. Dolorum repellendus odio saepe ipsum, debitis dolor
        numquam? Quisquam corporis alias neque, dolore, possimus fuga eos sunt ipsam eum quod, quos
        praesentium! Ex error excepturi itaque blanditiis odit natus, vero ipsam fugit vel quidem.
        Et reiciendis reprehenderit autem, pariatur ipsa assumenda perferendis iste inventore,
        totam, repellat distinctio minus quasi. Dolor sequi itaque vero esse vel cum officiis
        consequuntur nulla ratione eum beatae consequatur delectus ea cumque suscipit fugiat atque
        temporibus, non assumenda nemo modi? Qui, fugiat molestiae commodi itaque dolorum,
        doloribus, necessitatibus accusantium pariatur culpa illum perspiciatis debitis numquam
        totam ipsum. Quisquam eum deserunt tenetur minus eius incidunt, quod hic ea perferendis!
        Rerum quam rem molestias maiores quae quaerat non ab ipsa possimus corrupti itaque veniam
        officiis accusantium consequatur deleniti suscipit provident asperiores assumenda iusto
        exercitationem beatae, doloremque recusandae! Voluptatibus quas libero amet esse dolorum
        quos. Illo placeat, ipsam quas hic nostrum dolorum minus voluptas ex provident adipisci.
        Consequatur blanditiis atque distinctio fugit numquam officiis illum earum veniam labore?
        Illo unde quisquam exercitationem in officiis suscipit placeat omnis voluptas similique.
        Aspernatur sequi officia, eos adipisci explicabo accusantium asperiores voluptatem at quod
        ipsum voluptates fugiat consectetur neque quibusdam iste nisi ab pariatur enim quasi beatae
        soluta cumque nulla et possimus. Quam, cum aliquid ut eos nesciunt odio quisquam rem eaque
        voluptatem dicta rerum at vel cupiditate, maiores vero repellat dolorum qui quidem mollitia
        illo, quae libero neque dolor. Ducimus quod quisquam animi quos voluptate aperiam sed
        dignissimos ipsa, doloribus, modi ipsum exercitationem provident quaerat in fugiat
        voluptatem impedit consectetur. Expedita, nesciunt illo!
      </div>
      <div v-if="true" class="controls">
        <button v-if="true" @click="true">
          <icon class="icon" icon="fa-regular fa-heart" />
        </button>
        <button v-if="true" @click="true">
          <icon class="icon" icon="fa-solid fa-cart-shopping" />
        </button>
      </div>
    </div>
  </SiteModal>
</template>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-template-areas:
    "tabs tabs tabs tabs tabs tabs tabs tabs tabs tabs"
    "content content content content content content content content content content"
    "content content content content content content content content content content"
    "content content content content content content content content content content"
    "content content content content content content content content content content"
    "content content content content content content content content content content"
    "content content content content content content content content content content"
    "content content content content content content content content content content"
    "content content content content content content content content content content"
    "controls controls controls controls controls controls controls controls controls controls";
  width: 100%;
  height: 100%;
  padding: 1rem;
  gap: 0.5rem;
  background-color: $lightBlack;

  .tabs {
    grid-area: tabs;

    button {
      padding: 0.5rem;
      border: none;
      color: white;
      background-color: $navyBlue;
      cursor: pointer;
      transition: 0.3s;

      &.active {
        background-color: $lightBlue;
      }

      &:hover {
        background-color: $skyBlue;
      }
    }
  }

  .about {
    grid-area: content;
    display: flex;
    flex-direction: column;
    background: $lightBlack;
    gap: 0.5rem;

    img {
      height: 40%;
      aspect-ratio: 3 / 4;
      align-self: center;
    }

    .details {
      .title {
        font-size: 1.5rem;
        color: $lightBlue;
      }
    }
  }

  .summary {
    grid-area: content;
    overflow-y: auto;
  }

  .controls {
    grid-area: controls;
    display: flex;
    gap: 0.5rem;

    button {
      padding: 0.5rem;
      width: 50%;
      border: none;
      background: $navyBlue;

      .icon {
        font-size: 1.25rem;
        color: white;
      }
    }
  }
}

@media (orientation: landscape) and (min-width: 568px) {
  .content {
    grid-template-areas:
      "tabs tabs tabs tabs tabs tabs tabs tabs tabs tabs"
      "content content content content content content content content content controls";

    .about {
      flex-direction: row;
      img {
        height: auto;
        width: 40%;
      }

      .details {
        align-self: center;
      }
    }

    .controls {
      flex-direction: column;

      button {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
