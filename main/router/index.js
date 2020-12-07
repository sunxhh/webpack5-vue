import Vue from 'vue';
import VueRouter from 'vue-router';

const routers = [];

Vue.use(VueRouter);
// 路由配置
const RouterConfig = {
  routes: routers
};
const router = new VueRouter(RouterConfig);

export default router;
