<template>
    <el-row class="pure-img">
        <p class="com-nm">间隔</p>
        <el-collapse value="1">
            <el-collapse-item title="样式设置" name="1">
                <el-row class="com-wrapper">
                    <el-form label-position="left" :model="obj" label-width="100px">
                        <el-form-item label="间隔高度">
                            <el-input v-model="obj.height"></el-input>
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
    name: "Margin",
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
};
</script>

<style lang="less">
.margin {}
</style>