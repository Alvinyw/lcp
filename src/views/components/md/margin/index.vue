<template>
    <div class="margin" :style="{ height: options.property.height + 'px' }">
    </div>
</template>
<script>

export default {
    name: "Margin",
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
.MARGIN {
    width: 100%;
}
</style>