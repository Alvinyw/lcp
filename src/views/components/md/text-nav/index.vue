<template>
    <div class="text-nav">
        <p v-if="options.property.text"
            :style="{ 'color': options.property.color, 'font-size': options.property.fontSize + 'px' }">{{
                options.property.text }}</p>
        <p v-else class="empty">请在右侧输入文本导航内容</p>
        <el-link class="link" type="primary">查看更多 ></el-link>
    </div>
</template>
<script>

export default {
    name: "TextNav",
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
.text-nav {
    position: relative;

    p {
        min-height: 30px;
    }

    .empty {
        color: #bbb;
        font-size: 14px;
        padding: 0 0 0 4px;
    }

    a {
        position: absolute;
        top: 4px;
        right: 30px;
    }
}
</style>