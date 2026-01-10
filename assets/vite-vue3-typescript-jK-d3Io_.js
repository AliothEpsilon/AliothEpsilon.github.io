const n=`---
title: Vite + Vue 3 + TypeScript 项目搭建指南
date: 2024-01-01
category: 技术分享
tags:
  - Vite
  - Vue 3
  - TypeScript
  - 前端开发
excerpt: 本文介绍如何从零开始搭建一个基于 Vite、Vue 3 和 TypeScript 的项目，涵盖了项目初始化、核心配置和最佳实践。
---

本文介绍如何从零开始搭建一个基于 Vite、Vue 3 和 TypeScript 的项目。

## 为什么选择这个技术栈？

### Vite

- **极速的冷启动**：基于原生 ESM，无需打包
- **快速的热更新**：HMR 速度极快
- **丰富的插件生态**：支持各种框架和工具

### Vue 3

- **组合式 API**：更灵活的代码组织方式
- **更好的 TypeScript 支持**：类型推断更准确
- **性能提升**：更小的包体积和更快的渲染

### TypeScript

- **类型安全**：减少运行时错误
- **更好的 IDE 支持**：自动补全和重构
- **代码可维护性**：大型项目更易维护

## 项目初始化

### 1. 创建项目

\`\`\`bash
npm create vite@latest my-project -- --template vue-ts
cd my-project
npm install
\`\`\`

### 2. 项目结构

\`\`\`
my-project/
├── public/          # 静态资源
├── src/
│   ├── assets/      # 资源文件
│   ├── components/  # 组件
│   ├── views/       # 页面
│   ├── App.vue      # 根组件
│   └── main.ts      # 入口文件
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
\`\`\`

## 核心配置

### TypeScript 配置

在 \`tsconfig.json\` 中配置：

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
\`\`\`

### Vite 配置

在 \`vite.config.ts\` 中配置：

\`\`\`typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
\`\`\`

## 开发和构建

### 开发模式

\`\`\`bash
npm run dev
\`\`\`

### 生产构建

\`\`\`bash
npm run build
\`\`\`

### 预览构建结果

\`\`\`bash
npm run preview
\`\`\`

## 最佳实践

1. **使用组合式 API**：更灵活的逻辑复用
2. **类型定义**：充分利用 TypeScript 的类型系统
3. **组件拆分**：保持组件单一职责
4. **代码分割**：使用动态导入优化加载性能

## 总结

这个技术栈非常适合现代前端开发，提供了优秀的开发体验和性能表现。
`;export{n as default};
