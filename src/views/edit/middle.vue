<template>
    <el-row class="md">
        <el-row class="iphone-view">
            <div class="head-nav" :class="currentComType == componentType.HEADER_NAV ? 'actived' : ''"
                :style="{ 'background-color': headerNav.property.bgColor }"
                @click="onComponentChange({ options: { value: componentType.HEADER_NAV } }, -1)">
                <img :src="bgHeaderNav" />
                <h1 :style="{ 'color': headerNav.property.fontColor }">{{ headerNav.property.title }}</h1>
            </div>
            <el-row class="main-ct">
                <template v-for="(item, index) in componentAry">
                    <div @click="onComponentChange(item, index)" :key="index"
                        :class="Number(selectedIndex) == Number(index) ? 'actived' : ''" class="com-item">
                        <component :is="item.component" :options="item.options" :key="index">
                        </component>
                        <span class="del" @click.stop="onComponentDel(index)"><i class="el-icon-delete"></i></span>
                    </div>
                </template>
            </el-row>
            <div class="footer-nav" :class="currentComType == componentType.FOOTER_NAV ? 'actived' : ''"
                @click="onComponentChange({ options: { value: componentType.FOOTER_NAV } }, -2)">
                <div v-for="(item, index) in footerNav.property.list" :key="index" class="item">
                    <img v-if="item.icon[0]" :src="item.icon[0].url" />
                    <span class="nm">{{ item.text }}</span>
                </div>
            </div>
        </el-row>
    </el-row>
</template>
<script>
import { mapGetters } from "vuex";
import { mapToMdComponents } from "./utils";
import { componentType } from "@/const/componentType";
import bgHeaderNav from '@/assets/images/bg_headerNav.svg';

export default {
    name: "MiddleIndex",
    components: {},
    data() {
        return {
            componentType,
            bgHeaderNav,
        }
    },
    computed: {
        ...mapGetters(["templateInfo", "currentComType", "selectedIndex"]),
        footerNav() {
            const { footerNav = {} } = this.templateInfo;
            return footerNav;
        },
        headerNav() {
            const { headerNav = {} } = this.templateInfo;
            return headerNav;
        },
        componentAry() {
            const { pageLayout = {} } = this.templateInfo;
            const _c = mapToMdComponents(pageLayout);
            return _c;
        }
    },
    methods: {
        onComponentChange(item = {}, index = 0) {
            const { value } = item.options || {}
            this.$store.dispatch("app/updateCurrentComType", value);
            this.$store.dispatch("app/updateSelectedIndex", index);
        },
        onComponentDel(idx = 1) {
            const { pageLayout = {} } = this.templateInfo;
            const _p = pageLayout.filter((item, index) => item && index !== idx);
            this.$store.dispatch("app/updateTemplateInfo", { ...this.templateInfo, pageLayout: _p });
            this.$store.dispatch("app/updateSelectedIndex", - 1);
            this.$store.dispatch("app/updateCurrentComType", componentType.HEADER_NAV);
        },
    }
};
</script>

<style scoped lang="less">
.md {
    box-sizing: border-box;
    padding: 45px 0 20px;
    overflow-y: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 320px;
    right: 320px;
    background: #ebedf0;
    display: flex;
    justify-content: center;

    .iphone-view {
        position: relative;
        width: 375px;
        height: 644px;
        background-color: #f5f5f5;
        box-shadow: 0 2px 4px 4px #ccc;

        .head-nav {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: relative;
            width: 100%;
            height: 64px;
            box-sizing: border-box;
            background-color: #fff;
            transition: all 0.3s ease-in-out;
            border: 2px solid transparent;

            &.actived {
                border: 2px solid #7545F3
            }

            img {
                width: 100%;
            }

            h1 {
                margin: 5px 0 0;
                padding: 0;
                font-size: 16px;
                font-weight: bold;
                text-align: center;
            }
        }

        .main-ct {
            height: 530px;
            overflow: scroll;

            .com-item {
                position: relative;
                cursor: pointer;

                &.actived {
                    position: relative;

                    &::before {
                        content: '';
                        display: inline-block;
                        position: absolute;
                        z-index: 10;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        border: 2px solid #7545F3
                    }

                }

                .del {

                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    right: 0;
                    top: 0;
                    z-index: 2;
                    width: 24px;
                    height: 24px;
                    font-size: 16px;
                    background-color: #7545F3;
                    color: #fff;
                    display: none;
                }

                &.actived {
                    .del {
                        display: flex;
                    }
                }
            }
        }

        .footer-nav {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: space-around;
            background-color: #fff;
            border: 2px solid transparent;

            &.actived {
                border: 2px solid #7545F3
            }

            .item {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                font-size: 12px;

                img {
                    width: 20px;
                    height: 20px;
                }

                .nm {
                    margin: 3px 0 0;
                }
            }
        }
    }
}
</style>