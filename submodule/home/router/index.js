import { prefixRouterName } from 'config/enums.js';

const subRouter = function (mainPage) {
  const routeTotal = [{
    path: `${prefixRouterName}`,
    name: `${prefixRouterName}`,
    component: mainPage,
    redirect: `${prefixRouterName}/home`,
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          keepAlive: true,
          title: '首页'
        },
        component: () => import('submodule/home/view/home')
      }
    ]
  }];
  return routeTotal;
};
export default subRouter;
