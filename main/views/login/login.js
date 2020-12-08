export default {
  name: 'loginPage',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    usernameFocus() {
      this.$refs.username.focus();
    },
    passwordFocus() {
      this.$refs.password.focus();
    },
    async userLogin() {

    }
  },
  created() {

  },
  mounted() {}
};
