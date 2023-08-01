<template>
  <div class="user-manage">
    <el-form :inline="true" :model="queryParame" class="demo-form-inline">
      <el-form-item label="渠道">
        <el-select v-model="queryParame.channel" placeholder="请选择渠道">
          <el-option v-for="item in channelMap" :key="item.channelId" :label="item.channelName" :value="item.channelId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="queryParame.role" placeholder="请选择角色">
          <el-option v-for="item in userTypeMap" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名" v-model="queryParame.userName" clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQuery">查询</el-button>
        <el-button type="primary" @click="onAdd">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { userTypeMap } from "@/const/systemType";

export default {
  name: "UserManageIndex",
  data() {
    return {
      userTypeMap,
      queryParame: {
        channel: '',
        role: '',
        userName: ''
      },
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
    channelMap() {
      const { channelList = [] } = this.userInfo || {};
      return channelList;
    }
  },
  mounted() {
    
  },
  methods: {
    onQuery() { },
    onAdd() { 
      this.$router.push({ name: 'UserAdd' })
    },
  }
}
</script>
<style lang="scss" scoped>
.user-manage {
  padding: 15px;
}
</style>
  