<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping, faMinus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartR } from "@fortawesome/free-regular-svg-icons";

library.add(faCartShopping);
library.add(faMinus);
library.add(faHeart);
library.add(faHeartR);
</script>

<template>
  <teleport to="body">
    <div class="modal-outer-container" @click.self="$emit('toggleModal')">
      <div class="modal-inner-container">
        <img :src="`https://via.placeholder.com/128x197?text=1`" />
        <div class="details">
          <h1 class="title">Lorem ipsum dolor sit amet consectetur</h1>
          <h1 class="authors">Lorem ipsum dolor sit amet consectetur.</h1>
          <h1 class="genre">Science Fiction</h1>
          <h1 class="date">2001</h1>
          <h1 class="pages">210 pgs.</h1>
          <div v-if="true" class="desktop-controls">
            <button v-if="true" @click="true">
              <icon class="icon" icon="fa-regular fa-heart" />
            </button>
            <button v-if="true" @click="true">
              <icon class="icon" icon="fa-solid fa-cart-shopping" />
            </button>
          </div>
        </div>
        <div class="summary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur maiores ab explicabo
          temporibus necessitatibus iste architecto ex illo veritatis vero, atque ad enim et sequi
          ducimus earum fugiat nihil. Reprehenderit pariatur non ex mollitia ut enim at error
          nesciunt, earum repellat deserunt amet necessitatibus culpa ipsum neque, reiciendis odit
          placeat. Nulla aperiam, excepturi quibusdam necessitatibus placeat repellendus ex
          consequuntur inventore, quia natus deleniti corrupti, quas magnam vitae perspiciatis. Quia
          dolor quibusdam necessitatibus ullam, excepturi sequi illo quae cum incidunt consequuntur
          soluta expedita, facilis, similique a consequatur neque molestias laboriosam nam enim
          veritatis rem. Neque labore, inventore ad, ipsa tempora quos accusantium ducimus ex
          voluptas vero ratione quas? Suscipit voluptatum rerum beatae exercitationem aliquid
          possimus voluptatibus asperiores? Nisi hic iusto fugiat nemo explicabo commodi molestiae,
          sapiente cumque fuga reiciendis. Delectus rem, pariatur iusto maxime voluptas inventore
          sequi ducimus fugiat non dolore explicabo fuga repudiandae, harum laborum nesciunt, qui at
          impedit eveniet tempora. Ut et facilis odio quisquam, fugit illum ab! Aut omnis, eveniet
          facilis rerum fugit velit! Alias porro dolor omnis eos. Deleniti debitis porro et modi
          praesentium quidem est quo numquam optio accusamus incidunt itaque beatae nam pariatur
          officia, amet harum eaque corporis magni quae temporibus? Corrupti tenetur consectetur
          ipsam ex veniam accusamus omnis culpa perferendis nam soluta doloremque accusantium dolor
          expedita voluptas, non sed a neque hic perspiciatis adipisci porro excepturi tempora!
          Nobis dolore, ipsum quia tempore enim accusantium similique iure iusto sint, laborum earum
          vel modi. Explicabo nihil qui quisquam, in dolores voluptatum autem doloribus magni eaque
          consequatur quo sunt, maiores est quibusdam adipisci obcaecati reprehenderit fugit quidem
          soluta at earum corporis excepturi. Provident corrupti, nisi harum nostrum odit
          aspernatur. Dolorum impedit quasi accusantium maiores incidunt facilis magni. Odio vitae
          doloribus maiores ad? Dicta molestias dignissimos fuga vel molestiae error magnam itaque
          laudantium libero, quaerat necessitatibus nihil. Vero, excepturi. Ipsam molestias,
          perferendis non explicabo veniam dicta atque. Vitae velit repellendus deleniti esse
          laudantium temporibus optio sequi sunt facilis, tenetur tempore dolorum non magni sed
          accusantium nulla, molestias a veritatis eveniet ad, eos quidem! Odit error sint voluptate
          nesciunt praesentium natus a hic asperiores consequuntur distinctio delectus nemo
          necessitatibus eligendi in ad fugit consequatur possimus commodi minus ducimus, facilis
          illum numquam eaque. Nobis soluta ipsa vero neque suscipit laboriosam est unde officiis
          quasi ducimus earum sapiente libero voluptates quos, accusamus sunt natus mollitia
          quisquam quam. Neque iusto reiciendis aperiam quas cum, modi maxime sunt sequi animi, quo
          sit molestias suscipit soluta eos porro, nostrum sed. Repellendus aperiam vitae reiciendis
          voluptatum laborum quod, suscipit itaque facere a odit est exercitationem? Sed itaque
          consequuntur distinctio facilis rem ipsam! Id enim numquam qui officiis esse eum fuga
          alias molestiae, exercitationem recusandae dolores nihil quo molestias eaque at sunt
          aliquam adipisci debitis, minima corrupti ad. Voluptatem voluptates optio ratione
          recusandae ullam quos! Quo dolorem eaque dolores eveniet totam magni sapiente
          necessitatibus veritatis sit? Aliquid, earum repudiandae? Eos minima fugit minus sed
          praesentium amet repellendus molestiae! Modi et voluptatem, alias molestias deserunt
          labore laborum velit quo recusandae doloremque, ut, iusto odio ullam voluptatum quos fugit
          earum illum temporibus voluptates! Perferendis excepturi voluptate itaque ducimus autem,
          obcaecati asperiores illo facilis debitis eos nesciunt aspernatur est nostrum enim
          consequuntur sunt odio, atque porro culpa optio eaque velit, rem labore! Assumenda,
          laudantium dolorem eveniet vel fugiat quam non voluptas soluta maxime asperiores a
          deserunt consequatur delectus vero dolores nobis consequuntur eos repellendus nisi,
          aspernatur voluptates. Possimus voluptatem iusto aliquid, soluta expedita architecto!
          Omnis, quas! Inventore, soluta? Alias est pariatur earum autem blanditiis numquam
          doloremque optio porro, amet ad vitae soluta fugit sunt qui, accusamus quam
          exercitationem. Nostrum laboriosam mollitia id culpa tenetur a itaque illo officiis minima
          omnis quis ex alias ea pariatur voluptatum architecto quibusdam velit neque dolores, nemo
          excepturi saepe iure. Quod, temporibus aliquam? Sapiente, nesciunt odio molestiae impedit
          ipsum eos dicta explicabo ipsa! Quibusdam obcaecati officiis sit esse, voluptates corporis
          soluta facilis ad consequatur repellat ratione voluptatibus atque tempora dolores nostrum
          aspernatur magni excepturi modi iusto rerum mollitia? Eligendi velit praesentium est
          incidunt rerum dolorum blanditiis, fuga quae earum veritatis commodi sit, adipisci
          quibusdam hic nemo excepturi in delectus, odit quam ea reiciendis ad voluptates. Error rem
          dicta quae nostrum expedita temporibus doloribus fuga corporis magni nesciunt, aspernatur
          incidunt cupiditate velit pariatur ipsum iusto numquam corrupti voluptates debitis quasi
          nam saepe tempora! Voluptatem tenetur sunt dolor odio ducimus aliquam, dicta ad et
          consequuntur harum quo eos deserunt, excepturi cumque incidunt hic aspernatur, accusamus
          dolorum nihil officiis illum. Quibusdam accusantium blanditiis nesciunt molestiae fugiat
          vel cum quis eum sed suscipit hic quas veniam ducimus ratione, id amet ipsam dignissimos
          aliquid reiciendis. Quis, laborum esse aut fugit tempore obcaecati sint voluptatibus nemo,
          nam deserunt illum est adipisci consectetur odio eum explicabo rem tenetur voluptates.
          Reprehenderit eum vero quaerat veritatis eos fugit omnis, itaque alias, repellat vitae
          temporibus. Fuga nobis optio blanditiis alias eos dolorum. Unde ea quia velit cupiditate
          iusto error ratione obcaecati perspiciatis, facilis temporibus dolores id maiores
          accusantium? Nostrum similique totam assumenda explicabo dignissimos sapiente numquam
          consectetur eum eos libero quod, dolorem sit in perspiciatis cumque ea? Cum impedit quo,
          tempore exercitationem optio odio. Ea vel eum repudiandae veritatis expedita rem ut veniam
          unde excepturi, delectus quae error? Placeat sapiente accusamus aut provident harum ullam
          illum! Sint atque quis natus facilis ex unde, dolorem nulla magnam inventore beatae
          expedita reiciendis voluptates neque laudantium exercitationem, minus quam id qui
          deserunt? Perspiciatis dignissimos explicabo consectetur possimus veniam culpa repudiandae
          non unde quae ut modi voluptatum vero fuga blanditiis ullam nam sequi sint, voluptates
          assumenda dolorem illo eum sed perferendis ipsum. Eveniet quod repellendus rem vel illum
          itaque praesentium dolorum magnam eaque. Tempora sunt sit quam error tenetur, doloremque
          expedita in pariatur, temporibus consequatur ex corrupti. Ad qui, debitis repellat,
          blanditiis, sint ducimus praesentium minus sunt molestias ullam voluptate distinctio
          voluptas provident nostrum veniam. Praesentium ex odio necessitatibus aliquam. Earum
          consequuntur autem explicabo in minima modi, laudantium animi excepturi, necessitatibus
          vitae quae repellat fugit deserunt natus iusto accusamus tempore et doloremque qui
          consectetur officia repudiandae eaque recusandae dignissimos? Saepe doloremque unde aut
          exercitationem aliquid neque accusantium iste!
        </div>
        <div v-if="true" class="mobile-controls">
          <button v-if="true" @click="true">
            <icon class="icon" icon="fa-regular fa-heart" />
          </button>
          <button v-if="true" @click="true">
            <icon class="icon" icon="fa-solid fa-cart-shopping" />
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.modal-outer-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #00000099;
  width: 100%;
  height: 100%;

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

  .modal-inner-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(10, 1fr);
    grid-template-areas:
      "image image image image image image image image image image"
      "details details details details details details details details details details"
      "summary summary summary summary summary summary summary summary summary summary"
      "mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls";
    border: white solid 1px;
    background: $lightBlack;
    padding: 2rem;
    gap: 0.5rem;

    img {
      grid-area: image;
      height: 100%;
      aspect-ratio: 3 / 4;
      align-self: center;
      justify-self: center;
    }

    .details {
      grid-area: details;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas:
        "title title"
        "authors authors"
        "genre genre"
        "date pages";
      gap: 0.25rem;
      align-items: center;
      align-self: center;

      .title {
        grid-area: title;
        font-size: 1.5rem;
        color: $lightBlue;
      }

      .authors {
        grid-area: authors;
      }

      .genre {
        grid-area: genre;
        justify-self: center;
      }

      .date {
        grid-area: date;
        justify-self: center;
      }

      .pages {
        grid-area: pages;
        justify-self: center;
      }

      .desktop-controls {
        grid-area: desktop-controls;
        display: none;
      }
    }

    .summary {
      overflow-y: auto;
      grid-area: summary;
    }

    .mobile-controls {
      grid-area: mobile-controls;
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
}

@media (min-width: 480px) {
  .modal-outer-container {
    .modal-inner-container {
      grid-template-areas:
        "image image image image details details details details details details"
        "summary summary summary summary summary summary summary summary summary summary"
        "mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls";

      .details {
        .genre {
          justify-self: start;
        }

        .date {
          justify-self: start;
        }

        .pages {
          justify-self: start;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .modal-outer-container {
    .modal-inner-container {
      grid-template-areas:
        "image image image details details details details details details details"
        "summary summary summary summary summary summary summary summary summary summary"
        "mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls mobile-controls";
    }
  }
}

@media (orientation: landscape) and (min-width: 568px) {
  .modal-outer-container {
    .modal-inner-container {
      grid-template-columns: repeat(10, 1fr);
      grid-template-areas:
        "image image details details details details details details details mobile-controls"
        "summary summary summary summary summary summary summary summary summary mobile-controls";

      img {
        height: auto;
        width: 100%;
      }

      .details {
        .genre {
          justify-self: start;
        }

        .date {
          justify-self: start;
        }

        .pages {
          justify-self: start;
        }
      }

      .mobile-controls {
        flex-direction: column;
        height: 100%;

        button {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

// Desktop
@media (orientation: landscape) and (min-width: 1024px) {
  .modal-outer-container {
    .modal-inner-container {
      width: 80%;
      height: 80%;
      grid-template-areas:
        "image image image details details details details details details details"
        "summary summary summary summary summary summary summary summary summary summary";

      .details {
        grid-template-areas:
          "title title"
          "authors authors"
          "genre genre"
          "date pages"
          "desktop-controls desktop-controls";

        .desktop-controls {
          display: flex;
          gap: 0.5rem;

          button {
            padding: 0.5rem;
            width: 25%;
            border: none;
            background: $navyBlue;

            .icon {
              font-size: 1.25rem;
              color: white;
            }
          }
        }
      }

      .mobile-controls {
        display: none;
      }
    }
  }
}

@media (orientation: landscape) and (min-width: 1200px) {
  .modal-outer-container {
    .modal-inner-container {
      width: 70%;
    }
  }
}

@media (orientation: landscape) and (min-width: 1400px) {
  .modal-outer-container {
    .modal-inner-container {
      width: 60%;
    }
  }
}

@media (orientation: landscape) and (min-width: 1600px) {
  .modal-outer-container {
    .modal-inner-container {
      width: 50%;
    }
  }
}
</style>
