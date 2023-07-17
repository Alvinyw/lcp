<template>
    <div class="img">
        <el-carousel :indicator-position="options.property.showArrow ? '' : 'none'" :interval="2000" arrow="always">
            <el-carousel-item v-for="item in imagesAry" :key="item.uid" :class="isNoImg ? 'noImg' : ''">
                <h3 v-if="imagesAry.length < 1">图片{{ item }}</h3>
                <img v-else :src="item.url" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>

export default {
    name: "Img",
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
            imagesAry: [],
            isNoImg: false,
        }
    },
    watch: {
        options: {
            handler(newVal) {
                this.formateIcon(newVal);

            },
            deep: true
        },
    },
    mounted() {
        this.formateIcon(this.options);
    },
    methods: {
        formateIcon(op) {
            const { property = {} } = op || {};
            const { icon = [] } = property;
            if (icon.length < 1) {
                this.imagesAry = 3;
                this.isNoImg = true;
            } else {
                this.imagesAry = icon;
                this.isNoImg = false;
            }
        }
    }
};
</script>

<style lang="less">
.img {
    .el-carousel__container {
        height: 250px;
    }
}
</style>

<style scoped lang="less">
.img {
    .el-carousel__item {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;

        &.noImg h3 {
            color: #475669;
            font-size: 18px;
            opacity: 0.75;
            line-height: 250px;
            text-align: center;
            margin: 0;
        }

        img {
            max-width: 100%;
            max-height: 100%;
        }

        &.noImg:nth-child(2n) {
            background-color: #99a9bf;
        }

        &.noImg:nth-child(2n+1) {
            background-color: #d3dce6;
        }
    }
}
</style>