import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import KiafBaseUI from '@kd-components/kiaf-baseui';
import KFront from 'kfront-baseui';
import locale from 'kfront-baseui/lib/locale/lang/zh-CN';

import 'kfront-baseui/css/index.css';
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
