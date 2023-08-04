<template>
    <div class="system-edit">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="form-sec">
            <el-form-item label="渠道" prop="channelId">
                <el-select v-model="ruleForm.channelId" clearable placeholder="请选择渠道" disabled>
                    <el-option v-for="item in channelMap" :key="item.channelId" :label="item.channelName"
                        :value="item.channelId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="系统名称" prop="moduleName">
                <el-input v-model="ruleForm.moduleName"></el-input>
            </el-form-item>
            <el-form-item label="系统状态" prop="moduleStatus">
                <el-switch v-model="ruleForm.moduleStatus"></el-switch>
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
    name: "SystemEdit",
    data() {
        return {
            channelMap: [],
            ruleForm: {
                moduleName: '',
                moduleStatus: true,
                remarks: '',
            },
            rules: {
                moduleName: [
                    { required: true, message: '请输入系统名称', trigger: 'blur' },
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
        this.resetForm();
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$api.app.moduleInfoTableUpdateById(this.ruleForm).then(() => {
                        this.$message({
                            message: '更新系统信息成功！',
                            type: 'success'
                        });
                    });
                }
            });
        },
        resetForm() {
            const { systemInfo = '{}' } = this.$router.currentRoute.query;
            const { moduleStatus = '' } = JSON.parse(systemInfo);
            this.ruleForm = { ...this.ruleForm, ...JSON.parse(systemInfo), moduleStatus: moduleStatus.includes('true') }
        }
    }
}
</script>
<style lang="scss" scoped>
.system-edit {
    padding: 40px 15px;

    .form-sec {
        width: 500px;
        margin: 0 auto;
    }
}
</style>
  
  