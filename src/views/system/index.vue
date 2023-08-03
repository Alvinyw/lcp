<template>
    <div class="system-manage">
        <el-form :inline="true" :model="queryParame" class="demo-form-inline">
            <el-form-item label="渠道">
                <el-select v-model="queryParame.channelId" clearable placeholder="请选择渠道" @change="onChannelChange">
                    <el-option v-for="item in channelMap" :key="item.channelId" :label="item.channelName" :value="item.channelId">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="channelId" label="渠道ID">
            </el-table-column>
            <el-table-column prop="channelName" label="渠道名称">
            </el-table-column>
            <el-table-column prop="channelStatus" label="渠道状态">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
                <template slot-scope="scope">
                    {{ $lib.getYYMMDD(scope.row.createTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="remarks" label="备注">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="onEdit(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="btm-sec">
            <el-button type="primary" @click="onAdd">新增</el-button>
            <el-button @click="$router.go(-1)">返回</el-button>
        </div>
    </div>
</template>
<script>

export default {
    name: "SystemManage",
    data() {
        return {
            queryParame: {
                channelId: '',
            },
            tableData: [
            ],
            channelMap: []
        }
    },
    mounted() {
        this.$api.app.channelInfoTableSelectList().then(res => {
            const { data = {} } = res || {};
            const { list = [] } = data;
            this.channelMap = list;
        });
    },
    methods: {
        onChannelChange(val) {
            this.queryParame.channelId = val;
            this.onQuery();
        },
        onQuery() {
            this.$api.app.moduleInfoTableSelectList(this.queryParame).then(res => {
                const { data = {} } = res || {};
                const { list = [] } = data;
                this.tableData = list;
            }).catch(err => {
                this.$message({
                    message: err,
                    type: 'error'
                });
            });
        },
        onAdd() {
            this.$router.push({ name: 'SystemAdd' })
        },
        onEdit(row) {
            this.$router.push({ name: 'SystemEdit', query: { pageInfo: JSON.stringify(row) }, })
        }
    }
}
</script>
<style lang="scss" scoped>
.system-manage {
    padding: 15px;

    .tl {
        font-size: 16px;
        font-weight: bold;
        margin: 0 0 10px;
    }

    .btm-sec {
        padding: 15px 0 0;
        text-align: center;
    }
}
</style>
    