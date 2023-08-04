<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="userId">
        <el-input prefix-icon="el-icon-user" ref="userId" v-model="loginForm.userId" placeholder="账号" name="userId"
          type="text"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-lock" ref="password" v-model="loginForm.password" placeholder="密码" name="password"
          type="password"></el-input>
      </el-form-item>
      <div class="submit-container">
        <el-button :loading="loading" class="submit" type="primary" @click="doLogin">登录</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { setToken } from '../../utils/cookies'
export default {
  name: "login",
  data() {
    const validateUserId = (rule, value, callback) => {
      if (!value) {
        callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        userId: "",
        password: "",
      },
      loginRules: {
        userId: {
          require: true,
          trigger: "blur",
          validator: validateUserId,
        },
        password: {
          require: true,
          trigger: "blur",
          validator: validatePassword,
        },
      },
      loading: false,
    };
  },
  methods: {
    doLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let params = {
            userId: this.loginForm.userId,
            passWd: this.loginForm.password
          }
          this.$api.user
            .login(params)
            .then((res) => {
              if (res != null) {
                setToken(res.data.token);
                const { data = {} } = res || {};
                this.$store.dispatch("user/updateUserInfo", data);
                this.$router.push({ path: "/" });
                this.loading = false;
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  background: url("../../assets/images/bg_login.jpeg") no-repeat;
  background-size: cover;

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 300px;
    width: 400px;
    margin: -300px 0 0 -200px;

    .title-container {
      text-align: center;
    }

    .submit-container {
      display: flex;
      justify-content: center;

      .submit {
        width: 100%;
      }
    }
  }
}
</style>