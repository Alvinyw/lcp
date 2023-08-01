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
        <el-select v-model="queryParame.userType" placeholder="请选择角色">
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
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="userName" label="姓名">
      </el-table-column>
      <el-table-column prop="userType" label="角色">
      </el-table-column>
      <el-table-column prop="channelAuth" label="渠道权限">
      </el-table-column>
      <el-table-column prop="templateUseAuth" label="模版应用权限">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        userType: '',
        userName: ''
      },
      tableData: [
      ]
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
    this.onQuery();
  },
  methods: {
    onQuery() {
      this.$api.app.userInfoTableSelectAll({
      }).then(res => {
        const { data = {} } = res || {};
        const { list = [] } = data;
        this.tableData = list;
      });
    },
    onAdd() {
      this.$router.push({ name: 'UserAdd' })
    },
    handleClick(row) {
      console.log(row);
    }
  }
}
</script>
<style lang="scss" scoped>
.user-manage {
  padding: 15px;
}
</style>
  