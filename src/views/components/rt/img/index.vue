<template>
    <el-row class="img">
        <p class="com-nm">轮播海报</p>
        <el-collapse value="1">
            <el-collapse-item title="样式设置" name="1">
                <el-row class="com-wrapper">
                    <el-form label-position="left" :model="obj" label-width="100px">
                        <el-form-item label="图片列表">
                            <el-upload class="upload-demo" action="#" :on-remove="handleRemove" :on-change="handleAdd" :auto-upload="false"
                                :limit="10" :file-list="obj.icon" list-type="picture">
                                <el-button size="small" type="primary">添加图片</el-button>
                                <div slot="tip" class="el-upload__tip"></div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="图片高度">
                            <el-input v-model="obj.height"><template slot="append">px</template></el-input>
                        </el-form-item>
                        <el-form-item label="显示指示器">
                            <el-checkbox v-model="obj.showArrow"></el-checkbox>
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
    name: "Img",
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
                this.obj.icon.push({ ...file, url: _url })
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

<style lang="less">
.img {}
</style>