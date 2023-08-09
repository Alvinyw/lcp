<template>
    <div class="operation-record">
        <el-form :inline="true" :model="queryParame" class="demo-form-inline">
            <el-form-item label="用户名">
                <el-input placeholder="请输入用户名" v-model="queryParame.userName" clearable>
                </el-input>
            </el-form-item>
            <el-form-item label="交易日期">
                <el-date-picker v-model="queryParame.transDate" type="date" placeholder="请选择交易日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onQuery">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="seqNo" label="流水号">
            </el-table-column>
            <el-table-column prop="userName" label="用户名称">
            </el-table-column>
            <el-table-column prop="templateId" label="模板编号">
            </el-table-column>
            <el-table-column prop="templateName" label="模板名称">
            </el-table-column>
            <el-table-column prop="serviceUrl" label="服务ID">
            </el-table-column>
            <el-table-column prop="serviceDesc" label="服务名称">
            </el-table-column>
            <el-table-column prop="createTime" label="操作日期">
                <template slot-scope="scope">
                    {{ $lib.getYYMMDD(scope.row.transDate) }}
                </template>
            </el-table-column>
            <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column> -->
        </el-table>
    </div>
</template>
<script>

export default {
    name: "OperationRecord",
    data() {
        return {
            queryParame: {
                userName: '',
                transDate: '',
            },
            tableData: [
            ],
        }
    },
    mounted() {
        this.onQuery();
    },
    methods: {
        onQuery() {
            this.$api.app.templateLogTableSelectAll(this.queryParame).then(res => {
                const { data = {} } = res || {};
                const { list = [] } = data;
                this.tableData = list;
            });
        },
    }
}
</script>
<style lang="scss" scoped>
.operation-record {
    padding: 15px;
}
</style>
    