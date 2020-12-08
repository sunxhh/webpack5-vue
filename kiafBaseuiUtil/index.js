import Global from './global';
import Auth from './auth';
import Util from './util';

export default {
  methods: {
    ...Global,
    ...Auth,
    ...Util
  }
};
