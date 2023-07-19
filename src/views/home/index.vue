<template>
  <el-container class="home-index" style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px">
      <el-menu :default-openeds="['1', '2']">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">概况</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-setting"></i>
          <span slot="title">操作记录</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: left; font-size: 14px">
        页面模版列表
        <el-dropdown>
          <span class="el-dropdown-link">
            廖益文 - 渠道团队<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="tp-wrapper" v-loading="loading" element-loading-text="模版列表加载中"
        element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)">

        <el-row class="sys-tab">
          <div class="item">
            <span>选择系统：</span>
            <el-select v-model="currentSystem" placeholder="请选择系统">
              <el-option v-for="item in systemMap" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <span>选择页面：</span>
            <el-select v-model="currentPage" placeholder="请选择页面">
              <el-option v-for="item in pageAry" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-row>
        <div class="tp-add" @click="onTemplateAdd"><i class="el-icon-plus"></i></div>
        <el-row v-for="(item, index) in templateList" :key="index" class="tp">
          <el-row class="sec-btm">
            <p class="name">{{ item.templateName }}</p>
            <p class="date">{{ randomTime() }}</p>
            <p class="btn-grp"><el-link type="primary" @click="onApplyDialogShow(item)">使用</el-link><el-link
                type="primary" @click="onTemplateEdit(item)">编辑</el-link><el-link type="primary"
                @click="previewDialogVisible = true">预览</el-link>
            </p>
          </el-row>
        </el-row>
      </el-main>
    </el-container>
    <el-dialog class="dig-sys" title="选择应用系统" :visible.sync="applyDialogVisible">
      <el-row class="sys-tab">
        <div class="item">
          <span>选择系统：</span>
          <el-select v-model="currentSystem" placeholder="请选择系统">
            <el-option v-for="item in systemMap" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <span>选择页面：</span>
          <el-select v-model="currentPage" placeholder="请选择页面">
            <el-option v-for="item in pageAry" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="applyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onTemplateApply">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog class="dig-preCode" title="预览页面" :visible.sync="previewDialogVisible">
      <img :src="previewCode" />
    </el-dialog>
  </el-container>
</template>

<script>
import { systemMap, pageMap, systemPagesMap } from "@/const/systemType";
import previewCode from '@/assets/images/preview_code.png';

export default {
  name: "HomeIndex",
  data() {
    return {
      templateList: [],
      applyDialogVisible: false,
      previewDialogVisible: false,
      previewCode,
      systemMap,
      currentSystem: '',
      currentPage: '',
      selectedTmpId: '',
      loading: false,
    }
  },
  computed: {
    pageAry() {
      const { currentSystem = '' } = this;
      const _sp = systemPagesMap.filter(item => item.value == currentSystem);
      if (_sp.length < 1) return {};
      const _res = [];
      _sp[0].pages.forEach(ele => {
        const _t = pageMap.filter(val => val.value == ele)[0] || {};
        _res.push(_t);
      });
      return _res;
    },
  },
  mounted() {
    this.loading = true;
    this.$api.app.perTemplateQryAll()
      .then(res => {
        const { list = [] } = res.data || {};
        this.templateList = list;
      })
      .catch(() => {
      }).finally(() => {
        this.loading = false;
      });
  },
  methods: {
    randomTime() {
      return `2023-0${Math.ceil(Math.random() * 9)}-0${Math.ceil(Math.random() * 9)}`;
    },
    // 新增模版
    onTemplateAdd() {
      this.$router.push({
        name: 'editIndex',
        query: { systemType: this.currentSystem, pageType: this.currentSystem },
      })
    },
    // 显示模版应用弹框
    onApplyDialogShow(item = {}) {
      const { templateId = '' } = item;
      this.selectedTmpId = templateId;
      this.applyDialogVisible = true;
    },
    // 模版应用至系统
    async onTemplateApply() {
      const { currentSystem = '', currentPage = '' } = this;
      if(!currentSystem || !currentPage) {
        this.$message({
            message: '请先选择需要应用的系统和页面！',
            type: 'error'
          });
        return;
      }
      this.$api.app.perPageTemplateMappingUse({ templateId: this.selectedTmpId, pageId: currentPage })
        .then(() => {
          this.$message({
            message: '模版应用成功！',
            type: 'success'
          });
        })
        .catch(() => {
          this.$message({
            message: '模版应用失败！',
            type: 'error'
          });
        }).finally(() => {
          this.applyDialogVisible = false;
        });
    },
    // 编辑模版
    onTemplateEdit(item = {}) {
      const { templateId } = item;
      this.$router.push({
        name: 'editIndex',
        query: { templateId, },
      })
    }
  }
};
</script>

<style lang="less">
.home-index {
  .dig-sys {
    .sys-tab {
      display: flex;
      justify-content: left;
      align-items: center;

      .item {

        &:first-child {
          margin: 0 40px 0 0;
        }

        span {
          margin: 0 10px 0 0;
          font-size: 16px;
        }
      }
    }
  }

  .dig-preCode {
    .el-dialog__body {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 60%;
      }
    }
  }
}
</style>
<style scoped lang="less">
.home-index {
  .el-header {
    background-color: #fdfdfd;
    line-height: 60px;
    border-bottom: 1px solid #aaa;
    box-shadow: #eee 5px 5px 8px 6px;
    display: flex;
    justify-content: space-between;
  }

  .el-aside {
    color: #aaa;
    background-color: #fff;
    border-right: solid 1px #aaa;

    .el-menu {
      border: none;
    }
  }

  .tp-wrapper {
    padding: 0 20px 20px;

    .sys-tab {
      padding: 20px 15px;
      display: flex;
      justify-content: left;
      align-items: center;

      .item {
        margin: 0 50px 0 0;

        span {
          margin: 0 10px 0 0;
          font-size: 16px;
        }
      }
    }

    .tp-add {
      display: inline-block;
      position: relative;
      margin: 15px;
      width: 200px;
      height: 310px;
      border: 1px solid #aaa;
      text-align: center;
      cursor: pointer;

      &:hover {
        border-color: #409eff;
        color: #409eff;
      }

      i {
        position: absolute;
        top: 50%;
        margin: -20px 0 0 -15px;
        font-size: 40px;
        font-weight: bold;
      }
    }

    .tp {
      display: inline-block;
      position: relative;
      margin: 15px;
      width: 200px;
      height: 310px;
      border: 1px solid #aaa;
      background-image: url("../../assets/images/tp_bg.png");
      background-repeat: no-repeat;
      background-size: contain;

      .sec-btm {
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 14px;
        width: 100%;

        p {
          padding: 0 5px;
          line-height: 24px;
        }

        .btn-grp {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          margin: 5px 0 0;
          height: 30px;
          border-top: 1px solid #aaa;
        }
      }
    }
  }
}
</style>