<template>
    <div class="page-manage">
        <el-form :inline="true" :model="queryParame" class="demo-form-inline">
            <el-form-item label="渠道">
                <el-select v-model="queryParame.channelId" clearable placeholder="请选择渠道">
                    <el-option v-for="item in channelMap" :key="item.channelId" :label="item.channelName"
                        :value="item.channelId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="系统">
                <el-select v-model="queryParame.moduleId" clearable placeholder="请选择系统">
                    <el-option v-for="item in systemMap" :key="item.moduleId" :label="item.moduleName"
                        :value="item.moduleId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onQuery">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="pageName" label="页面名称">
            </el-table-column>
            <el-table-column prop="channelId" label="所属渠道">
                <template slot-scope="scope">
                    {{ filterChannelName(scope.row.channelId) }}
                </template>
            </el-table-column>
            <el-table-column prop="moduleId" label="所属系统">
                <template slot-scope="scope">
                    {{ filterModuleName(scope.row.moduleId) }}
                </template>
            </el-table-column>
            <el-table-column prop="pageStatus" label="页面状态">
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
    name: "PageManage",
    data() {
        return {
            queryParame: {
                channelId: '',
                moduleId: '',
            },
            channelMap: [],
            systemMap: [],
            tableData: [
            ],
        }
    },
    mounted() {
        this.$api.app.channelInfoTableSelectList().then(res => {
            const { data = {} } = res || {};
            const { list = [] } = data;
            this.channelMap = list;
        });
        this.$api.app.moduleInfoTableSelectList().then(res => {
            const { data = {} } = res || {};
            const { list = [] } = data;
            this.systemMap = list;
        });
        this.onQuery();
    },
    methods: {
        filterChannelName(id = '') {
            const cl = this.channelMap.filter(i => i.channelId == id)[0]
            return cl ? cl.channelName : '--';
        },
        filterModuleName(id = '') {
            const ml = this.systemMap.filter(i => i.moduleId == id)[0]
            return ml ? ml.moduleName : '--';
        },
        onQuery() {
            this.$api.app.pageInfoTableSelectList(this.queryParame).then(res => {
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
            this.$router.push({ name: 'PageAdd' })
        },
        onEdit(row) {
            this.$router.push({ name: 'PageEdit', query: { pageInfo: JSON.stringify(row) }, })
        }
    }
}
</script>
<style lang="scss" scoped>
.page-manage {
    padding: 20px;

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
    