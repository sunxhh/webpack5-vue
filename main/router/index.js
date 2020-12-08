import Vue from 'vue';
import VueRouter from 'vue-router';
import baseRouter from './baseRouter';
import mainPage from '../views/mainPage/mainPage';
import HomeRoute from 'submodule/home/router/index';

const routers = [
  ...baseRouter,
  ...HomeRoute(mainPage)
];

Vue.use(VueRouter);
// 路由配置
const RouterConfig = {
  routes: routers
};
const router = new VueRouter(RouterConfig);

export default router;
