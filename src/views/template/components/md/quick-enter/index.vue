<template>
    <div class="quick-enter">
        <div class="item">
            <img v-if="options.property.icon.length > 0" :src="options.property.icon[0].url"
                :style="{ 'width': options.property.iconSize + 'px' }" />
            <!-- <i v-else class="el-icon-s-home"></i> -->
            <span :style="{ 'color': options.property.color, 'font-size': options.property.fontSize + 'px' }">{{
                options.property.text }}</span>
        </div>
    </div>
</template>
<script>

export default {
    name: "QuickEnter",
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
};
</script>

<style scoped lang="less">
.quick-enter {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .item {
        text-align: center;
        vertical-align: middle;

        i {
            font-size: 30px;
        }

        span {
            display: block;
            text-align: center;
            font-size: 14px;
        }
    }
}
</style>