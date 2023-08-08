<template>
    <el-container class="edit-index">
        <el-header class="sec-hd">
            <el-row class="lt"><el-button @click="goBack">返回</el-button></el-row>
            <el-row class="rt"><el-button @click="onImportJSON">导入</el-button><el-button
                    @click="onExportJSON">导出</el-button><el-button type="primary"
                    @click="onTemplateSave">保存</el-button></el-row>
        </el-header>
        <el-main class="sec-main">
            <el-row class="lt">
                <ul class="tabs">
                    <li v-for="(item, index) in TabList" :label="item.value"
                        :class="activtedIndex == index ? 'activted' : ''" @click="onTabClick(index)" :key="index">{{
                            item.value }}
                    </li>
                </ul>
                <el-row class="content-wrapper">
                    <el-row v-if="activtedIndex == 0" class="zuJian">
                        <el-collapse :value="[0, 1, 2]">
                            <el-collapse-item v-for="(item, index) in ZuJianList" :title="item.title" :key="index"
                                :name="index">
                                <el-row class="item-wrapper">
                                    <div v-for="(obj, index) in item.typeMap" :key="index" class="item"
                                        @click="onZuJianAdd(obj.value)">
                                        <i :class="obj.icon"></i>
                                        <span class="nm">{{ obj.name }}</span>
                                    </div>
                                </el-row>
                            </el-collapse-item>
                        </el-collapse>
                    </el-row>
                    <el-row v-else-if="activtedIndex == 1" class="suCai">
                        <div v-for="(item, index) in SuCai" :key="index" class="item">
                            <img :src="item" />
                        </div>
                    </el-row>
                    <el-row v-else class="moBan">
                        <div v-for="(item, index) in MoBan" :key="index" class="item">
                            <img :src="item.src" />
                            <span>{{ item.name }}</span>
                        </div>
                    </el-row>
                </el-row>
            </el-row>
            <MiddleIndex />
            <RightIndex />
        </el-main>
        <el-dialog class="dig-sys" title="选择应用系统" :visible.sync="dialogTableVisible">
            <el-form :inline="true" :model="queryParame" class="demo-form-inline">
                <el-form-item label="渠道：">
                    <el-select v-model="queryParame.channelId" clearable placeholder="请选择渠道" @change="onChannelChange">
                        <el-option v-for="item in channelMap" :key="item.channelId" :label="item.channelName"
                            :value="item.channelId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="系统：">
                    <el-select v-model="queryParame.moduleId" clearable placeholder="请选择系统" @change="onModuleChange">
                        <el-option v-for="item in systemMap" :key="item.moduleId" :label="item.moduleName"
                            :value="item.moduleId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="页面：">
                    <el-select v-model="queryParame.pageId" placeholder="请选择页面" @change="onPageChange">
                        <el-option v-for="item in pageMap" :key="item.pageId" :label="item.pageName" :value="item.pageId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="onTemplateInsert">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>
<script>
import { mapGetters } from "vuex";
import MiddleIndex from "./middle.vue";
import RightIndex from "./right.vue";
import { componentType, componentTypeMap, componentProperty } from "@/const/componentType";
// 模版
import img_moban_1 from '@/assets/images/img_moban_1.jpg';
import img_moban_4 from '@/assets/images/img_moban_4.png';
import img_moban_5 from '@/assets/images/img_moban_5.jpg';
// 素材
import img_sucai_1 from '@/assets/images/img_sucai_1.jpg';
import img_sucai_2 from '@/assets/images/img_sucai_2.jpg';
import img_sucai_3 from '@/assets/images/img_sucai_3.jpg';
import img_sucai_4 from '@/assets/images/img_sucai_4.jpg';
import img_sucai_5 from '@/assets/images/img_sucai_5.jpg';

const TabList = [
    {
        key: 'ZuJian',
        value: '组件',
    },
    {
        key: 'SuCai',
        value: '素材',
    },
    {
        key: 'MoBan',
        value: '模版',
    }
];

const ZuJian = [
    {
        title: '基础组件',
        type: [
            componentType.PURE_TEXT,
            componentType.RICH_TEXT,
            componentType.TEXT_NAV,
            componentType.TITLE,
            componentType.PURE_IMG,
            componentType.IMG,
            componentType.QUICK_ENTER,
            componentType.MARGIN,
            componentType.CONVENIENCE_SERVICE
        ]
    },
    {
        title: '业务组件',
        type: [
            componentType.LICAI,
            componentType.CUNKUAN,
            componentType.DAIKUAN,
        ]
    },
    {
        title: '系统组件',
        type: [
            componentType.SOUSUO,
            componentType.WANGDIAN,
        ]
    }
];
const SuCai = [img_sucai_5, img_sucai_1, img_sucai_2, img_sucai_3, img_sucai_4];
const MoBan = [
    { src: img_moban_1, name: '首页模版' }, { src: img_moban_5, name: '我的页面模版' }, { src: img_moban_4, name: '生活页面模版' }
];
export default {
    name: "EditIndex",
    components: { MiddleIndex, RightIndex },
    data() {
        return {
            activtedIndex: 0,
            TabList,
            ZuJian,
            MoBan,
            SuCai,
            componentType,
            ZuJianList: [],
            dialogTableVisible: false,
            queryParame: {
                channelId: '',
                moduleId: '',
                pageId: ''
            },
            channelMap: [],
            systemMap: [],
            pageMap: [],
        }

    },
    computed: {
        ...mapGetters(["templateInfo", "currentComType"]),
        pageLayout() {
            const { pageLayout = {} } = this.templateInfo;
            return pageLayout;
        },
        headerNav() {
            const { headerNav = {} } = this.templateInfo;
            return headerNav;
        },
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            const { templateId = '' } = vm.$router.currentRoute.query;
            if (templateId) {
                vm.$api.app.templateInfoTableSelectById({ templateId })
                    .then(res => {
                        const { templateContext = '{}' } = res.data || {};
                        const _tmp = JSON.parse(templateContext);
                        // console.log('=======templateContext========', _tmp)
                        vm.$store.dispatch("app/updateTemplateInfo", { ..._tmp });
                    });
            } else {
                const _headerNav = componentProperty.filter(item => componentType.HEADER_NAV == item.value)[0];
                const _footerNav = componentProperty.filter(item => componentType.FOOTER_NAV == item.value)[0];
                vm.$store.dispatch("app/updateTemplateInfo", { headerNav: vm.$lib.deepCopy(_headerNav), pageLayout: [], footerNav: vm.$lib.deepCopy(_footerNav) });
            }
            vm.$store.dispatch("app/updateSelectedIndex", - 1);
            vm.$store.dispatch("app/updateCurrentComType", componentType.HEADER_NAV);
        })
    },
    mounted() {
        this.uodateZuJianList();
        this.queryParame.channelId = '';
        this.$api.app.userPermissionList().then(res => {
            const { channelList = [] } = res.data || {};
            this.channelMap = channelList;
        });
        // console.log('=======router======', this.$router.currentRoute.query)
    },
    methods: {
        onChannelChange(val) {
            const { moduleList = [] } = this.channelMap.filter(v => v.channelId == val)[0] || {};
            this.queryParame.channelId = val;
            this.systemMap = moduleList;
            this.queryParame.moduleId = '';
        },
        onModuleChange(val) {
            const { list = [] } = this.systemMap.filter(v => v.moduleId == val)[0] || {};
            this.queryParame.moduleId = val;
            this.pageMap = list;
            this.queryParame.pageId = '';
        },
        onPageChange(val) {
            this.queryParame.pageId = val;
        },
        goBack() {
            this.$router.go(-1);
        },
        // 导入模版文件
        onImportJSON() {
            this.$lib.importJSON((config => {
                this.$store.dispatch("app/updateTemplateInfo", { ...config });
            }));
        },
        // 导出模版文件
        onExportJSON() {
            this.$lib.exportJSON(JSON.stringify(this.templateInfo, undefined, 4), 'tab_life');
        },
        onTabClick(index = '1') {
            this.activtedIndex = index;
        },
        uodateZuJianList() {
            ZuJian.forEach(item => {
                let _t = [];
                item.type.forEach(a => {
                    _t.push(componentTypeMap.filter(b => b.value == a)[0])
                })
                this.ZuJianList.push({ ...item, typeMap: _t })
            })
        },
        async onTemplateSave() {
            const { title = '首页' } = this.headerNav.property;
            const { templateId = '' } = this.$router.currentRoute.query;
            if (templateId) {
                this.$api.app.templateInfoTableUpdateById({ templateId, templateName: title, templateContext: JSON.stringify(this.templateInfo) })
                    .then(() => {
                        this.$message({
                            message: '模版更新成功！',
                            type: 'success'
                        });
                    })
                    .catch(() => {
                        this.$message({
                            message: '模版更新失败！',
                            type: 'error'
                        });
                    });
                return;
            }
            this.dialogTableVisible = true;
        },
        onTemplateInsert() {
            const { title = '首页' } = this.headerNav.property;
            this.$api.app.templateInfoTableInsert({ ...this.queryParame, templateName: title, templateContext: JSON.stringify(this.templateInfo) })
                .then(res => {
                    this.$message({
                        message: '模版保存成功！',
                        type: 'success'
                    });
                    const { templateId = '' } = res.data || {};
                    this.$router.push({
                        name: 'editIndex',
                        query: { templateId, },
                    })
                })
                .catch(() => {
                    this.$message({
                        message: '模版保存失败！',
                        type: 'error'
                    });
                }).finally(() => {
                    this.dialogTableVisible = false;
                });
        },
        onZuJianAdd(val = componentType.HEADER_NAV) {
            const { pageLayout = [] } = this.templateInfo;
            const _obj = componentProperty.filter(item => item.value == val)[0] || {};
            const { value = '', property = {} } = _obj;
            pageLayout.push({
                value,
                property: this.$lib.deepCopy(property)
            });
            this.$store.dispatch("app/updateTemplateInfo", { ...this.templateInfo, pageLayout });
            this.$store.dispatch("app/updateSelectedIndex", pageLayout.length - 1);
            this.$store.dispatch("app/updateCurrentComType", val);
        }
    }
};
</script>

<style lang="less">
.edit-index {
    .dig-sys {
        .el-dialog {
            min-width: 815px;
        }
    }
}
</style>
<style scoped lang="less">
.edit-index {
    .sec-hd {
        height: 59px;
        width: 100%;
        background: #fff;
        box-shadow: #eee 5px 5px 8px 6px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
    }

    .sec-main {
        background-color: #ebedf0;
        height: calc(100vh - 60px);
        position: relative;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;

        .lt {
            width: 320px;
            min-height: 100%;
            background-color: #fff;

            .tabs {
                margin: 8px;
                padding: 4px;
                height: 42px;
                background-color: #f7f8fa;

                li {
                    display: inline-block;
                    font-size: 14px;
                    line-height: 32px;
                    width: 33.33%;
                    text-align: center;
                    vertical-align: super;
                    cursor: pointer;

                    &.activted {
                        background-color: #fff;
                        border-radius: 4px;
                    }
                }
            }

            .content-wrapper {
                padding: 0 8px;
                height: calc(100vh - 118px);
                overflow: scroll;

                .zuJian {
                    .item-wrapper {

                        .item {
                            position: relative;
                            display: inline-block;
                            width: 95px;
                            height: 95px;
                            padding: 17px 0 0;
                            text-align: center;

                            i {
                                font-size: 30px;
                            }

                            .nm {
                                display: block;
                                width: 100%;
                                font-size: 14px;
                                text-align: center;
                                color: #000 !important;
                            }

                            &:hover {
                                background: #8558fa;
                                border-radius: 4px;
                                color: #fff;
                                cursor: pointer;

                                .nm {
                                    color: #fff !important;
                                }
                            }
                        }
                    }
                }

                .suCai {
                    .item {
                        width: 100%;
                        margin: 0 0 15px;
                        border: 1px solid #aaa;
                        border-radius: 4px;

                        &:hover {
                            cursor: pointer;
                            border-color: #7545F3;
                        }

                        img {
                            width: 100%;
                            vertical-align: text-bottom;
                        }
                    }
                }

                .moBan {
                    .item {
                        position: relative;
                        display: inline-block;
                        width: 149px;
                        margin: 0 0 10px;
                        padding: 0 0 25px;
                        border: 1px solid #aaa;

                        &:hover {
                            cursor: pointer;
                            border-color: #7545F3;
                        }

                        &:nth-child(2n) {
                            margin: 0 0 0 4px;
                        }

                        img {
                            width: 100%;
                        }

                        span {
                            display: inline-block;
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            text-align: center;
                            font-size: 14px;
                            line-height: 24px;
                            border-top: 1px solid #aaa;
                        }
                    }
                }
            }
        }
    }
}
</style>