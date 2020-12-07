import axios from '@kd-components/avcs-ajax';
// 启用加密
// const sha256 = require("js-sha256").sha256;

export const userLogin = (params) => {
  params = {
    ...params
  };
  console.log('params.password', params.password);
  // params.password = sha256(params.password);
  return axios.avcsAjax('/oauth2/password', 'post', params, true, true, undefined, undefined, {
    nonuse: true,
    headers: {
      'Content-SHA-256': false
    }
  });
};

// 请求主标题
export const getMainTitle = () => {
  return axios.avcsAjax('/paramconfig-server/api/getLoginMainTitle', 'get', {}, undefined, undefined, undefined, undefined, {
    nonuse: true
  });
};

// 请求副标题
export const getSubTitle = () => {
  return axios.avcsAjax('/paramconfig-server/api/getLoginSubTitle', 'get', {}, undefined, undefined, undefined, undefined, {
    nonuse: true
  });
};

// 请求登录logo
export const getMainLogo = () => {
  return axios.avcsAjax('/paramconfig-server/api/getLoginLogo', 'get', {}, undefined, undefined, undefined, undefined, {
    nonuse: true
  });
};

export const clientByUsername = (username) => {
  return axios.avcsAjax('/oauth2/client_by_username', 'post', { username }, true, true, undefined, undefined, {
    nonuse: true
  });
};

/**
 * @name getUserMsg
 *
 */
export const getUserMsg = (params) => {
  // 新接口
  return axios.avcsAjax('/authority/me', 'get', params);
};

export const getToken = () => {
  return axios.avcsAjax('/oauth2/token', 'get', {}, false, true, undefined, undefined, {
    nonuse: true
  });
};

export const getTokenWithJwt = () => {
  return axios.avcsAjax('/oauth2/token', 'get', {}, false, true);
};

// 获取配置
export const findSysConfByConfig = (key) => {
  return axios.avcsAjax(`/paramconfig-server/api/public/findSysConfByConfType?confKey=${key}`, 'get', '', false, false, undefined, undefined, {
    nonuse: true
  });
};
