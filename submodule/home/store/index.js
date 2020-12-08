import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home.js';

Vue.use(Vuex);

const store = {
  namespaced: true,
  modules: {
    home
  },
  state: {},
  mutations: {}
};

export default store;
