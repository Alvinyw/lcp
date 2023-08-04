<template>
    <div class="page-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="form-sec">
            <el-form-item label="渠道" prop="channelId">
                <el-select v-model="ruleForm.channelId" clearable placeholder="请选择渠道">
                    <el-option v-for="item in channelMap" :key="item.channelId" :label="item.channelName"
                        :value="item.channelId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="系统" prop="moduleId">
                <el-select v-model="ruleForm.moduleId" clearable placeholder="请选择系统">
                    <el-option v-for="item in systemMap" :key="item.moduleId" :label="item.moduleName"
                        :value="item.moduleId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="页面名称" prop="pageName">
                <el-input v-model="ruleForm.pageName"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
                <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button @click="$router.go(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

export default {
    name: "PageAdd",
    data() {
        return {
            ruleForm: {
                channelId: '',
                moduleId: '',
                pageName: '',
                remarks: '',
            },
            channelMap: [],
            systemMap: [],
            rules: {
                channelId: [
                    { required: true, message: '请选择渠道', trigger: 'change' },
                ],
                moduleId: [
                    { required: true, message: '请选择系统', trigger: 'change' },
                ],
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
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$api.app.pageInfoTableInsert(this.ruleForm).then(() => {
                        this.$message({
                            message: '新增页面成功！',
                            type: 'success'
                        });
                    }).catch(err => {
                        this.$message({
                            message: err,
                            type: 'error'
                        });
                    });
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style lang="scss" scoped>
.page-add {
    padding: 40px 15px;

    .form-sec {
        width: 500px;
        margin: 0 auto;
    }
}
</style>
  
  