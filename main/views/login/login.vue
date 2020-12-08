<template>
  <div class="kiaf-login-view-right-mode">
    <component :is="currentLoginStyle"></component>
  </div>
</template>
<script>
import loginStyle1 from './styleViews/loginStyle1.vue';

export default {
  data() {
    return {
      currentLoginStyle: ''
    };
  },
  components: {
    loginStyle1
  },
  created() {},
  mounted() {
    this.currentLoginStyle = loginStyle1;
  },
  methods: {

  }
};

</script>
