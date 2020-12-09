import Vue from 'vue';
import Vuex from 'vuex';
import main from './modules/app';

Vue.use(Vuex);
const store = new Vuex.Store({
  namespaced: true,
  modules: {
    main
  }
});
export default store;
