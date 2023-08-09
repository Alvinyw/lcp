<template>
  <el-row class="pure-img">
    <p class="com-nm">文本</p>
    <el-collapse :value="['1', '2']">
      <el-collapse-item title="样式设置" name="1">
        <el-row class="com-wrapper">
          <el-form label-position="left" :model="obj" label-width="100px">
            <el-form-item label="背景颜色">
              <el-color-picker
                v-model="obj.bgColor"
                show-alpha
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="圆角">
              <el-input v-model="obj.borderRadius"
                ><template slot="append">px</template></el-input
              >
            </el-form-item>
            <el-form-item label="内边距">
              <el-input v-model="obj.padding"
                ><template slot="append">px</template></el-input
              >
            </el-form-item>
            <el-form-item label="广告图片高度">
              <el-input v-model="obj.imgHeight"
                ><template slot="append">px</template></el-input
              >
            </el-form-item>
            <el-form-item label="广告图片宽度">
              <el-input v-model="obj.imgWidth"
                ><template slot="append">px</template></el-input
              >
            </el-form-item>
            <el-form-item label="广告图片右边距">
              <el-input v-model="obj.imgMarginRight"
                ><template slot="append">px</template></el-input
              >
            </el-form-item>
            <el-form-item label="广告标题颜色">
              <el-color-picker
                v-model="obj.adTitleColor"
                show-alpha
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="广告标题字号">
              <el-input v-model="obj.adTitleFontSize"
                ><template slot="append">px</template></el-input
              >
            </el-form-item>
            <el-form-item label="广告标题字重">
              <el-input v-model="obj.adTitleFontWeight"></el-input>
            </el-form-item>
            <el-form-item label="广告标题下边距">
              <el-input v-model="obj.adTitleMarginBottom"
                ><template slot="append">px</template></el-input
              >
            </el-form-item>
            <el-form-item label="广告内容颜色">
              <el-color-picker
                v-model="obj.adContentColor"
                show-alpha
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="广告内容字号">
              <el-input v-model="obj.adContentFontSize"
                ><template slot="append">px</template></el-input
              >
            </el-form-item>
            <el-form-item label="广告内容字重">
              <el-input v-model="obj.adContentFontWeight"></el-input>
            </el-form-item>
            <el-form-item label="卡片间距">
              <el-input v-model="obj.cardMargin"
                ><template slot="append">px</template></el-input
              >
            </el-form-item>
          </el-form>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="卡片内容" name="2">
        <el-button type="primary" size="small" @click="obj.items.push({})"
          >新增卡片</el-button
        >
        <el-divider></el-divider>
        <el-row
          class="com-wrapper"
          v-for="(item, index) in obj.items"
          :key="index"
        >
          {{ `卡片${index + 1}` }}
          <el-form label-position="left" :model="item" label-width="100px">
            <el-form-item label="广告标题">
              <el-input v-model="item.adTitle"></el-input>
            </el-form-item>
            <el-form-item label="广告内容">
              <el-input v-model="item.adContent"></el-input>
            </el-form-item>
            <el-form-item label="跳转路径">
              <el-select v-model="item.link" clearable placeholder="跳转链接">
                <el-option
                  v-for="item in linkAry"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="图标">
              <el-upload
                class="upload-demo"
                action="#"
                :on-remove="
                  (file, fileList) => {
                    handleRemove(file, fileList, index);
                  }
                "
                :on-change="
                  (file, fileList) => {
                    handleAdd(file, fileList, index);
                  }
                "
                :auto-upload="false"
                :limit="1"
                :file-list="fileList"
                list-type="picture"
                :key="index"
              >
                <el-button size="small" type="primary">添加图标</el-button>
                <div slot="tip" class="el-upload__tip"></div>
              </el-upload>
            </el-form-item>
          </el-form>
          <div style="text-align: right; padding: 5px">
            <el-button type="danger" size="small" @click="removeCard(index)"
              >删除此卡片</el-button
            >
          </div>
          <el-divider></el-divider>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </el-row>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "ConvenienceService",
  props: {
    options: {
      type: Object,
      required: false,
      default: () => ({
        property: {},
        value: "",
      }),
    },
  },
  data() {
    return {
      fileList: [],
      obj: {},
      linkAry: [
        {
          value: "1",
          label: "首页",
        },
        {
          value: "2",
          label: "个人中心",
        },
        {
          value: "3",
          label: "积分中心",
        },
        {
          value: "4",
          label: "活动中心",
        },
      ],
    };
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
        this.$store.dispatch("app/updateTemplateInfo", {
          ...this.templateInfo,
          pageLayout,
        });
      },
      deep: true,
    },
  },
  mounted() {
    const { property = {} } = this.options || {};
    this.obj = Object.assign({}, this.obj, { ...property });
  },
  methods: {
    removeCard(index) {
      this.obj.items = this.obj.items.filter((el, i) => {
        return i != index;
      });
    },
    async handleAdd(file, fileList, index) {
      if (file) {
        const _url = await this.$lib.urlToBase64(file.url);
        this.obj.items = this.obj.items.map((el, i) => {
          if (i == index) {
            el.imgUrl = _url;
          }
          return el;
        });
      }
    },
    handleRemove(file, fileList, index) {
      if (file) {
        this.obj.items = this.obj.items.map((el, i) => {
          if (i == index) {
            el.imgUrl = "";
          }
          return el;
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>