<template>
  <section class="content">
    <div class="content__inner">
      <div class="content__title">Усі Відео</div>
      <div class="content__hr"></div>
      <div class="content__search">
        <input type="text" v-model="search" />
        <img src="@/assets/images/search.png" alt="search" />
      </div>
      <button class="content__icon" @click="gridShow">
        <img src="@/assets/images/grid.png" alt="grid" />
      </button>
      <button class="content__icon" @click="listShow">
        <img src="@/assets/images/list.png" alt="list" />
      </button>
    </div>
    <div class="cards__content" v-if="grid">
      <div class="cards" v-for="card of searchCard" :key="card.id">
        <div class="cards__photo">
          <img :src="card.covers.main" alt="image" />
        </div>
        <div class="cards__inner">
          <div class="cards__text">
            {{ card.title }}
          </div>
          <button type="button" class="cards__button" v-show="card.access">
            Дивитися
          </button>
          <button
            type="button"
            class="cards__button btn--price"
            v-show="!card.access"
          >
            Придбати
          </button>
        </div>
      </div>
    </div>
    <div class="list__content" v-else-if="!grid">
      <div class="list__card" v-for="list of searchCard" :key="list.id">
        <div class="list__photo">
          <img :src="list.covers.main" alt="image" height="125" width="115" />
        </div>
        <div class="list__inner">
          <div class="list__text">
            {{ list.title }}
          </div>
          <button type="button" class="list__button" v-show="list.access">
            Дивитися
          </button>
          <button
            type="button"
            class="list__button btn--price"
            v-show="!list.access"
          >
            Придбати
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "cards",
  data() {
    return {
      search: "",
      grid: true,
    };
  },
  computed: {
    ...mapGetters(["themeCards"]),
    searchCard() {
      return this.themeCards.filter((card) => {
        return card.title.match(this.search);
      });
    },
  },
  methods: {
    ...mapActions(["GET_CARDS_FROM_API", "GET_CARDS_FOR_THEME"]),
    gridShow() {
      this.grid = true;
    },
    listShow() {
      this.grid = false;
    },
  },
  async mounted() {
    await this.GET_CARDS_FROM_API();
    await this.GET_CARDS_FOR_THEME("all");
  },
};
</script>

<style lang="scss">
.content {
  width: 100%;
  max-width: 870px;
  height: 160vh;
  position: absolute;
  top: 45px;
  right: 0;
}
.content__inner {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;

  .content__title {
    text-transform: uppercase;
    font-size: 35px;
    color: #232323;
    font-weight: 300;
    margin-right: 16px;
  }
  .content__hr {
    width: 305px;
    height: 1px;
    border: 0;
    background-color: #d3d3d3;
    margin-right: 50px;
  }
  .content__search {
    position: relative;

    img {
      display: block;
      position: absolute;
      top: 4px;
      right: 8px;
    }
    input {
      box-sizing: border-box;
      padding-right: 30px;
      height: 24px;
      width: 195px;
      position: relative;
      border: none;
      outline: none;
      border-radius: 5px;
    }
  }
  .content__icon {
    margin: 0 22px 0 18px;
    border: none;
    outline: none;
    cursor: pointer;

    &:last-child {
      margin: 0;
    }
  }
}
.list__content {
  margin-left: 20px;

  .list__card {
    margin-top: 30px;
    height: 125px;
    width: 98%;
    display: flex;

    .list__inner {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #c7c7c7;
      background-color: #fff;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;

      .list__text {
        height: 55px;
        font-size: 16px;
        font-weight: 700;
        padding: 15px 10px 0 15px;
      }
      .list__button {
        display: block;
        margin: 0 0 0 100px;
        outline: none;
        font-size: 18px;
        font-weight: 700;
        border: 1px solid #c7c7c7;
        width: 170px;
        box-sizing: border-box;
        padding: 6px 0 6px;
        background-color: #fff;
        border-radius: 20px;
        cursor: pointer;
        position: relative;
        transition: color 0.2s linear, border-color 0.2s linear;

        &.btn--price {
          background-color: #ed3434;
          color: #fff;
          border-color: #ed3434;
          transition: background 0.2s linear, border-color 0.2s linear;

          &:hover {
            color: #fff;
            background-color: #a11313;
            border-color: #a11313;
          }
        }
        &::before {
          content: "";
          display: inline-block;
          background-color: #ed3434;
          height: 35px;
          width: 35px;
          border-radius: 50%;
          position: absolute;
          right: -5px;
          top: -1px;
        }
        &::after {
          content: "";
          display: inline-block;
          height: 9px;
          width: 9px;
          border-right: 2px solid;
          border-bottom: 2px solid;
          transform: rotate(-45deg);
          color: #fff;
          position: absolute;
          right: 10px;
          top: 10px;
        }
        &:hover {
          color: #ed3434;
          border-color: #ed3434;
        }
      }
    }
  }
}
.cards__content {
  margin-left: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;

  .cards {
    margin-top: 30px;
    height: 520px;
    width: 260px;

    .cards__photo {
      height: 340px;
      width: 100%;
    }
    .cards__inner {
      height: 180px;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #c7c7c7;
      background-color: #fff;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;

      .cards__text {
        height: 100px;
        font-size: 16px;
        font-weight: 700;
        padding: 15px 10px 0 15px;
      }
      .cards__button {
        display: block;
        margin: 0 auto;
        outline: none;
        font-size: 18px;
        font-weight: 700;
        border: 1px solid #c7c7c7;
        width: 170px;
        box-sizing: border-box;
        padding: 6px 0 6px;
        background-color: #fff;
        border-radius: 20px;
        cursor: pointer;
        position: relative;
        transition: color 0.2s linear, border-color 0.2s linear;

        &.btn--price {
          background-color: #ed3434;
          color: #fff;
          border-color: #ed3434;
          transition: background 0.2s linear, border-color 0.2s linear;

          &:hover {
            color: #fff;
            background-color: #a11313;
            border-color: #a11313;
          }
        }
        &::before {
          content: "";
          display: inline-block;
          background-color: #ed3434;
          height: 35px;
          width: 35px;
          border-radius: 50%;
          position: absolute;
          right: -5px;
          top: -1px;
        }
        &::after {
          content: "";
          display: inline-block;
          height: 9px;
          width: 9px;
          border-right: 2px solid;
          border-bottom: 2px solid;
          transform: rotate(-45deg);
          color: #fff;
          position: absolute;
          right: 10px;
          top: 10px;
        }
        &:hover {
          color: #ed3434;
          border-color: #ed3434;
        }
      }
    }
  }
}
</style>
