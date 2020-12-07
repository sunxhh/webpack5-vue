import Util from 'utils/util';
import Global from 'utils/global';
import Constants from 'utils/constants';
import { postMessage, onMessage } from 'utils/event-bus';
import { userLogin, getUserMsg, getMainTitle, getSubTitle, findSysConfByConfig } from '../../service/login.js';
import Auth from 'main/utils/auth';
// import systemInfo from 'submodule/dispatch-meetplan-control-ui/utils/systemInfo';
import { findSysByConfType } from 'main/service/params.js';
import policeLogin from 'main/assets/images/login/police-logo.png';
import {
  getResourceTree
} from 'submodule/dispatch-meetplan-control-ui/service/device';
export default {
  name: 'login',
  data() {
    return {
      labels: {
        subject: '欢迎登录',
        copyright: ''
      },
      images: {
        bg: require('../../assets/images/bg.mp4'),
        policelogo: require('../../assets/images/login/police-logo.png'),
        logo: require('../../assets/images/login/kedacom-logo.png'),
        welcome: require('../../assets/images/login/welcome.png'),
        bg1: require('../../assets/images/login/style2/login-style-bg.mp4'),
        bg2: require('../../assets/images/login/style3/login-style-bg.mp4')
      },
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      userNameInputFocus: false,
      passwordInputFocus: false,
      errorMsg: '',
      deptName: '',
      loading: false,
      rememberUser: true, // 记住密码
      isLogined: true, // 用于判断是否已经登录过，如果已经登录过，执行关闭窗口
      systemLogo: '',
      systemTitle: '',
      systemDesc: '',
      styleObj: {}
    };
  },
  methods: {
    sendOpenedWindow() {
      this.openedWindowCount = 0;
      postMessage(Constants.EVENT_CODE.getIsLogined, {});
    },
    verifyRoute(resourceTree) {
      let routeMap = {
        '/dispatch/map': 'map',
        '/dispatch/player': 'player'
      };
      let data1 = {
        controller: true,
        player: false,
        map: false
      };
      resourceTree = resourceTree.result;
      Object.keys(routeMap).forEach((key) => {
        resourceTree.forEach((data) => {
          if (data.url === key) {
            data1[routeMap[key]] = true;
          }
        });
      });
      return data1;
    },
    async getNeedOpenWindows() {
      let resourceTree = await getResourceTree();
      let verifyRouteData = this.verifyRoute(resourceTree);
      return findSysConfByConfig('login_page_config').then((res) => {
        let windowsData = Global.getWindows();
        let config = res.result.multiple_screens_config || '[]';
        let data = {
          play_screen: 'player',
          map_screen: 'map'
        };
        let data1 = {
          controller: true,
          player: false,
          map: false
        };
        config = JSON.parse(config);
        config.forEach((item) => {
          data1[data[item.key]] = true;
        });
        let newList = [];
        windowsData.forEach((item) => {
          if (data1[item.windowId] && verifyRouteData[item.windowId]) {
            newList.push(item);
          }
        });
        return newList;
      });
    },
    listenOpenedWindow() {
      onMessage(Constants.EVENT_CODE.postIsLogined, (data) => {
        this.openedWindowCount++;
        if (this.openedWindowCount > 0) {
          this.$alert('系统已经打开，请勿重复登录，若要重登请先关闭。', '警告', {
            confirmButtonText: '确定',
            callback: action => {}
          });
        }
      });
    },
    // 获取版权信息数据
    getCopyRight() {
      let key = 'image_word_conf';
      this.getSysConfigInfo(key, (result) => {
        this.labels.copyright = result.copyright ? result.copyright : '';
      });
    },
    loginPageValidateUserEnable() {
      let key = 'login_page_config';
      return findSysByConfType({ key });
    },
    getTitleConfig() {
      getMainTitle().then(res => {
        console.log(res, '配置');
        this.systemTitle = res.result.loginTitle;
        if (res.result.loginTitleSize) {
          this.styleObj = { 'font-size': res.result.loginTitleSize + 'px' };
        }
        localStorage.setItem('mainTitle', this.systemTitle);
      });
      getSubTitle().then(res => {
        console.log(res);
        this.systemDesc = res.result;
      });

      let key = 'image_word_conf';
      this.getSysConfigInfo(key, (result) => {
        let imageChange = result.image_change;
        this.systemLogo = result.is_show_image_change == 1 ? (imageChange || policeLogin) : '';
        // 登陆页下面的版权信息
        this.labels.copyright = result.copyright ? result.copyright : '';
      });
    },
    usernameFocus() {
      if (!this.userNameInputFocus && !this.models.username) {
        this.$refs.username.focus();
      }
    },
    passwordFocus() {
      if (!this.passwordInputFocus && !this.models.password) {
        this.$refs.password.focus();
      }
    },
    async userLogin() {
      this.sendOpenedWindow();
      if (this.loginForm.username && this.loginForm.password) {
        let needVerify = await this.loginPageValidateUserEnable();
        if (needVerify.result.login_page_validate_user_enable == 1) {
          let masStr = needVerify.result.login_page_validate_users || '';
          masStr = masStr.split(',');

          for (let i = 0; i < masStr.length; i++) {
            let item = (masStr[i] || '').trim();
            if (this.loginForm.username.trim() === item && item) {
              this.$message({
                type: 'error',
                message: '登录用户与mac地址不符',
                duration: 4000,
                showClose: true
              });
              return;
            }
          }
        }
      }

      setTimeout(() => {
        if (this.openedWindowCount > 0) {
          return;
        }
        if (!Util.isInstalledChromeExtension()) {
          this.$alert('请先安装插件！', '警告', {
            confirmButtonText: '确定',
            callback: action => {}
          });
          return;
        }
        if (this.loginForm.username && this.loginForm.password) {
          this.errorMsg = '';
          this.loading = true;
          Auth.setRememberUser(this.rememberUser);
          userLogin(this.loginForm).then(response => {
            Auth.clearStorage();
            Auth.clearJwtToken();
            // Auth.removeLoginForm();//loginForm
            // if (this.rememberUser) {
            //   // this.loginForm.password = Util.encrypt(this.loginForm.password);
            //   Auth.setLoginForm({
            //     username: this.loginForm.username,
            //     password: Util.encrypt(this.loginForm.password)
            //   });//loginForm
            // }
            // Auth.setKChatInfo({
            //   username: this.loginForm.username,
            //   password: Util.encrypt(this.loginForm.password)
            // });

            if (response.result && response.result.jwt_token) {
              Auth.setJwtToken(response.result.jwt_token);
              Auth.setRefreshToken(response.result.refresh_token);
              Auth.getUser().then(() => {
                getUserMsg().then(res => {
                  // let data = res.result.user;
                  this.loading = false;
                  let data = res.result.user;
                  let deptId = '';
                  // if (data.deptCode) {
                  //   this.deptName = data.deptName;
                  //   deptId = data.deptCode;
                  // } else {
                  //   this.deptName = '';
                  //   deptId = '';
                  // }
                  if (data.deptName) {
                    this.deptName = data.deptName;
                    deptId = data.deptId;
                  } else {
                    this.deptName = '';
                    deptId = '';
                  }
                  let params = {
                    access_token: response.result.access_token,
                    username: data.username,
                    name: data.name,
                    password: Util.encrypt(this.loginForm.password),
                    id: data.id,
                    roles: data.roles,
                    deptName: this.deptName,
                    deptId: deptId,
                    areaCodes: res.districts ? res.districts.toString() : '',
                    groupId: res.result.groupId,
                    departmentCode: res.departmentCode ? res.departmentCode.toString() : ''
                  };
                  // loginInfo
                  Auth.setUserInfo(params);
                  if (!res.result.resourceSigns || res.result.resourceSigns.length == 0) {
                    this.$message({
                      type: 'error',
                      message: '该用户没有权限',
                      duration: 4000,
                      showClose: true
                    });
                    return;
                  }
                  Global.init().then(res => {
                    if (Global.isPopUp()) {
                      this.getNeedOpenWindows().then((resu) => {
                        // 解决窗口打开顺序的问题  默认 primary: true 窗口最前的位置
                        Util.openWindows(resu);
                        setTimeout(() => {
                          if (Util.isInstalledChromeExtension()) {
                            let primaryWin = Global.getPrimaryWindow();
                            // 将主屏显示在最上层
                            Util.switchWindow(primaryWin.windowId, false, undefined, true);
                          }
                          this.closeWin();
                          // Util.closeCurrentTab();
                        }, 600);
                      });
                    } else {
                      let windows = Global.getWindows();
                      if (windows.length > 0) {
                        location.href = windows[0].url;
                      }
                    }
                  });
                }).catch((resp) => {
                  this.$message({
                    type: 'error',
                    message: (resp.message || '获取用户信息失败'),
                    duration: 4000,
                    showClose: true
                  });
                  this.loading = false;
                });
              });
            } else {
              this.loading = false;
              // this.$alert('无效的用户信息！', '警告', {
              //   confirmButtonText: '确定',
              //   callback: action => {
              //   }
              // });
            }
          }).catch((res) => {
            this.loading = false;
            let message = res;
            if (typeof res === 'object') {
              message = res.message;
            }
            if (~message.indexOf('feign.FeignException: Premature EOF reading')) {
              message = '统一权限服务:登录失败';
            }
            if (!message) {
              message = '登录失败';
            }
            this.$message({
              type: 'error',
              message: message,
              duration: 4000,
              showClose: true
            });
          });
        } else {
          this.errorMsg = '用户名或密码不能为空';
        }
      }, 100);
    },
    closeWin() {
      if (Global.isPopUp()) {
        // if(Util.isInstalledChromeExtension()){
        //   Util.closeCurrentTab();
        // }
        window.location.href = 'about:blank';

        window.close();
      }
    },
    // 获取参数配置的结果
    getSysConfigInfo(key, callback) {
      let param = {
        key
      };
      findSysByConfType(param).then(res => {
        if (res.result) {
          typeof callback == 'function' && callback(res.result);
        }
      }).catch(err => {
        if (err) {
          console.log('err', '>>>> 获取配置错误');
        }
      });
    }
  },
  created() {
    this.getTitleConfig();
    let loginForm = Auth.getUserInfo();
    this.rememberUser = Auth.getRememberUser();
    if (this.rememberUser && loginForm) {
      this.loginForm.username = loginForm.username;
      this.loginForm.password = Util.decrypt(loginForm.password);
    }
    if (Util.isOpenedWindow()) {
      this.isLogined = false;
    } else {
      postMessage(Constants.EVENT_BUS_CODE_CHECK_LOGINED, { status: true });
      onMessage(Constants.EVENT_BUS_CODE_CHECK_LOGINED_CALLBACK, (data) => {
        this.isLogined = true;
        this.closeWin();
      });
    }

    let callbackCount = 0;
    onMessage(Constants.EVENT_BUS_CODE_CLOSE_LOGIN_WIN, () => {
      callbackCount++;
      console.log('callbackCount>>>', callbackCount);
      if (callbackCount >= Global.getWindows().length) {
        this.closeWin();
      }
    });
    this.listenOpenedWindow();
    this.sendOpenedWindow();
    // 绑定enter键登陆
    document.onkeydown = (event) => {
      let e = event || window.event;
      if (e && e.keyCode == 13) {
        this.userLogin();
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLogined = false;
    }, 1200);
  }
};
