<template>
  <el-container class="home-index" style="height: 100vh; border: 1px solid #eee">
    <el-main class="tp-wrapper" v-loading="loading" element-loading-text="模版列表加载中"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)">
      <el-form :inline="true" :model="queryParame" class="demo-form-inline">
        <el-form-item label="渠道">
          <el-select v-model="queryParame.channelId" clearable placeholder="请选择渠道" @change="onChannelChange">
            <el-option v-for="item in channelMap" :key="item.channelId" :label="item.channelName" :value="item.channelId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统">
          <el-select v-model="queryParame.moduleId" clearable placeholder="请选择系统" @change="onModuleChange">
            <el-option v-for="item in systemMap" :key="item.moduleId" :label="item.moduleName" :value="item.moduleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面">
          <el-select v-model="queryParame.pageId" placeholder="请选择页面" @change="onPageChange">
            <el-option v-for="item in pageMap" :key="item.pageId" :label="item.pageName" :value="item.pageId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onTemplateQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="tp-add" @click="onTemplateAdd"><i class="el-icon-plus"></i></div>
      <el-row v-for="(item, index) in templateList" :key="index" class="tp">
        <el-row class="sec-btm">
          <p class="name">{{ item.templateName }}</p>
          <p class="date">{{ $lib.getYYMMDD(item.createTime) }}</p>
          <p class="btn-grp"><el-link type="primary" @click="onApplyDialogShow(item)">应用</el-link><el-link type="primary"
              @click="onTemplateEdit(item)">编辑</el-link><el-link type="primary"
              @click="previewDialogVisible = true">预览</el-link><el-link type="primary"
              @click="onExportJSON(item)">导出</el-link>
          </p>
        </el-row>
      </el-row>
    </el-main>
    <el-dialog class="dig-sys" title="选择应用系统" :visible.sync="applyDialogVisible">
      <el-form :inline="true" :model="queryParame" class="demo-form-inline">
        <el-form-item label="渠道">
          <el-select v-model="queryParame.channelId" clearable placeholder="请选择渠道" @change="onChannelChange">
            <el-option v-for="item in channelMap" :key="item.channelId" :label="item.channelName" :value="item.channelId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统">
          <el-select v-model="queryParame.moduleId" clearable placeholder="请选择系统" @change="onModuleChange">
            <el-option v-for="item in systemMap" :key="item.moduleId" :label="item.moduleName" :value="item.moduleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面">
          <el-select v-model="queryParame.pageId" placeholder="请选择页面" @change="onPageChange">
            <el-option v-for="item in pageMap" :key="item.pageId" :label="item.pageName" :value="item.pageId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
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
import previewCode from '@/assets/images/preview_code.png';

export default {
  name: "TemplateIndex",
  data() {
    return {
      templateList: [],
      applyDialogVisible: false,
      previewDialogVisible: false,
      queryParame: {
        channelId: '',
        moduleId: '',
        pageId: ''
      },
      channelMap: [],
      systemMap: [],
      pageMap: [],
      previewCode,
      selectedTmpId: '',
      loading: false,
    }
  },
  mounted() {
    this.queryParame.channelId = '';
    this.$api.app.userPermissionList().then(res => {
      const { channelList = [] } = res.data || {};
      this.channelMap = channelList;
    });
    this.onTemplateQuery();
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
    // 模版列表查询
    async onTemplateQuery() {
      this.loading = true;
      await this.$api.app.templateInfoListSelect(this.queryParame)
        .then(res => {
          const { list = [] } = res.data || {};
          this.templateList = list;
        }).finally(() => {
          this.loading = false;
        });
    },
    // 导出模版文件
    onExportJSON(item = {}) {
      const { templateName = '', templateContext = '{}' } = item;
      this.$lib.exportJSON(templateContext, templateName);
    },
    // 新增模版
    onTemplateAdd() {
      this.$router.push({
        name: 'editIndex',
        query: { },
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
      const { pageId = '' } = this.queryParame;
      if (!pageId) {
        this.$message({
          message: '请先选择需要应用的页面！',
          type: 'error'
        });
        return;
      }
      this.$api.app.perPageTemplateMappingUse({ templateId: this.selectedTmpId, pageId })
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
        .el-dialog {
            min-width: 815px;
        }
    }
}
</style>
<style lang="less">
.home-index {
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
  .tp-wrapper {
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