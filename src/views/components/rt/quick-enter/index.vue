<template>
    <el-row class="quick-enter">
        <p class="com-nm">快捷入口</p>
        <el-collapse value="1">
            <el-collapse-item title="样式设置" name="1">
                <el-row class="com-wrapper">
                    <el-form label-position="left" :model="obj" label-width="100px">
                        <el-form-item label="图标">
                            <el-upload class="upload-demo" action="#" :on-remove="handleRemove" :on-change="handleAdd"
                                :auto-upload="false" :limit="1" :file-list="obj.icon" list-type="picture">
                                <el-button size="small" type="primary">添加图标</el-button>
                                <div slot="tip" class="el-upload__tip"></div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="图标大小">
                            <el-input v-model="obj.iconSize"><template slot="append">px</template></el-input>
                        </el-form-item>
                        <el-form-item label="文本">
                            <el-input v-model="obj.text"></el-input>
                        </el-form-item>
                        <el-form-item label="字体颜色">
                            <el-color-picker v-model="obj.color" show-alpha></el-color-picker>
                        </el-form-item>
                        <el-form-item label="字体大小">
                            <el-input v-model="obj.fontSize"><template slot="append">px</template></el-input>
                        </el-form-item>
                        <el-form-item label="链接">
                            <el-select v-model="obj.link" clearable placeholder="跳转链接">
                                <el-option v-for="item in linkAry" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
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
    name: "QuickEnter",
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
    methods: {
        async handleAdd(file, fileList) {
            if (file) {
                const _url = await this.$lib.urlToBase64(file.url);
                this.obj.icon = [{ ...file, url: _url }];
            }
        },
        handleRemove(file, fileList) {
            if (file) {
                this.obj.icon = this.obj.icon.filter(item => item.uid !== file.uid);
            }
        },
    }
};
</script>

<style lang="less"></style>