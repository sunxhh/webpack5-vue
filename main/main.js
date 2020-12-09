import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import 'normalize.css';
import './styles/tecBlue/index.scss';

Vue.use(KiafBaseUI);
Vue.use(KFront, { locale });

window.mainVm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
