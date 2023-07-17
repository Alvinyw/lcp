<template>
    <el-container class="preview-index">
        <div class="head-nav" :style="{ 'background-color': headerNav.property.bgColor }">
            <img :src="bgHeaderNav" />
            <h1 :style="{ 'color': headerNav.property.fontColor }">{{ headerNav.property.title }}</h1>
        </div>
        <div class="main-ct">
            <template v-for="(item, index) in componentAry">
                <div :key="index" class="item">
                    <component :is="item.component" :options="item.options" :key="index">
                    </component>
                </div>
            </template>
        </div>
        <div class="footer-nav">
            <div v-for="(item, index) in footerNav.property ? footerNav.property.list : {}" :key="index" class="item">
                <img :src="item.icon[0].url" />
                <span class="nm">{{ item.text }}</span>
            </div>
        </div>
    </el-container>
</template>
  
<script>
import pageType from "@/const/pageType";
import bgHeaderNav from '@/assets/images/bg_headerNav.svg';
import { componentType, componentProperty } from "@/const/componentType";
import { mapToMdComponents } from "../edit/utils";

export default {
    name: "PreviewIndex",
    data() {
        return {
            headerNav: componentProperty.filter(item => item.value == componentType.HEADER_NAV)[0],
            footerNav: componentProperty.filter(item => item.value == componentType.FOOTER_NAV)[0],
            pageLayout: [],
            bgHeaderNav,
            componentAry: [],
        }
    },
    // computed: {
    //     componentAry() {
    //         return mapToMdComponents(this.pageLayout);
    //     }
    // },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            const { PER_HOME } = pageType;
            vm.$api.app.perPageTemplateMappingQry({ pageId: PER_HOME })
                .then(res => {
                    const { templateContext = '{}' } = res.data || {};
                    const { headerNav = {}, footerNav = {}, pageLayout = [] } = JSON.parse(templateContext);
                    console.log('=====templateContext=======', JSON.parse(templateContext))
                    vm.headerNav = headerNav;
                    vm.footerNav = footerNav;
                    vm.pageLayout = pageLayout;
                    vm.componentAry = mapToMdComponents(vm.pageLayout);
                })
                .catch(() => {
                });
        })
    },
    mounted() {
        // const { PER_HOME } = pageType;
        // this.$api.app.perPageTemplateMappingQry({ pageId: PER_HOME })
        //     .then(res => {
        //         const { templateContext = '{}' } = res.data || {};
        //         const { headerNav = {}, footerNav = {}, pageLayout = [] } = JSON.parse(templateContext);
        //         console.log('=====templateContext=======', JSON.parse(templateContext))
        //         this.headerNav = headerNav;
        //         this.footerNav = footerNav;
        //         this.pageLayout = pageLayout;
        //         this.componentAry = mapToMdComponents(this.pageLayout);
        //     })
        //     .catch(() => {
        //     });
    },
    methods: {

    }
};
</script>
  
<style lang="less">
.preview-index {
    .dig-tb {
        table {
            width: 100% !important;
        }
    }
}
</style>
<style scoped lang="less">
.preview-index {
    position: relative;
    width: 100vw;
    height: 100vh;
    flex-direction: column;

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
</style>