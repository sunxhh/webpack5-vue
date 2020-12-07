<template>
  <div class="kiaf-login-view-right-mode">
    <component :is="currentLoginStyle"></component>
  </div>
</template>
<script>
import loginStyle1 from './styleViews/loginStyle1.vue';
import loginStyle2 from './styleViews/loginStyle2.vue';
import loginStyle3 from './styleViews/loginStyle3.vue';
import { findSysByConfType } from '../../service/params.js';
let loginStyles = [loginStyle1, loginStyle2, loginStyle3]; // 风格组件列表
export default {
  data() {
    return {
      currentLoginStyle: ''
    };
  },
  components: {
    loginStyle1,
    loginStyle2,
    loginStyle3
  },
  created() {
    this.getLoginViewStyle();
  },
  mounted() {},
  methods: {
    // 获取登陆的风格
    async getLoginViewStyle() {
      let mapStyleKeys = {};
      loginStyles.forEach((styleComp, index) => {
        mapStyleKeys[`style${(index + 1)}`] = styleComp;
      });
      let layoutStyle = { result: '' };
      try {
        let params = {
          key: 'login_page_config'
        };
        layoutStyle = await findSysByConfType(params);
      } catch (error) {
        console.log(error, '>>>> 获取登录风格的样式错误');
      }
      let LoginPageStyle = layoutStyle.result['login_page_style'];
      console.log(LoginPageStyle, '>>>>> 登录风格的样式 LoginPageStyle');
      // LoginPageStyle = 'style3';
      console.log(mapStyleKeys, 'mapStyleKeys');
      this.currentLoginStyle = LoginPageStyle ? mapStyleKeys[LoginPageStyle] : loginStyle1;
    }
  }
};

</script>
