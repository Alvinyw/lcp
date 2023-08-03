<template>
  <el-container class="page-layout" style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px">
      <el-menu :default-openeds="['1']">
        <el-menu-item index="1" @click="goToPage('TemplateIndex')">
          <i class="el-icon-menu"></i>
          <span slot="title">页面模版</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-star-off"></i>
            <span>团队管理</span>
          </template>
          <el-menu-item index="2-1" @click="goToPage('ChannelManage')">渠道管理</el-menu-item>
          <el-menu-item index="2-2" @click="goToPage('SystemManage')">系统管理</el-menu-item>
          <el-menu-item index="2-3" @click="goToPage('PageManage')">页面管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" @click="goToPage('UserManageIndex')">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="4" @click="goToPage('OperationRecord')">
          <i class="el-icon-setting"></i>
          <span slot="title">操作记录</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <span class="page-name">{{ pageName }}</span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ showName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">修改密码</el-dropdown-item>
            <el-dropdown-item command="2">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Layout",
  components: {
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.path;
    },
    pageName() {
      const { name = "" } = this.$route.meta || {};
      return name;
    },
    showName() {
      const { userName = "", userTypeExp = "" } = this.userInfo || {};
      return userName + ' - ' + userTypeExp;
    }
  },
  methods: {
    goToPage(pageName) {
      const { name = "" } = this.$route || {};
      if (name == pageName) return;
      this.$router.push({ name: pageName })
    },
    onLogOut() {
      this.$api.app.userLoginOutLowCode().then(() => {
        this.$router.push({ name: 'Login' })
        this.$message({
          message: '退出登录！',
          type: 'success'
        });
      });
    },
    handleCommand(command) {
      switch (Number(command)) {
        case 1:
          this.$router.push({ name: 'UpdatePsw' })
          break;
        case 2:
          this.onLogOut();
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page-layout {
  .el-header {
    background-color: #fdfdfd;
    line-height: 60px;
    border-bottom: 1px solid #aaa;
    box-shadow: #eee 5px 5px 8px 6px;
    display: flex;
    justify-content: space-between;

    .page-name {

      font-size: 16px;
    }
  }

  .el-aside {
    color: #aaa;
    background-color: #fff;
    border-right: solid 1px #aaa;

    .el-menu {
      border: none;
    }
  }
}
</style>
