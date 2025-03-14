# 个人网站 React 重构项目

这是一个使用 React 18 重构的个人网站项目，保留了原有的功能、样式和动画效果，同时采用了更加现代化的代码结构和设计模式。

## 项目特点

- 使用 React 18 和函数式组件
- 自定义钩子（hooks）实现视差效果和滚动动画
- 响应式设计，适配各种设备屏幕
- 不规则形状卡片设计
- 现代化的视觉效果和交互体验
- 组件化结构，易于维护和扩展

## 项目结构

```
src/
├── components/           # 组件目录
│   ├── Header/           # 头部导航组件
│   ├── Hero/             # 首屏英雄区组件
│   ├── ParallaxSection/  # 视差效果区域组件
│   ├── ProjectsSection/  # 项目展示区域组件
│   ├── SkillsSection/    # 技能展示区域组件
│   ├── ContactSection/   # 联系表单区域组件
│   ├── Footer/           # 页脚组件
│   └── common/           # 通用组件
│       ├── Card/         # 卡片组件
│       ├── DropdownMenu/ # 下拉菜单组件
│       └── SocialIcons/  # 社交图标组件
├── contexts/             # React Context 目录
│   └── ParallaxContext.js # 视差效果上下文
├── hooks/                # 自定义钩子目录
│   ├── useParallax.js    # 视差效果钩子
│   ├── useScrollAnimation.js # 滚动动画钩子
│   └── useHeaderScroll.js # 头部滚动效果钩子
├── styles/               # 样式目录
│   ├── global.css        # 全局样式
│   ├── variables.css     # CSS 变量
│   └── animations.css    # 动画样式
├── utils/                # 工具函数目录
│   └── animations.js     # 动画相关工具函数
├── App.js                # 应用主组件
├── App.css               # 应用主样式
├── index.js              # 入口文件
└── index.css             # 入口样式
```

## 设计亮点

1. **不规则形状卡片**：每个卡片都有独特的不规则形状，包括圆角、曲线和波浪效果
2. **现代化视差效果按钮**：添加了渐变背景、更强的阴影效果和现代设计
3. **优雅的导航栏**：滚动动画效果和渐变色文字
4. **精美的社交图标悬停效果**：使用下划线动画替代传统的圆形背景
5. **现代化下拉菜单**：添加了图片、描述文本和现代化设计元素

## 如何运行

1. 确保已安装 Node.js (推荐 v14.0.0 或更高版本)

2. 安装依赖包：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm start
```

4. 打开浏览器访问：
```
http://localhost:3000
```

## 构建生产版本

```bash
npm run build
```

构建后的文件将位于 `build/` 目录中，可以部署到任何静态文件服务器。

## 技术栈

- React 18
- CSS3 (原生 CSS，无框架)
- JavaScript ES6+
- React Hooks
- Context API

## 未来计划

- 添加深色模式支持
- 实现国际化多语言支持
- 添加博客功能
- 集成更多交互动画效果
