<template>
    <el-row class="footer-com">
        <p class="com-nm">底部导航</p>
        <el-collapse value="1">
            <el-collapse-item title="样式设置" name="1">
                <el-row class="com-wrapper">
                    <el-form label-position="left" :model="obj" label-width="100px">
                        <div class="sec" v-for="(item, index) in obj.property.list" :key="index">
                            <el-form-item label="图标">
                                <div @click="handleClick(index)">
                                    <el-upload class="upload-demo" action="#" :on-remove="handleRemove"
                                        :on-change="handleAdd" :auto-upload="false" :limit="1" :file-list="item.icon"
                                        list-type="picture">
                                        <el-button size="small" type="primary">添加图标</el-button>
                                    </el-upload>
                                </div>
                            </el-form-item>
                            <el-form-item label="文本">
                                <el-input v-model="item.text"></el-input>
                            </el-form-item>
                            <el-form-item label="链接">
                                <el-select v-model="item.link" clearable placeholder="跳转链接">
                                    <el-option v-for="item in linkAry" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                </el-row>
            </el-collapse-item>

        </el-collapse>
    </el-row>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    name: "FooterNav",
    data() {
        return {
            obj: {
                property: {
                    list: []
                }
            },
            currentIndex: '', // 当前操作项
            linkAry: [{
                value: '1',
                label: '首页'
            }, {
                value: '2',
                label: '个人中心'
            }, {
                value: '3',
                label: '积分中心'
            }, {
                value: '4',
                label: '活动中心'
            }],
        }
    },
    computed: {
        ...mapGetters(["templateInfo"]),
    },
    watch: {
        obj: {
            handler(newVal) {
                this.$store.dispatch("app/updateTemplateInfo", { ...this.templateInfo, footerNav: newVal });
            },
            deep: true
        },
    },
    mounted() {
        const { footerNav = {} } = this.templateInfo;
        this.obj = this.$lib.deepCopy(footerNav);
    },
    methods: {
        handleClick(idx) {
            this.currentIndex = idx;
        },
        async handleAdd(file, fileList) {
            if (file) {
                const _url = await this.$lib.urlToBase64(file.url);
                this.obj.property.list[this.currentIndex].icon = [{ ...file, url: _url }]
            }
        },
        handleRemove(file, fileList) {
            setTimeout(() => {
                this.obj.property.list[this.currentIndex].icon = [];
            }, 10)
        },
    }
};
</script>

<style scoped lang="less">
.footer-com {
    .sec {
        margin: 0 0 20px;
        padding: 0 0 20px;
        border-bottom: 1px solid #ddd;
    }
}
</style>