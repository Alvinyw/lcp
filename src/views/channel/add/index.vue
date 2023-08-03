<template>
    <div class="channel-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="form-sec">
            <el-form-item label="渠道名称" prop="channelName">
                <el-input v-model="ruleForm.channelName"></el-input>
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
    name: "ChannelAdd",
    data() {
        return {
            ruleForm: {
                channelName: '',
                remarks: '',
            },
            rules: {
                channelName: [
                    { required: true, message: '请输入渠道名称', trigger: 'blur' },
                ],
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$api.app.channelInfoTableInsert(this.ruleForm).then(() => {
                        this.$message({
                            message: '新增渠道成功！',
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
.channel-add {
    padding: 40px 15px;

    .form-sec {
        width: 500px;
        margin: 0 auto;
    }
}
</style>
  
  