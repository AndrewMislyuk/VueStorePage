<template>
  <div class="sidebar">
    <div class="accordion">
      <div
        class="accordion__header"
        @click="accordionOne = !accordionOne"
        :class="{ active: accordionOne }"
      >
        <div class="accordion__icon">
          <img src="@/assets/images/video.png" alt="video" />
        </div>
        <div class="accordion__title">Відео</div>
        <div class="accordion__arrow">
          <img src="@/assets/images/arrow.png" alt="arrow" />
        </div>
      </div>
      <div class="accordion__body">
        <div class="accordion__radio">
          <input
            type="checkbox"
            name="radio"
            id="radio1"
            @change="sortStock()"
          />
          <label for="radio1">Акція()</label>
        </div>
        <div class="accordion__radio">
          <input
            type="checkbox"
            name="radio"
            id="radio2"
            @change="sortPopular()"
          />
          <label for="radio2">Популярні()</label>
        </div>
      </div>
    </div>
    <div class="accordion">
      <div
        class="accordion__header"
        @click="accordionTwo = !accordionTwo"
        :class="{ active: accordionTwo }"
      >
        <div class="accordion__icon">
          <img src="@/assets/images/theme.png" alt="video" />
        </div>
        <div class="accordion__title">Теми</div>
        <div class="accordion__arrow">
          <img src="@/assets/images/arrow.png" alt="arrow" />
        </div>
      </div>
      <div class="accordion__body">
        <button
          class="accordion__paragraph"
          @click.prevent="selectTheme('all')"
          :class="{ active: theme === 'all' }"
        >
          Всі теми({{ allCards.length }})
        </button>
        <button
          class="accordion__paragraph"
          @click.prevent="selectTheme('excise_tax')"
          :class="{ active: theme === 'excise_tax' }"
        >
          Акцизний податок({{ lengthTheme("excise_tax") }})
        </button>
        <button
          class="accordion__paragraph"
          @click.prevent="selectTheme('currency')"
          :class="{ active: theme === 'currency' }"
        >
          Валюта({{ lengthTheme("currency") }})
        </button>
        <button
          class="accordion__paragraph"
          @click.prevent="selectTheme('production')"
          :class="{ active: theme === 'production' }"
        >
          Виробництво і собівартість({{ lengthTheme("production") }})
        </button>
        <button
          class="accordion__paragraph"
          @click.prevent="selectTheme('vacation')"
          :class="{ active: theme === 'vacation' }"
        >
          Відпустки({{ lengthTheme("vacation") }})
        </button>
        <button
          class="accordion__paragraph"
          @click.prevent="selectTheme('business_trips')"
          :class="{ active: theme === 'business_trips' }"
        >
          Відрядження({{ lengthTheme("business_trips") }})
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "sidebar",
  data() {
    return {
      accordionOne: true,
      accordionTwo: true,
      theme: "all",
      stock: false,
      popular: false,
    };
  },
  computed: {
    ...mapGetters(["allCards"]),
  },
  methods: {
    ...mapActions([
      "GET_CARDS_FROM_API",
      "GET_CARDS_FOR_THEME",
      "SORT_STOCK",
      "SORT_POPULAR",
    ]),
    selectTheme(theme) {
      this.theme = theme;
      this.GET_CARDS_FOR_THEME(this.theme);
    },
    lengthTheme(theme) {
      return this.allCards.filter((card) => card.theme === theme).length;
    },
    sortStock() {
      this.stock = !this.stock;
      this.SORT_STOCK(this.stock);
    },
    sortPopular() {
      this.popular = !this.popular;
      this.SORT_POPULAR(this.popular);
    },
  },
  async mounted() {
    await this.GET_CARDS_FROM_API();
  },
};
</script>

<style lang="scss">
.sidebar {
  width: 100%;
  max-width: 280px;
  background-color: #fff;
  position: absolute;
  top: 0;
  bottom: -415px;
  left: 0;
  box-shadow: 0 20px 20px 1px #bebbbb;
}
.accordion {
  width: 100%;
  max-width: 250px;
  margin: 30px auto;
  position: relative;

  .accordion__header {
    background-color: #e6e6e6;
    height: 40px;
    cursor: pointer;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    position: relative;

    &.active {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    &.active + .accordion__body {
      display: block !important;
    }
    &.active > .accordion__arrow {
      transform: rotate(0deg);
    }
    .accordion__icon {
      padding: 11px 11px 0 11px;
    }
    .accordion__title {
      padding: 13px 0 12px;
      font-size: 14px;
      color: #000;
      text-transform: uppercase;
      font-weight: 700;
    }
    .accordion__arrow {
      transform: rotate(-90deg);
      position: absolute;
      right: 19px;
      top: 9px;
    }
  }
  .accordion__body {
    padding: 15px 0 15px 15px;
    max-width: 231px;
    height: 200px;
    width: 100%;
    border: 2px solid #e6e6e6;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: none;

    .accordion__paragraph {
      display: block;
      margin-bottom: 10px;
      background: none;
      font-size: 14px;
      border: none;
      outline: none;
      cursor: pointer;
      transition: color 0.2s linear;

      &.active {
        color: #ed3434;
      }
      &:hover {
        color: #ed3434;
      }
    }
    .accordion__radio {
      font-size: 14px;
      display: flex;
      align-items: center;

      input + label::after {
        content: none;
      }
      input {
        margin-right: 12px;
        opacity: 0;
        &:checked + label {
          color: #ed3434;
        }
        &:checked + label::after {
          content: "";
          color: #fff;
        }
        &:checked + label::before {
          background: #ed3434;
          border-color: #ed3434;
          border-radius: 0;
        }
      }
      label {
        position: relative;
        cursor: pointer;
        transition: color 0.2s linear;

        &:hover {
          color: #ed3434;
        }
        &::after {
          content: "";
          display: inline-block;
          height: 6px;
          width: 9px;
          border-left: 2px solid;
          border-bottom: 2px solid;
          transform: rotate(-45deg);
          position: absolute;
          top: 2px;
          left: -24px;
        }
        &::before {
          content: "";
          display: inline-block;
          height: 16px;
          width: 16px;
          border: 3px solid #cccccc;
          position: absolute;
          border-radius: 5px;
          top: -3px;
          left: -30px;
        }
      }
      &:nth-child(2) {
        margin: 12px 0;
      }
    }
  }
}
</style>
