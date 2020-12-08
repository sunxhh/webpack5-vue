<template>
  <div class="tz-commander-main-page-outer">
    <div class="top">
      <CommanderHeader />
    </div>
    <div class="bottom">
      <transition :name="transitionType">
        <!-- 这里是需要keepalive的 -->
        <keep-alive>
          <router-view
            v-if="$route.meta.keepAlive"
            :key="$route.fullPath"
            class="child-view"
          />
        </keep-alive>
      </transition>
      <transition :name="transitionType">
        <!-- 这里不会被keepalive -->
        <router-view
          v-if="!$route.meta.keepAlive"
          :key="$route.fullPath"
          class="child-view"
        />
      </transition>
    </div>
  </div>
</template>
<script>
import CommanderHeader from '../header/header';
export default {
  name: 'MainPage',
  components: {
    CommanderHeader
  },
  data() {
    return {
      transitionType: 'slide'
    };
  },
  created() {

  },
  methods: {

  }
};

</script>
