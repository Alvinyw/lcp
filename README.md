# lcp

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```
### Compiles and minifies for production
```
npm run build
```

### 注意事项
- Nodejs: 安装 v12.11.1 版本(若已安装，可以使用nvm切换nodeJs版本)
- Visual Studio Code: 代码开发工具(视个人喜好，推荐)
- GitLab: 开发协作管理工具

### 项目组成
├── project // 项目根目录
    ├── node_modules // 项目依赖文件 
    ├── public // 项目入口文件
    ├── src // 项目下的页面、组件、图片等资源文件 
        ├── api // 接口配置文件 
        ├── assets // 图片资源 
        ├── components // 全局组件 
        ├── const // 全局变量 
        ├── directive // 全局自定义指令
        ├── filters // 全局自定义过滤器
        ├── layout // 全局通用组件，包含侧边栏、顶部栏
        ├── router // 路由文件
        ├── store // vuex 数据管理
        ├── styles // 样式文件
        ├── utils // 全局工具函数
        └── view // 项目页面
            ├── channel // 渠道管理模块 
            ├── default // 缺省页面 
            ├── failure // 失败页面
            ├── login // 登录页面
            ├── notFound // 404页面
            ├── operationRecord // 操作记录查询页 
            ├── page // 页面管理模块
            ├── preview // 预览页面 
            ├── success // 成功页面
            ├── system // 系统管理模块
            ├── template // 模版管理模块 
                ├── components // 页面模版编辑和预览的相关组件 
                    └── md // 模版编辑页面中间预览区组件 
                    └── rt // 模版编辑页面右侧属性配置区组件 
                ├── edit // 页面模版编辑模块 
                ├── index // 页面模版查询页面
            ├── updatePsw // 密码更新页面
            ├── user // 用户管理模块  
├── permission.js // 权限控制
├── .env.development // 开发环境配置
├── .env.production // 生产环境配置
├── .env.test // 测试环境配置
├── .gitignore // git 不做版本控制的文件
├── package-lock.json // 项目依赖详情
├── package.json // 项目打包和依赖配置文件
├── README.md // 项目说明
├── vue.config.js // 项目配置