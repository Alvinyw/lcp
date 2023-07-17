<template>
    <div class="pure-img">
        <img v-if="options.property.icon.length > 0"
            :style="{ height: options.property.height, width: options.property.width, 'border-radius': options.property.radius + 'px' }"
            :src="options.property.icon[0].url" />
        <div v-else class="empty">
            在右侧编辑区添加图片<br />建议宽度375px
        </div>
    </div>
</template>
<script>

export default {
    name: "PureImg",
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
.pure-img {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .empty {
        background: #f4dbb6;
        color: #FFF;
        width: 100%;
        height: 180px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }

    img {
        max-width: 100%;
    }
}
</style>