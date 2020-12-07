import Vue from 'vue';
import Vuex from 'vuex';
import main from './modules/app';
import kiaf from '@kd-components/kiaf-baseui/store/index';

Vue.use(Vuex);
const store = new Vuex.Store({
  namespaced: true,
  modules: {
    main,
    kiaf
  }
});
export default store;
