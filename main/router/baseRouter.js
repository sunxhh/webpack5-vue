import LoginPage from '../views/login/login.vue';
const router = [{
  path: '/',
  name: 'login',
  component: LoginPage,
  meta: {
    title: '登陆页'
  }
}];
export default router;
