import { getUUID } from "../utils/lib";
/**
 * 组件类型
 */
export const componentType = {
    // 基础组件
    IMG: 1, // 轮播海报
    PURE_TEXT: 2, // 纯文本
    TEXT_NAV: 3, // 文本导航
    RICH_TEXT: 4, // 富文本
    TITLE: 5, // 标题
    PURE_IMG: 6, // 图片
    QUICK_ENTER: 7, // 快捷入口
    MARGIN: 8, // 间隔

    // 业务组件
    LICAI: 11, // 理财
    CUNKUAN: 12, // 存款
    DAIKUAN: 13, // 贷款
    // 系统组件
    SOUSUO: 20, // 搜索
    WANGDIAN: 21, // 网点

    // 系统组件
    HEADER_NAV: 30, // 顶部导航
    FOOTER_NAV: 31, // 底部导航
};

export const componentTypeMap = [
    {
        value: componentType.MARGIN,
        icon: 'el-icon-picture',
        name: '间隔',
    },
    {
        value: componentType.IMG,
        icon: 'el-icon-picture',
        name: '轮播海报',
    },
    {
        value: componentType.TEXT_NAV,
        icon: 'el-icon-document',
        name: '文本导航',
    },
    {
        value: componentType.PURE_TEXT,
        icon: 'el-icon-document',
        name: '文本',
    },
    {
        value: componentType.RICH_TEXT,
        icon: 'el-icon-document',
        name: '富文本',
    },
    {
        value: componentType.TITLE,
        icon: 'el-icon-picture',
        name: '标题',
    },
    {
        value: componentType.PURE_IMG,
        icon: 'el-icon-picture',
        name: '图片',
    },
    {
        value: componentType.QUICK_ENTER,
        icon: 'el-icon-document-copy',
        name: '快捷入口',
    },
    {
        value: componentType.LICAI,
        icon: 'el-icon-picture',
        name: '理财',
    },
    {
        value: componentType.CUNKUAN,
        icon: 'el-icon-picture',
        name: '存款',
    },
    {
        value: componentType.DAIKUAN,
        icon: 'el-icon-picture',
        name: '贷款',
    },
    {
        value: componentType.SOUSUO,
        icon: 'el-icon-picture',
        name: '搜索',
    },
    {
        value: componentType.WANGDIAN,
        icon: 'el-icon-picture',
        name: '网点',
    },
];

export const componentProperty = [
    {
        value: componentType.MARGIN,
        property: {
            height: '15',
        },
    },
    {
        value: componentType.IMG,
        property: {
            height: '250',
            showArrow: true,
            icon: []
        },
    },
    {
        value: componentType.TEXT_NAV,
        property: {
            text: '',
            fontSize: '14',
            color: '#000',
            link: '2',
        },
    },
    {
        value: componentType.PURE_TEXT,
        property: {
            text: '',
            fontSize: '14',
            color: '#000',
            required: false,
            tipText: '输入格式不正确',
            type: '2',
            lenMin: '',
            lenMax: '',
            regTest: '',
        },
    },
    {
        value: componentType.RICH_TEXT,
        property: {
            color: '',
        },
    },
    {
        value: componentType.TITLE,
        property: {
            color: '',
        },
    },
    {
        value: componentType.PURE_IMG,
        property: {
            width: '100%',
            height: '100%',
            radius: '4',
            icon: [],

        },
    },
    {
        value: componentType.QUICK_ENTER,
        property: {
            icon: [{ url: 'https://b.yzcdn.cn/public_files/d3d6648d247605d7f9a37114ccb398dd.png'}],
            iconSize: '30',
            text: '快捷入口',
            link: '2',
            color: '#000',
            fontSize: '14'
        },
    },
    {
        value: componentType.LICAI,
        property: {
            color: '',
        },
    },
    {
        value: componentType.CUNKUAN,
        property: {
            color: '',
        },
    },
    {
        value: componentType.DAIKUAN,
        property: {
            color: '',
        },
    },
    {
        value: componentType.SOUSUO,
        property: {
            color: '',
        },
    },
    {
        value: componentType.WANGDIAN,
        property: {
            color: '',
        },
    },
    {
        value: componentType.HEADER_NAV,
        property: {
            bgColor: "rgba(255, 255, 255, 1)",
            fontColor: "rgba(0, 0, 0, 1)",
            title: '页面标题'
        },
    },
    {
        value: componentType.FOOTER_NAV,
        property: {
            activeColor: "#E74C75",
            bgColor: "#FFF",
            defaultColor: "#666",
            list: [
                {
                    icon: [{ url: "https://b.yzcdn.cn/public_files/d3d6648d247605d7f9a37114ccb398dd.png" }],
                    iconActive: [{ url: "https://b.yzcdn.cn/public_files/29fe5014bcb19d4ebffac87a3cf4cb68.png" }],
                    link: "1",
                    text: "首页"
                },
                {
                    icon: [{ url: "https://b.yzcdn.cn/public_files/b26f9134010831fc346b010f09fcf55c.png" }],
                    iconActive: [{ url: "https://b.yzcdn.cn/public_files/8cca4c2c2bbe5744ba78e4a0941410ef.png" }],
                    link: "2",
                    text: "预约"
                },
                {
                    icon: [{ url: "https://b.yzcdn.cn/public_files/c43a360c499dd012ebd087ba2523be48.png" }],
                    iconActive: [{ url: "https://b.yzcdn.cn/public_files/6bfb69585388c3840a200726087a9d71.png" }],
                    link: "3",
                    text: "服务"
                },
                {
                    icon: [{ url: "https://b.yzcdn.cn/public_files/4037fb640218ffcb7c32ee6e4ecd40a4.png" }],
                    iconActive: [{ url: "https://b.yzcdn.cn/public_files/4b532299aee643b0fc7b811737a9cbb5.png" }],
                    link: "4",
                    text: "我的"
                }
            ],
        },
    },
]