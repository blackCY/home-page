# 个人网站 TypeScript 重构计划

## 概述

本文档详细说明将现有的React个人网站从JavaScript重构为TypeScript的计划。这次重构将提高代码质量、类型安全性和开发体验，同时保持所有现有功能和视觉效果不变。

## 重构目标

1. 将所有JavaScript文件(.js)转换为TypeScript文件(.tsx/.ts)
2. 为所有组件、props、状态和函数添加适当的类型定义
3. 创建通用类型定义文件，确保类型一致性
4. 利用TypeScript的高级特性提高代码质量
5. 确保重构后的代码与原始代码功能完全相同

## 技术栈升级

- **TypeScript**: 添加静态类型检查
- **React 18 with TypeScript**: 利用TypeScript的类型系统增强React组件
- **React Router with TypeScript**: 为路由添加类型安全
- **Styled Components/CSS Modules**: 考虑使用带类型的CSS解决方案

## 重构步骤

### 1. 环境配置

1. 安装TypeScript和相关依赖
   ```bash
   npm install --save typescript @types/node @types/react @types/react-dom @types/jest @types/react-router-dom @types/react-transition-group
   ```

2. 创建TypeScript配置文件(tsconfig.json)
   - 配置适当的编译选项
   - 设置严格模式
   - 配置路径别名

3. 更新package.json脚本

### 2. 创建基础类型定义

1. 创建通用类型定义文件
   - 组件Props类型
   - 主题类型
   - 状态类型
   - API响应类型

2. 为上下文(Context)创建类型定义
   - ThemeContext类型
   - ParallaxContext类型

### 3. 组件重构

按照以下顺序重构组件：

1. 工具函数和钩子
   - 将utils/animations.js转换为.ts
   - 将所有hooks转换为TypeScript

2. 上下文提供者
   - 将contexts/ThemeContext.js转换为.tsx
   - 将contexts/ParallaxContext.js转换为.tsx

3. 通用组件
   - 将common组件文件夹中的所有组件转换为.tsx
   - 添加Props类型定义

4. 主要组件
   - 将主要组件(Header, Footer, Hero等)转换为.tsx
   - 添加Props类型定义

5. 应用入口
   - 将App.js和index.js转换为.tsx

### 4. 样式处理

1. 考虑将CSS文件转换为模块化CSS或styled-components
2. 为样式添加类型定义(如果使用styled-components)

### 5. 测试与优化

1. 修复TypeScript错误和警告
2. 进行全面测试，确保功能与原始版本相同
3. 优化类型定义，减少any的使用
4. 使用TypeScript特有功能优化代码

## 重构顺序

为了确保平稳过渡，我们将按照以下顺序进行重构：

1. 工具函数和钩子 → 最底层，依赖最少
2. 上下文提供者 → 依赖于工具函数
3. 通用组件 → 依赖于上下文和工具函数
4. 主要组件 → 依赖于通用组件
5. 应用入口 → 依赖于所有其他部分

## 预期成果

1. 完全类型安全的代码库
2. 改进的开发体验，包括更好的自动完成和错误检查
3. 更易于维护和扩展的代码结构
4. 保持与原始版本相同的功能和视觉效果
