# 个人网站 React 18 重构方案

## 项目概述

本文档详细说明将现有的个人网站从原生 HTML/CSS/JavaScript 重构为 React 18 技术栈的方案。重构过程将严格遵循以下原则：

1. 使用 React 18 作为核心技术栈
2. 不使用 Tailwind CSS，仅使用普通 CSS
3. 保持所有功能、样式和动画效果与原版完全一致
4. 代码整洁、风格统一、模块低耦合
5. 深度践行开闭原则

## 原项目分析

原项目由三个主要文件组成：

- **index.html**: 包含网站的 HTML 结构，使用了 Tailwind CSS 进行样式设计
- **script.js**: 包含所有交互逻辑，包括视差效果、滚动动画、导航栏效果等
- **styles.css**: 包含自定义样式，补充 Tailwind CSS 无法实现的特殊效果

网站主要功能包括：

1. 响应式导航栏，带有下拉菜单和移动端适配
2. 视差滚动效果，特别是在"我的世界"部分
3. 卡片布局，具有不规则形状和悬停效果
4. 社交图标的悬停效果
5. 滚动动画和渐变文字效果

## 技术选型

- **React 18**: 核心框架，利用其最新特性如 Concurrent Mode 和 Suspense
- **React Router**: 用于页面路由管理
- **CSS Modules**: 用于组件样式隔离，替代 Tailwind CSS
- **React Hooks**: 用于状态管理和副作用处理
- **Intersection Observer API**: 用于实现滚动动画效果
- **React Transition Group**: 用于管理组件过渡动画

## 项目结构

```
/
├── origin/                  # 原始项目文件
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── public/                  # 静态资源
│   ├── index.html
│   └── favicon.ico
├── src/                     # 源代码
│   ├── App.js               # 应用入口
│   ├── index.js             # React 渲染入口
│   ├── components/          # 组件目录
│   │   ├── Header/          # 头部导航组件
│   │   ├── Footer/          # 底部组件
│   │   ├── Hero/            # 主页英雄区组件
│   │   ├── ParallaxSection/ # 视差效果区域组件
│   │   ├── ContactSection/  # 联系区域组件
│   │   └── common/          # 通用组件
│   │       ├── Card/        # 卡片组件
│   │       ├── DropdownMenu/# 下拉菜单组件
│   │       ├── SocialIcons/ # 社交图标组件
│   │       └── ParallaxElements/ # 视差元素组件
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useParallax.js   # 视差效果 Hook
│   │   ├── useScrollAnimation.js # 滚动动画 Hook
│   │   └── useHeaderScroll.js # 头部滚动效果 Hook
│   ├── contexts/            # React Context
│   │   └── ParallaxContext.js # 视差效果上下文
│   ├── utils/               # 工具函数
│   │   ├── animations.js    # 动画相关工具
│   │   └── viewport.js      # 视口检测工具
│   └── styles/              # 全局样式
│       ├── global.css       # 全局 CSS
│       ├── animations.css   # 动画相关 CSS
│       └── variables.css    # CSS 变量
├── package.json             # 项目依赖
└── README.md                # 项目说明
```

## 重构策略

### 1. 组件化拆分

将原始 HTML 结构拆分为独立的 React 组件，每个组件负责特定的功能：

- **Header 组件**: 包含导航栏、Logo、社交图标和移动菜单
- **Hero 组件**: 主页顶部的英雄区域
- **ParallaxSection 组件**: "我的世界"部分，包含视差效果和卡片
- **ContactSection 组件**: "与我联系"部分
- **Footer 组件**: 页面底部区域

### 2. 样式迁移

将 Tailwind CSS 样式转换为普通 CSS，同时保持视觉效果一致：

1. 提取 Tailwind 类对应的样式到 CSS Modules
2. 保留原有的 CSS 动画和特效
3. 使用 CSS 变量统一管理颜色、间距等样式属性
4. 为每个组件创建独立的 CSS 文件，避免样式冲突

### 3. 功能实现

使用 React Hooks 和自定义 Hooks 实现原有的 JavaScript 功能：

1. **useParallax Hook**: 实现视差滚动效果
2. **useScrollAnimation Hook**: 实现元素滚动动画
3. **useHeaderScroll Hook**: 实现导航栏滚动效果
4. **useMediaQuery Hook**: 处理响应式布局逻辑

### 4. 性能优化

1. 使用 React.memo 和 useMemo 减少不必要的渲染
2. 实现组件懒加载，减少初始加载时间
3. 使用 CSS 动画代替 JavaScript 动画，提高性能
4. 优化图片加载，使用适当的图片格式和大小

### 5. 可访问性优化

1. 添加适当的 ARIA 属性，提高屏幕阅读器兼容性
2. 确保键盘导航可用
3. 维持适当的颜色对比度
4. 添加适当的焦点状态样式

## 实现计划

### 阶段一：项目搭建与基础组件

1. 创建 React 项目结构
2. 设置全局样式和 CSS 变量
3. 实现基础通用组件

### 阶段二：主要组件实现

1. 实现 Header 组件及其子组件
2. 实现 Hero 组件
3. 实现 ParallaxSection 组件及视差效果
4. 实现 ContactSection 组件
5. 实现 Footer 组件

### 阶段三：动画与交互效果

1. 实现导航栏滚动效果
2. 实现卡片悬停效果
3. 实现视差滚动效果
4. 实现社交图标动画效果

### 阶段四：响应式设计与优化

1. 确保移动端布局正确
2. 优化性能和加载速度
3. 进行浏览器兼容性测试
4. 修复潜在问题

## 技术挑战与解决方案

### 挑战一：视差效果实现

**解决方案**：使用 React 的 useEffect 和 useRef Hooks 结合 Intersection Observer API 实现视差效果，确保性能优化。

### 挑战二：复杂的 CSS 动画

**解决方案**：将 CSS 动画拆分为可重用的组件，使用 CSS 变量控制动画参数，保持代码的可维护性。

### 挑战三：状态管理

**解决方案**：对于简单组件使用 useState，对于需要跨组件共享的状态使用 Context API，避免过度使用全局状态。

### 挑战四：保持与原设计的一致性

**解决方案**：创建详细的设计规范文档，包括颜色、间距、字体等，确保所有组件遵循相同的设计语言。

## 测试策略

1. 组件单元测试：确保各组件功能正常
2. 集成测试：确保组件间交互正常
3. 视觉回归测试：确保重构前后视觉效果一致
4. 性能测试：确保重构后性能不降低
5. 跨浏览器测试：确保在主流浏览器中正常工作

## 结论

本重构方案旨在保持原有网站的所有功能和视觉效果，同时利用 React 18 的现代特性提高代码的可维护性和扩展性。通过组件化设计和清晰的项目结构，我们将确保代码整洁、模块低耦合，并深度践行开闭原则。
