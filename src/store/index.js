import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: [],
    theme: [],
    radio: [],
  },
  mutations: {
    SET_CARD_TO_VUEX(state, cards) {
      state.cards = cards;
    },
    SET_CARD_FOR_THEME(state, theme) {
      if (theme === "all") {
        state.theme = state.cards;
        state.radio = state.cards;
      } else {
        state.theme = state.cards.filter((card) => card.theme === theme);
        state.radio = state.cards.filter((card) => card.theme === theme);
      }
    },
    SORT_STOCK(state, radio) {
      if (radio) {
        state.theme = state.theme.filter((card) => card.options.sale === radio);
      } else {
        state.theme = state.radio;
      }
    },
    SORT_POPULAR(state, radio) {
      if (radio) {
        state.theme = state.theme.filter(
          (card) => card.options.popular === radio
        );
      } else {
        state.theme = state.radio;
      }
    },
  },
  actions: {
    GET_CARDS_FROM_API({ commit }) {
      return Axios("https://dreamlifecoach.online/db.json?_limit=6", {
        method: "GET",
      }).then((response) => {
        commit("SET_CARD_TO_VUEX", response.data);
      });
    },
    GET_CARDS_FOR_THEME({ commit }, theme) {
      commit("SET_CARD_FOR_THEME", theme);
    },
    SORT_STOCK({ commit }, radio) {
      commit("SORT_STOCK", radio);
    },
    SORT_POPULAR({ commit }, radio) {
      commit("SORT_POPULAR", radio);
    },
  },
  getters: {
    allCards(state) {
      return state.cards;
    },
    themeCards(state) {
      return state.theme;
    },
  },
  modules: {},
});
