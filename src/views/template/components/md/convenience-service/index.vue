<template>
  <div class="container" :style="{
    'padding':options.property.padding+'px',
    'border-radius':options.property.borderRadius+'px',
    'background-color':options.property.bgColor,
  }">
    <div :style="{
      'margin-top':index>1?(options.property.cardMargin+'px'):'0',
    }" v-for="(item, index) in options.property.items" :key="index" class="items" @click="toLink(item.link)">
      <div class="left">
        <img
          :src='item.imgUrl'
          alt=""
          srcset=""
          :style="{
            'height':options.property.imgHeight+'px',
            'width':options.property.imgWidth+'px',
            'margin-right':options.property.imgMarginRight+'px'
          }"
        />
      </div>
      <div class="right">
        <div class="title" :style="{
            'color':options.property.adTitleColor,
            'font-size':options.property.adTitleFontSize+'px',
            'font-weight':options.property.adTitleFontWeight,
            'margin-bottom':options.property.adTitleMarginBottom+'px'
        }">{{ item.adTitle }}</div>
        <div class="content" :style="{
            'color':options.property.adContentColor,
            'font-size':options.property.adContentFontSize+'px',
            'font-weight':options.property.adContentFontWeight
        }">{{ item.adContent }}</div>
      </div>
    </div>
  </div>
</template>
<script>
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
    };
  },
  methods:{
    toLink(link){
      this.$message('go to '+link);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  margin: 0 10px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  .items {
    width: 50%;
    display: flex;
    margin-top: 5px;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        color: red;
        font-size: 10px;
        font-weight: 600;
        text-align: left;
      }
      .content {
        color: black;
        font-size: 5px;
        font-weight: 400;
        text-align: left;
      }
    }
  }
  .items:nth-child(1){
    margin-top: 0;
  }
  .items:nth-child(2){
    margin-top: 0;
  }
}
</style>