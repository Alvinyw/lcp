<template>
    <div class="system-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="form-sec">
            <el-form-item label="渠道" prop="channelId">
                <el-select v-model="ruleForm.channelId" clearable placeholder="请选择渠道">
                    <el-option v-for="item in channelMap" :key="item.channelId" :label="item.channelName"
                        :value="item.channelId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模块名称" prop="moduleName">
                <el-input v-model="ruleForm.moduleName"></el-input>
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
    name: "SystemAdd",
    data() {
        return {
            channelMap: [],
            ruleForm: {
                channelId: '',
                moduleName: '',
                remarks: '',
            },
            rules: {
                channelId: [
                    { required: true, message: '请选择渠道', trigger: 'change' },
                ],
                moduleName: [
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
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$api.app.moduleInfoTableInsert(this.ruleForm).then(() => {
                        this.$message({
                            message: '新增系统成功！',
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
.system-add {
    padding: 40px 15px;

    .form-sec {
        width: 500px;
        margin: 0 auto;
    }
}
</style>
  
  