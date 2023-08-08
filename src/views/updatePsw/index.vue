<template>
    <div class="update-psw">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="form-sec">
            <el-form-item label="当前密码" prop="passWd">
                <el-input v-model="ruleForm.passWd"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassWd">
                <el-input v-model="ruleForm.newPassWd"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassWd">
                <el-input v-model="ruleForm.confirmPassWd"></el-input>
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
import { mapGetters } from "vuex";

export default {
    name: "UpdatePsw",
    data() {
        var validateConfirmPassWd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入新密码'));
            } else if (value !== this.ruleForm.newPassWd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                passWd: '',
                newPassWd: '',
                confirmPassWd: '',
            },
            rules: {
                passWd: [
                    { required: true, message: '请输入当前密码', trigger: 'blur' },
                ],
                newPassWd: [
                    { required: true, message: '请输入新密码', trigger: 'change' }
                ],
                confirmPassWd: [
                    { required: true, validator: validateConfirmPassWd, trigger: 'change' }
                ],
            }
        };
    },
    computed: {
        ...mapGetters(["userInfo"]),
        userId() {
            const { userId = '' } = this.userInfo || {};
            return userId;
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$api.user.userModPassWd({ ...this.ruleForm, userId: this.userId }).then(() => {
                        this.$message({
                            message: '更新密码成功！',
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
.update-psw {
    padding: 40px 15px;

    .form-sec {
        width: 500px;
        margin: 0 auto;
    }
}
</style>
  
  