<template>
    <div class="channel-edit">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="form-sec">
            <el-form-item label="渠道名称" prop="channelName">
                <el-input v-model="ruleForm.channelName"></el-input>
            </el-form-item>
            <el-form-item label="渠道状态" prop="channelStatus">
                <el-switch v-model="ruleForm.channelStatus"></el-switch>
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
    name: "ChannelEdit",
    data() {
        return {
            ruleForm: {
                channelName: '',
                channelStatus: true,
                remarks: '',
            },
            rules: {
                channelName: [
                    { required: true, message: '请输入渠道名称', trigger: 'blur' },
                ],
            }
        };
    },
    mounted() {
        this.resetForm();
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$api.app.channelInfoTableUpdateById(this.ruleForm).then(() => {
                        this.$message({
                            message: '更新渠道信息成功！',
                            type: 'success'
                        });
                    });
                }
            });
        },
        resetForm() {
            const { channelInfo = '{}' } = this.$router.currentRoute.query;
            const { channelStatus = '' } = JSON.parse(channelInfo);
            this.ruleForm = { ...this.ruleForm, ...JSON.parse(channelInfo), channelStatus: channelStatus.includes('true') }
        }
    }
}
</script>
<style lang="scss" scoped>
.channel-edit {
    padding: 40px 15px;

    .form-sec {
        width: 500px;
        margin: 0 auto;
    }
}
</style>
  
  