<template>
    <div class="pure-text">
        <p v-if="options.property.text"
            :style="{ 'color': options.property.color, 'font-size': options.property.fontSize + 'px' }">{{
                options.property.text }}</p>
        <p v-else class="empty">请在右侧输入文本内容</p>
    </div>
</template>
<script>

export default {
    name: "PureText",
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
.pure-text {
    p {
        min-height: 32px;
    }

    .empty {
        color: #bbb;
        font-size: 14px;
        padding: 0 0 0 4px;
    }
}
</style>