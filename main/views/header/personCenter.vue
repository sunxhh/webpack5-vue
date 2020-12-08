<template>
  <div class="tz-commander-person-center-outer">
    <div class="timer-outer"></div>
    <div class="user-info-btn">
      <img :src="personPng">
    </div>
    <div class="personal-center-outer">
      <div class="personal-center-header-outer">
        <img :src="personPng">
        <span>{{username}}</span>
      </div>
      <div class="personal-center-content-outer">
        <div class="icon-wrapper">
          <div class="icon-item"></div>
          <div class="icon-item"></div>
          <div class="icon-item"></div>
        </div>
        <div>
          <span>用户姓名:</span>
          <span>{{username}}</span>
        </div>
        <div>
          <span>组织结构:</span>
          <span></span>
        </div>
        <div>
          <span>版本信息:</span>
          <span></span>
        </div>
        <div>
          <span>系统时间:</span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import personPng from '../../assets/img/person.png';

export default {
  name: 'PersonCenter',
  components: {},
  data() {
    return {
      personPng,
      username: '毛威威'
    };
  },
  created() {

  },
  mounted() {

  },
  destroyed() {

  },
  methods: {

  }
};

</script>
