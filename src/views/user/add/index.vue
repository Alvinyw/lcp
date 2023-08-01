<template>
    <div class="user-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="form-sec">
            <el-form-item label="用户名称" prop="userName">
                <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="用户角色" prop="userType">
                <el-select v-model="ruleForm.userType" placeholder="请选择用户角色">
                    <el-option v-for="item in userRoleAry" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="渠道权限" prop="channelAuthArr">
                <el-select v-model="ruleForm.channelAuthArr" multiple placeholder="请选择">
                    <el-option v-for="item in channelMap" :key="item.channelId" :label="item.channelName"
                        :value="item.channelId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模版应用权限" prop="templateUseAuth" :required="false">
                <el-switch v-model="ruleForm.templateUseAuth"></el-switch>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
                <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import { userType, userTypeMap } from "@/const/systemType";

export default {
    data() {
        return {
            ruleForm: {
                userName: '',
                userType: '',
                channelAuthArr: [],
                templateUseAuth: true,
                remarks: '',
            },
            rules: {
                userName: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                ],
                userType: [
                    { required: true, message: '请选择用户角色', trigger: 'change' }
                ],
                channelAuthArr: [
                    { required: true, message: '请选择渠道权限', trigger: 'change' }
                ],
            }
        };
    },
    computed: {
        ...mapGetters(["userInfo"]),
        userRoleAry() {
            const { userType: _userType = '' } = this.userInfo || {};
            let res = [];
            switch (_userType) {
                case userType.PLATFORM_ADMIN:
                    res = userTypeMap.filter(i => i.value !== _userType)
                    break;
                case userType.CHANNEL_ADMIN:
                    res = userTypeMap.filter(i => i.value == userType.COMMON_USER)
                    break;

                default:
                    break;
            }
            return res;
        },
        channelMap() {
            const { channelList = [] } = this.userInfo || {};
            return channelList;
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('=========this.ruleForm=========', this.ruleForm)
                    this.$api.app.userInfoTableInsert(this.ruleForm).then(() => {
                        this.$message({
                            message: '新增用户成功！',
                            type: 'success'
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
.user-add {
    padding: 40px 15px;

    .form-sec {
        width: 500px;
        margin: 0 auto;
    }
}
</style>
  
  