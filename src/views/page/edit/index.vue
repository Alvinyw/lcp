<template>
    <div class="page-edit">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="form-sec">
            <el-form-item label="渠道" prop="channelId">
                <el-select v-model="ruleForm.channelId" disabled placeholder="请选择渠道">
                    <el-option v-for="item in channelMap" :key="item.channelId" :label="item.channelName"
                        :value="item.channelId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="系统" prop="moduleId">
                <el-select v-model="ruleForm.moduleId" disabled placeholder="请选择系统">
                    <el-option v-for="item in systemMap" :key="item.moduleId" :label="item.moduleName"
                        :value="item.moduleId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="页面名称" prop="pageName">
                <el-input v-model="ruleForm.pageName"></el-input>
            </el-form-item>
            <el-form-item label="页面状态" prop="pageStatus">
                <el-switch v-model="ruleForm.pageStatus"></el-switch>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
                <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
                <el-button @click="$router.go(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

export default {
    name: "PageEdit",
    data() {
        return {
            ruleForm: {
                pageName: '',
                pageStatus: true,
                remarks: '',
            },
            channelMap: [],
            systemMap: [],
            rules: {
                pageName: [
                    { required: true, message: '请输入页面名称', trigger: 'blur' },
                ],
            }
        };
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
        this.resetForm();
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$api.app.pageInfoTableUpdateById(this.ruleForm).then(() => {
                        this.$message({
                            message: '更新页面信息成功！',
                            type: 'success'
                        });
                    });
                }
            });
        },
        resetForm() {
            const { pageInfo = '{}' } = this.$router.currentRoute.query;
            const { pageStatus = '' } = JSON.parse(pageInfo);
            this.ruleForm = { ...this.ruleForm, ...JSON.parse(pageInfo), pageStatus: pageStatus.includes('true') }
        }
    }
}
</script>
<style lang="scss" scoped>
.page-edit {
    padding: 40px 15px;

    .form-sec {
        width: 500px;
        margin: 0 auto;
    }
}
</style>
  
  