<template>
    <div class="user-edit">
        <el-form :model="userInfoForm" :rules="rules" ref="userInfoForm" label-width="150px" class="form-sec">
            <el-form-item label="用户名称" prop="userName">
                <el-input v-model="userInfoForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="用户角色" prop="userType">
                <el-select v-model="userInfoForm.userType" placeholder="请选择用户角色">
                    <el-option v-for="item in userRoleAry" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="渠道权限" prop="channelAuthArr">
                <el-select v-model="userInfoForm.channelAuthArr" multiple placeholder="请选择">
                    <el-option v-for="item in channelMap" :key="item.channelId" :label="item.channelName"
                        :value="item.channelId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户状态" prop="userStatus">
                <el-switch v-model="userInfoForm.userStatus"></el-switch>
            </el-form-item>
            <el-form-item label="模版应用权限" prop="templateUseAuth" :required="false">
                <el-switch v-model="userInfoForm.templateUseAuth"></el-switch>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
                <el-input type="textarea" v-model="userInfoForm.remarks"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('userInfoForm')">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
                <el-button @click="$router.go(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import { userType, userTypeMap } from "@/const/systemType";

export default {
    name: "UserEdit",
    data() {
        return {
            userInfoForm: {
                userName: '',
                userType: '',
                channelAuthArr: [],
                userStatus: true,
                templateUseAuth: true,
                remarks: '',
            },
            defaultInfo: {},
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
    mounted() {
        this.resetForm();
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('=========this.userInfoForm=========', this.userInfoForm)
                    this.$api.app.userInfoTableUpdateById(this.userInfoForm).then(() => {
                        this.$message({
                            message: '更新用户信息成功！',
                            type: 'success'
                        });
                    });
                }
            });
        },
        resetForm() {
            const { userInfo = '{}' } = this.$router.currentRoute.query;
            const { templateUseAuth = '', userStatus = '' } = JSON.parse(userInfo);
            this.userInfoForm = { ...this.userInfoForm, ...JSON.parse(userInfo), templateUseAuth: !!templateUseAuth, userStatus: !!userStatus }
        }
    }
}
</script>
<style lang="scss" scoped>
.user-edit {
    padding: 40px 15px;

    .form-sec {
        width: 500px;
        margin: 0 auto;
    }
}
</style>
  
  