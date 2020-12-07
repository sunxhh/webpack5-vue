<template>
  <div class="login-style-view1 dispatch-login-light-theme">
    <div class="background-video-new">
      <!-- <img :src="images.bg" /> -->
      <video
        :src="images.bg"
        autoplay
        loop
        muted
        class="bgVideo"
      >
        您的浏览器版本不支持该视频播放，请下载最新版本！
      </video>
      <div class="system-info">
        <div
          class="system-title"
          :style="styleObj"
        >
          {{systemTitle}}
        </div>
        <div class="system-desc">
          {{systemDesc}}
        </div>
      </div>
    </div>
    <div class="login-main">
      <!-- <img
          class="kedacom-logo"
          :src="images.logo"
        > -->
      <div class="police-logo">
        <img
          v-if="systemLogo"
          :src="systemLogo"
        />
        <!-- <img
            v-else
            src="/main/assets/images/login/police-logo.png"
          /> -->
      </div>
      <div class="welcome">
        <img :src="images.welcome">
      </div>

      <kc-form
        class="login-form"
        :model="loginForm"
        ref="loginForm"
        :rules="rules"
      >
        <kc-form-item
          prop="username"
          class="login-input"
        >
          <span
            class="input-name"
            @click="usernameFocus"
          >用户名
          </span>
          <kc-input
            ref="username"
            size="mini"
            v-model="loginForm.username"
            auto-complete="off"
            :autofocus="true"
            @focus="userNameInputFocus = true"
            @blur="userNameInputFocus = false"
            clearable
          >
          </kc-input>
          <div class="bottom-line"></div>
          <div
            class="bottom-line-focus"
            :class="(userNameInputFocus||!loginForm.username) ? 'focus' : ''"
          ></div>
        </kc-form-item>

        <kc-form-item
          prop="password"
          class="login-input"
        >
          <span
            class="input-name"
            @click="passwordFocus"
          >密码
          </span>
          <kc-input
            ref="password"
            size="mini"
            type="password"
            v-model="loginForm.password"
            auto-complete="off"
            @focus="passwordInputFocus = true"
            @blur="passwordInputFocus = false"
            clearable
          >
          </kc-input>
          <div class="bottom-line"></div>
          <div
            class="bottom-line-focus"
            :style="{'background-color': errorMsg ? '#FF2E63' : '#1CD76E'}"
            :class="(passwordInputFocus || errorMsg||!loginForm.password) ? 'focus' : ''"
          >
          </div>
        </kc-form-item>

        <span class="error-errorMsg">{{errorMsg}}</span>

        <span
          class="remember-user"
          @click="rememberUser = !rememberUser"
        >
          <i
            class="kedaIconfont"
            :class="rememberUser ? 'KD-duigou' : 'KD-gongjud'"
          ></i>记住用户名和密码
        </span>

        <div class="button-bg">
          <kc-button
            round
            type="primary"
            @click="userLogin()"
            id="keybtn"
            :loading="loading"
            :disabled="!loginForm.username || !loginForm.password"
          >登录{{loading ? '中' : ''}}
          </kc-button>
        </div>
      </kc-form>

      <footer>{{labels.copyright}}</footer>
    </div>
  </div>
</template>
<script>
import loginMixins from '../index.js';
export default {
  name: 'loginStyle2',
  mixins: [loginMixins]
};

</script>
<style lang="scss">
.dispatch-login-light-theme {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #061745;

  .blank-view {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: #FFFFFF;
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: #333 !important;
  }

  .background-video-new {
    /* width: 100%;
      height: 100%; */
    margin-right: 35rem;

    .bgVideo {
      width: 100%;
    }

    /* video {
        height: 100%;
        position: absolute;
        left: 0;
      } */

    .system-info {
      position: absolute;
      top: 126px;
      left: 98px;
      min-width: 506px;
      white-space: nowrap;
      font-family: 'PingFangSC-Regular', Helvetica, Arial, sans-serif;
      user-select: none;

      .system-title {
        min-height: 100px;
        line-height: 100px;
        font-weight: 400;
        font-size: 64px;
        color: #fff;
      }

      .system-desc {
        font-weight: 300;
        color: #f1f1f1;
        font-size: 36px;
        padding-top: 8px;
      }
    }
  }

  .login-main {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    float: right;
    width: 35rem;
    background: #FFFFFF;

    .kedacom-logo {
      position: absolute;
      top: 2rem;
      right: 2rem;
      width: 7.5rem;
      // width: 7rem;
    }

    .police-logo {
      width: 100%;
      height: 143px;
      text-align: center;
      padding-top: 90px;

      img {
        width: 135px;
        height: 143px;
      }
    }

    .welcome {
      width: 100%;
      text-align: center;
      margin: 37px 0;

      img {
        width: 280px;
        height: 66px;
      }
    }

    .login-form {
      position: relative;
      width: 18rem;
      margin: 1.8rem auto 0 auto;

      .kc-form-item {
        margin-bottom: 0;
      }

      .login-input {
        position: relative;
        height: 3.4rem;

        .input-name {
          z-index: 1;
          display: block;
          font-size: 12px;
          color: rgba(75, 84, 97, 1);
          position: absolute;
          top: 0.6rem;
          transform: translateY(0rem);
          transition: all .45s cubic-bezier(.23, 1, .32, 1);
        }

        .input-name.float {
          color: rgba(62, 74, 89, 1) !important;
          transform: translateY(1.3rem) !important;
        }

        .kc-input {
          width: 100%;
          margin-top: 1.9rem;
          height: 1.2rem;

          .kc-input__inner {
            height: 1.2rem;
            line-height: 1.2rem;
            outline: none;
            border: none;
            padding: 0;
            font-size: 0.7rem !important;
          }

          .kc-input__suffix {
            right: -0.3rem;
          }
        }

        .bottom-line {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 1px;
          background-color: #D3DFEF;
        }

        .bottom-line-focus {
          position: absolute;
          bottom: 0;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          background-color: #1CD76E;
          transition: transform .45s cubic-bezier(.23, 1, .32, 1), -webkit-transform .45s cubic-bezier(.23, 1, .32, 1);
        }

        .bottom-line-focus.focus {
          transform: scaleX(1) !important;
        }
      }

      .login-input+.login-input {
        margin-top: 0.2rem;
      }

      .error-errorMsg {
        font-size: 12px;
        position: absolute;
        right: 0;
        line-height: 2.2rem;
        color: #4B5461;
      }

      .remember-user {
        display: inline-block;
        margin-top: 1.8rem;
        font-size: 0.6rem;
        line-height: 0.7rem;
        color: rgba(75, 84, 97, 1);
        cursor: pointer;

        i {
          font-size: 0.7rem;
          padding-right: 0.4rem;
        }
      }

      .button-bg {
        .kc-button {
          margin-top: 2rem;
          width: 100%;
          height: 3rem;
          border-radius: 1.5rem;
          margin-bottom: 2rem;
          background: linear-gradient(180deg, rgba(100, 156, 255, 1) 0%, rgba(46, 88, 216, 1) 100%);
          box-shadow: 0px 6px 16px 0px rgba(99, 141, 240, 0.6);

          span,
          .kc-icon-loading {
            font-size: 24px;
          }
        }

        .kc-button--primary:not(:hover) {
          background-color: #1762FA;
          border-color: #1762FA;
        }
      }
    }

    footer {
      font-size: 12px;
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 2.45rem;
    }
  }
}

</style>
