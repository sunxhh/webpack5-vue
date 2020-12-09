import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import 'normalize.css';
import './styles/tecBlue/index.scss';

window.mainVm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
