import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import initDirective from '@kd-components/dispatch-common-ui';
Vue.use(initDirective);

window.mainVm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
