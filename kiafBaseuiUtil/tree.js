import axios from '@kd-components/kiaf-baseui/utils/ajax/config';
import Constants from 'utils/constants';
let tree = {};
tree.setCustomConfig = function (value) {
  try {
    if (!value) {
      value = {};
    }
    localStorage.setItem(Constants.EVENT_CODE.treeCustomCofig, JSON.stringify(value));
  } catch (e) {}
};
tree.getRootUrl = function () {
  let pathname = location.pathname.split('/');
  pathname.splice(pathname.length - 1, 1);
  let str = pathname.join('/');
  return location.protocol + '//' + location.host + str;
};
tree.init = function () {
  return new Promise((resolve, reject) => {
    axios.get(this.getRootUrl() + '/static/config/tree.json').then((res) => {
      let params = res.data;
      if (params['CUSTOM_CONFIG']) {
        this.setCustomConfig(params['CUSTOM_CONFIG']);
      }
      resolve(true);
    }).catch((err) => {
      console.error('tree init err', err);
      reject(true);
    });
  });
};
tree.getCustomConfig = function () {
  let result = {};
  try {
    result = JSON.parse(localStorage.getItem(Constants.EVENT_CODE.treeCustomCofig));
    if (!result) {
      result = {};
    }
  } catch (e) {
    console.error('tree init err', e);
  }
  return result;
};
export default tree;
