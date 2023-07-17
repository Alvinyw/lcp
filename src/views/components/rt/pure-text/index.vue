<template>
    <el-row class="pure-img">
        <p class="com-nm">文本</p>
        <el-collapse :value="['1', '2']">
            <el-collapse-item title="样式设置" name="1">
                <el-row class="com-wrapper">
                    <el-form label-position="left" :model="obj" label-width="100px">
                        <el-form-item label="文本">
                            <el-input v-model="obj.text"></el-input>
                        </el-form-item>
                        <el-form-item label="字体大小">
                            <el-input v-model="obj.fontSize"><template slot="append">px</template></el-input>
                        </el-form-item>
                        <el-form-item label="字体颜色">
                            <el-color-picker v-model="obj.color" show-alpha></el-color-picker>
                        </el-form-item>
                    </el-form>
                </el-row>
            </el-collapse-item>
            <el-collapse-item title="表单校验" name="2">
                <el-row class="com-wrapper">
                    <el-form label-position="left" :model="obj" label-width="100px">
                        <el-form-item label="是否必填">
                            <el-checkbox v-model="obj.required"></el-checkbox>
                        </el-form-item>
                        <el-form-item label="类型校验">
                            <el-select v-model="obj.type" clearable placeholder="类型校验">
                                <el-option v-for="item in typeAry" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="错误提示">
                            <el-input v-model="obj.tipText"></el-input>
                        </el-form-item>
                        <el-form-item label="最小字符长度">
                            <el-input v-model="obj.lenMin"></el-input>
                        </el-form-item>
                        <el-form-item label="最大字符长度">
                            <el-input v-model="obj.lenMax"></el-input>
                        </el-form-item>
                        <el-form-item label="正则表达式">
                            <el-input v-model="obj.regTest"></el-input>
                        </el-form-item>
                    </el-form>
                </el-row>
            </el-collapse-item>
        </el-collapse>
    </el-row>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    name: "PureText",
    props: {
        options: {
            type: Object,
            required: false,
            default: () => ({
                property: {},
                value: ''
            }),
        },
    },
    data() {
        return {
            obj: {},
            typeAry: [{
                value: '1',
                label: '正整数'
            }, {
                value: '2',
                label: '手机号码'
            }, {
                value: '3',
                label: '邮箱'
            }, {
                value: '4',
                label: '网址'
            }],
        }
    },
    computed: {
        ...mapGetters(["templateInfo", "selectedIndex"]),
    },
    watch: {
        obj: {
            handler(newVal) {
                const { pageLayout = {} } = this.templateInfo;
                pageLayout.forEach((item, index) => {
                    if (index == this.selectedIndex) item.property = { ...newVal };
                });
                this.$store.dispatch("app/updateTemplateInfo", { ...this.templateInfo, pageLayout });
            },
            deep: true
        },
    },
    mounted() {
        const { property = {} } = this.options || {};
        this.obj = Object.assign({}, this.obj, { ...property })
    },
};
</script>

<style lang="less">
.pure-img {}
</style>