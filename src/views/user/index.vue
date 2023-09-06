<template>
  <div class="user-manage">
    <el-form :inline="true" :model="queryParame" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名" v-model="queryParame.userName" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="queryParame.userType" clearable placeholder="请选择角色">
          <el-option v-for="item in userTypeMap" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="queryParame.userStatus" clearable placeholder="请选择状态">
          <el-option label="启用" :value="true">
          </el-option>
          <el-option label="停用" :value="false">
          </el-option>
        </el-select>
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
        <template slot-scope="scope">
          {{ scope.row.userType ? userTypeMap.filter(i => i.value == scope.row.userType)[0].name : '--' }}
        </template>
      </el-table-column>
      <el-table-column prop="channelAuthArr" label="渠道权限">
        <template slot-scope="scope">
          {{ formateChannelStr(scope.row.channelAuthArr) }}
        </template>
      </el-table-column>
      <el-table-column prop="templateUseAuth" label="模版应用权限">
      </el-table-column>
      <el-table-column prop="userStatus" label="用户状态">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          {{ $lib.getYYMMDD(scope.row.createTime) }}
        </template>
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
        userType: null,
        userName: null,
        userStatus: null,
      },
      tableData: [
      ],
      chanMap: {}
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
      this.$api.user.userInfoTableSelectAll(
        this.queryParame
      ).then(res => {
        const { data = {} } = res || {};
        const { list = [], map = {} } = data;
        this.tableData = list;
        this.chanMap = map;
      });
    },
    formateChannelStr(authAry = []) {
      let res = '';
      authAry.forEach(i => {
        res += this.chanMap[i] + ','
      });
      return res;
    },
    onAdd() {
      this.$router.push({ name: 'UserAdd' })
    },
    handleClick(row) {
      this.$router.push({ name: 'UserEdit', query: { userInfo: JSON.stringify(row) }, })
    }
  }
}
</script>
<style lang="scss" scoped>
.user-manage {
  padding: 20px;
}
</style>
  