import axios from '@kd-components/kiaf-baseui/utils/ajax/config';
import Constants from './constants';

let systemInfo = {};

systemInfo.setCustomConfig = function (value) {
  try {
    if (!value) {
      value = {};
    }
    localStorage.setItem(Constants.EVENT_CODE.systemInfo, JSON.stringify(value));
  } catch (e) {}
};

systemInfo.getRootUrl = function () {
  let pathname = location.pathname.split('/');
  pathname.splice(pathname.length - 1, 1);
  let str = pathname.join('/');
  return location.protocol + '//' + location.host + str;
};

systemInfo.init = function () {
  return new Promise((resolve, reject) => {
    axios.get(this.getRootUrl() + '/static/config/systemInfo.json').then((res) => {
      let params = res.data;
      if (params['SYSTEM_CONFIG']) {
        this.setCustomConfig(params['SYSTEM_CONFIG']);
      }
      resolve(true);
    }).catch((err) => {
      console.error('systemTitle init err', err);
      reject(true);
    });
  });
};

systemInfo.getCustomConfig = function () {
  let result = {};
  try {
    result = JSON.parse(localStorage.getItem(Constants.EVENT_CODE.systemInfo));
    if (!result) {
      result = {};
    }
  } catch (e) {
    console.error('systemTitle init err', e);
  }
  return result;
};

export default systemInfo;
