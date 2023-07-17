<template>
    <el-row class="rt">
        <component :is="currentCom" :options="currentObj" :key="selectedIndex"></component>
    </el-row>
</template>
<script>
import { mapGetters } from "vuex";
import { mapToRtComponents } from "./utils";
import HeaderNav from "../components/rt/header-nav";

export default {
    name: "RightIndex",
    components: { HeaderNav },
    data() {
        return {
            currentCom: HeaderNav,
        }
    },
    computed: {
        ...mapGetters(["templateInfo", "currentComType", "selectedIndex"]),
        currentObj() {
            const { pageLayout = {} } = this.templateInfo;
            const _obj = pageLayout.filter((item, index) => index == this.selectedIndex)[0] || {};
            return _obj;
        }
    },
    watch: {
        currentComType(val) {
            this.currentCom = mapToRtComponents(val);
        }
    },
};
</script>

<style lang="less">
.rt {

    .com-nm {
        margin: 0 0 16px 0;
        font-size: 16px;
        font-weight: 500;
    }

    .com-wrapper {
        .el-form {
            .el-form-item:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
<style scoped lang="less">
.rt {
    width: 320px;
    padding: 15px 8px;
    background-color: #fff;
    height: calc(100vh - 60px);
    overflow: scroll;

}
</style>