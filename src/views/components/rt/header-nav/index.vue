<template>
    <el-row class="header-com">
        <p class="com-nm">顶部导航</p>
        <el-collapse value="1">
            <el-collapse-item title="样式设置" name="1">
                <el-row class="com-wrapper">
                    <el-form label-position="left" :model="obj" label-width="100px">
                        <el-form-item label="页面标题">
                            <el-input v-model="obj.property.title"></el-input>
                        </el-form-item>
                        <el-form-item label="标题颜色">
                            <el-color-picker v-model="obj.property.fontColor" show-alpha></el-color-picker>
                        </el-form-item>
                        <el-form-item label="背景颜色">
                            <el-color-picker v-model="obj.property.bgColor" show-alpha></el-color-picker>
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
    name: "HeaderNav",
    data() {
        return {
            // obj: { property: {} },
        }
    },
    computed: {
        ...mapGetters(["templateInfo"]),
        obj() {
            const { headerNav = {} } = this.templateInfo;
            return headerNav;
        },
    },
    // watch: {
    //     // obj(newVal, oldVal) {
    //     //     // console.log('====headerNav=======', oldVal, newVal)
    //     //     if (JSON.stringify(oldVal) == JSON.stringify(newVal)) return;
    //     //     this.$store.dispatch("app/updateTemplateInfo", { ...this.templateInfo, headerNav: newVal });
    //     // },
    // },
    // watch: {
    //     obj: {
    //         handler(newVal) {
    //             this.$store.dispatch("app/updateTemplateInfo", { ...this.templateInfo, headerNav: newVal });
    //         },
    //         deep: true
    //     },
    // },
    // mounted() {
    //     const { headerNav = {} } = this.templateInfo;
    //     this.obj = Object.assign({}, this.obj, { ...headerNav })
    //     console.log('========headerNav-2========', this.obj)
    // }
};
</script>

<style scoped lang="less"></style>