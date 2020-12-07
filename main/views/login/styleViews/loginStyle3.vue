<template>
  <div class="dispatch-login-style-view3">
    <video
      :src="images.bg2"
      logoStyle1
      autoplay
      loop
      muted
      class="bgVideo"
    >
      您的浏览器版本不支持该视频播放，请下载最新版本！
    </video>
    <div class="login-views-container">
      <div class="login-logo">
        <img
          :src="systemLogo"
          alt=""
          class="login-logo-image"
        >
      </div>
      <div class="dispatch-login-container">
        <div
          class="login-main-title"
          :style="styleObj"
        >
          {{systemTitle}}
        </div>
        <div class="login-form-wrapper">
          <kc-form
            :model="loginForm"
            ref="loginForm"
            :rules="rules"
          >
            <kc-form-item prop="username">
              <div class="login-form-item-custom login-user-input">
                <i class="iconfont icon-login-user"></i>
                <input style="display:none">
                <kc-input
                  class="input-text"
                  ref="username"
                  size="mini"
                  v-model="loginForm.username"
                  auto-complete="off"
                  :autofocus="true"
                  :spellcheck="false"
                  @focus="userNameInputFocus = true"
                  @blur="userNameInputFocus = false"
                  clearable
                  type="text"
                  placeholder="请输入用户名"
                ></kc-input>
              </div>
              <div
                class="bottom-line-focus"
                :class="(userNameInputFocus||!loginForm.username) ? 'focus' : ''"
              ></div>
            </kc-form-item>

            <kc-form-item prop="password">
              <div class="login-form-item-custom login-password-input">
                <i class="iconfont icon-login-password"></i>
                <input style="display:none">
                <kc-input
                  class="input-text"
                  placeholder="请输入密码"
                  ref="password"
                  size="mini"
                  type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  :spellcheck="false"
                  @focus="passwordInputFocus = true"
                  @blur="passwordInputFocus = false"
                  clearable
                ></kc-input>
              </div>
            </kc-form-item>
            <div class="submit-button-wrapper">
              <div class="remember-wrapper">
                <!--  -->
                <span class="remember-user">
                  <label
                    for="remberUser"
                    class="dpc-icheck-checkbox dpc-icheck-flat-checkbox"
                  >
                    <input
                      type="checkbox"
                      id="remberUser"
                      v-model="rememberUser"
                    >
                    <div class="dpc-icheck-media"></div>
                    <div class="dpc-icheck-inner">
                      记住用户名和密码
                    </div>
                  </label>
                </span>
              </div>
              <kc-button
                class="login-button"
                type="primary"
                :disabled="!loginForm.username || !loginForm.password"
                :loading="loading"
                @click="userLogin($event)"
              >{{loading ? '登录中': '安全登录'}}</kc-button>
            </div>
          </kc-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import loginMixins from '../index.js';
export default {
  name: 'loginStyle3',
  mixins: [loginMixins]
};

</script>
<style lang="scss">

</style>
