---
title: Vite + Vue 3 + TypeScript 博客系统构建指南
date: 2026-01-10
category: 前端
tags:
  - Vite
  - Vue 3
  - TypeScript
  - 前端开发
excerpt: 本文详细介绍如何从零开始搭建一个功能完善的博客系统，基于 Vite、Vue 3 和 TypeScript，涵盖项目初始化、核心配置、功能实现和最佳实践。
---

本文详细介绍如何从零开始搭建一个功能完善的博客系统，基于 Vite、Vue 3 和 TypeScript。

## 技术栈介绍

### 核心框架

#### Vite 6.0.5
- **极速的冷启动**：基于原生 ESM，无需打包，启动速度极快
- **快速的热更新**：HMR 速度极快，开发体验流畅
- **丰富的插件生态**：支持各种框架和工具
- **优化的生产构建**：使用 Rollup 进行打包，输出优化的静态资源

#### Vue 3.5.13
- **组合式 API**：更灵活的代码组织方式，便于逻辑复用
- **更好的 TypeScript 支持**：类型推断更准确，开发体验更好
- **性能提升**：更小的包体积和更快的渲染速度
- **响应式系统**：基于 Proxy 的响应式系统，性能更优

#### TypeScript 5.6.2
- **类型安全**：减少运行时错误，提高代码质量
- **更好的 IDE 支持**：自动补全和重构功能强大
- **代码可维护性**：大型项目更易维护，团队协作更高效

### 路由管理

#### Vue Router 4.5.0
- **官方路由解决方案**：与 Vue 3 深度集成
- **Hash 模式**：使用 `createWebHashHistory` 避免 GitHub Pages 路由问题
- **动态路由**：支持懒加载，优化首屏加载性能
- **路由守卫**：提供导航守卫功能

### 内容渲染

#### Markdown-it 14.1.0
- **强大的 Markdown 解析器**：支持完整的 Markdown 语法
- **可扩展性**：支持插件系统，可自定义渲染规则
- **安全性**：HTML 转义，防止 XSS 攻击
- **性能优秀**：解析速度快，内存占用低

#### Highlight.js 11.11.1
- **代码语法高亮**：支持 190+ 种编程语言
- **主题丰富**：提供多种高亮主题
- **性能优化**：按需加载语言包，减少包体积
- **浏览器兼容**：支持所有现代浏览器

#### MathJax 3.2.2
- **数学公式渲染**：支持 LaTeX 语法
- **行内公式**：使用 `$...$` 语法
- **块级公式**：使用 `$$...$$` 语法
- **CDN 动态加载**：避免安装问题，加载灵活

### 数据处理

#### Gray-matter 4.0.3
- **Frontmatter 解析**：支持 YAML 格式的元数据
- **自定义解析器**：项目实现了浏览器兼容的解析器
- **类型安全**：完整的 TypeScript 类型定义

### 开发工具

#### @types/markdown-it 14.1.2
- **TypeScript 类型定义**：为 markdown-it 提供完整的类型支持
- **开发体验**：提供智能提示和类型检查

#### Vue TSC 2.1.10
- **Vue 3 TypeScript 检查**：专门用于 Vue 3 项目的类型检查
- **模板类型推断**：支持 Vue 模板的类型检查

## 项目功能特性

### 已实现功能

#### 1. 文章管理系统
- Markdown 文章渲染
- Frontmatter 元数据解析（标题、日期、标签、分类、摘要）
- 文章列表展示（按时间排序）
- 文章详情页
- 阅读时间计算（智能计算中文字符、英文单词、代码行数和图片数量）

#### 2. 标签和分类系统
- 标签列表页面（Tags.vue）
- 标签详情页面（Tag.vue）
- 分类列表页面（Categories.vue）
- 分类详情页面（Category.vue）
- 标签云展示（按文章数量调整大小）
- 分类列表展示（带文章数量）

#### 3. 搜索功能
- 搜索输入框组件（SearchInput.vue）
- 搜索结果页面（Search.vue）
- 多关键词搜索（空格分隔）
- 搜索结果相关性排序
- 搜索关键词高亮显示
- 搜索快捷键支持（Ctrl+K）
- 支持标题、内容、标签、分类搜索

#### 4. 代码高亮系统
- 代码语法高亮（支持 JavaScript、TypeScript、Python、Java、Go、Rust、C++、Bash、CSS、HTML、JSON、YAML、Markdown 等）
- 代码行号显示
- 代码复制按钮（右上角）
- 复制成功提示动画
- 深色/浅色主题适配

#### 5. 数学公式渲染
- 行内公式支持（`$...$`）
- 块级公式支持（`$$...$$`）
- 公式渲染不受 Markdown 正文行高影响
- 上标下标正确渲染
- 积分符号上下界正确显示
- 分式分子分母间距正常
- 深色/浅色主题适配

#### 6. 主题系统
- 深色/浅色主题切换
- CSS 变量支持两种主题
- 主题状态管理（useTheme 组合式函数）
- 主题持久化（localStorage）
- 系统主题自动检测（prefers-color-scheme）
- 主题切换动画效果

#### 7. 阅读体验优化
- 阅读进度条组件（ReadingProgressBar.vue）
- 滚动监听和进度计算逻辑
- 进度条动画效果（平滑过渡）
- 目录导航组件（TableOfContents.vue）
- 多级标题支持（1-6 级）
- 目录项点击跳转（平滑滚动）
- 滚动时自动高亮当前章节
- 固定定位（右侧悬浮）
- 响应式设计（小屏幕自动隐藏）

#### 8. 响应式设计
- 移动端适配
- 平板端适配
- 桌面端优化

#### 9. 自动部署
- GitHub Actions 自动部署配置
- 自动构建和部署到 GitHub Pages
- 推送到 main 分支后自动触发部署流程

## 项目结构

```
blog/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署配置
├── articles/                   # Markdown 文章源文件
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── highlight.css   # 代码高亮样式
│   │       ├── main.css        # 全局样式
│   │       └── variables.css   # CSS 变量（主题系统）
│   ├── components/
│   │   ├── ArticleCard.vue     # 文章卡片组件
│   │   ├── Layout.vue          # 布局组件
│   │   ├── MarkdownRenderer.vue # Markdown 渲染器
│   │   ├── ReadingProgressBar.vue # 阅读进度条
│   │   ├── SearchInput.vue     # 搜索输入框
│   │   ├── TableOfContents.vue # 目录导航组件
│   │   └── ThemeToggle.vue     # 主题切换组件
│   ├── composables/
│   │   └── useTheme.ts         # 主题管理组合式函数
│   ├── types/
│   │   └── article.ts          # 文章相关类型定义
│   ├── utils/
│   │   ├── aggregation.ts      # 标签和分类聚合工具
│   │   ├── article.ts          # Frontmatter 解析工具
│   │   ├── calculateReadingTime.ts # 阅读时间计算工具
│   │   ├── markdownItMathJax.ts # Markdown-it 数学公式插件
│   │   ├── mathjax.ts          # MathJax 加载和配置工具
│   │   ├── parseTOC.ts         # 目录解析工具
│   │   └── search.ts           # 搜索算法工具
│   ├── views/
│   │   ├── Article.vue         # 文章详情页
│   │   ├── Categories.vue      # 分类列表页
│   │   ├── Category.vue        # 分类详情页
│   │   ├── Home.vue            # 首页
│   │   ├── Search.vue          # 搜索结果页
│   │   ├── Tag.vue             # 标签详情页
│   │   └── Tags.vue            # 标签列表页
│   ├── App.vue                 # 根组件
│   ├── main.ts                 # 入口文件
│   └── vite-env.d.ts           # TypeScript 类型声明
├── .gitignore
├── LICENSE
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## 项目初始化

### 1. 创建项目

```bash
npm create vite@latest blog -- --template vue-ts
cd blog
npm install
```

### 2. 安装依赖

```bash
# 安装 Vue Router
npm install vue-router

# 安装 Markdown 相关依赖
npm install markdown-it gray-matter highlight.js

# 安装类型定义
npm install -D @types/markdown-it
```

### 3. 配置 TypeScript

在 `tsconfig.json` 中配置：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### 4. 配置 Vite

在 `vite.config.ts` 中配置：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

## 核心功能实现

### 1. 路由配置

在 `src/main.ts` 中配置路由：

```typescript
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './assets/styles/main.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/article/:slug',
      name: 'article',
      component: () => import('./views/Article.vue')
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('./views/Tags.vue')
    },
    {
      path: '/tag/:tagName',
      name: 'tag',
      component: () => import('./views/Tag.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('./views/Categories.vue')
    },
    {
      path: '/category/:categoryName',
      name: 'category',
      component: () => import('./views/Category.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue')
    }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
```

### 2. 类型定义

在 `src/types/article.ts` 中定义类型：

```typescript
export interface ArticleMeta {
  title: string
  date: string
  tags?: string[]
  category?: string
  excerpt?: string
  readingTime?: number
}

export interface Article extends ArticleMeta {
  slug: string
  content: string
}

export interface ArticleListItem {
  slug: string
  title: string
  date: string
  tags?: string[]
  category?: string
  excerpt: string
  readingTime?: number
}

export interface TOCItem {
  id: string
  text: string
  level: number
  children?: TOCItem[]
}
```

### 3. Frontmatter 解析

在 `src/utils/article.ts` 中实现 Frontmatter 解析：

```typescript
import type { Article, ArticleMeta } from '../types/article'
import { calculateReadingTime } from './calculateReadingTime'

export function parseFrontmatter(content: string, slug: string): Article {
  const result = parseSimpleFrontmatter(content)
  
  const meta: ArticleMeta = {
    title: result.data.title || slug,
    date: result.data.date || new Date().toISOString(),
    tags: result.data.tags || [],
    category: result.data.category || '',
    excerpt: result.data.excerpt || generateExcerpt(result.content),
    readingTime: result.data.readingTime || calculateReadingTime(result.content).minutes
  }
  
  return {
    ...meta,
    slug,
    content: result.content
  }
}

interface ParseResult {
  data: Record<string, any>
  content: string
}

function parseSimpleFrontmatter(content: string): ParseResult {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { data: {}, content }
  }
  
  const frontmatter = match[1]
  const markdownContent = match[2]
  
  const data = parseYaml(frontmatter)
  
  return { data, content: markdownContent }
}

function parseYaml(yaml: string): Record<string, any> {
  const result: Record<string, any> = {}
  const lines = yaml.split('\n')
  let currentKey: string | null = null
  let currentArray: string[] = []
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    
    const colonIndex = trimmed.indexOf(':')
    
    if (colonIndex !== -1) {
      if (currentKey && currentArray.length > 0) {
        result[currentKey] = currentArray
        currentArray = []
      }
      
      currentKey = trimmed.substring(0, colonIndex).trim()
      const value = trimmed.substring(colonIndex + 1).trim()
      
      if (value) {
        result[currentKey] = parseValue(value)
        currentKey = null
      }
    } else if (trimmed.startsWith('-') && currentKey) {
      const arrayValue = trimmed.substring(1).trim()
      if (arrayValue) {
        currentArray.push(parseValue(arrayValue))
      }
    }
  }
  
  if (currentKey && currentArray.length > 0) {
    result[currentKey] = currentArray
  }
  
  return result
}

function parseValue(value: string): any {
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1)
  }
  
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1)
  }
  
  if (value === 'true') return true
  if (value === 'false') return false
  if (value === 'null') return null
  
  const num = Number(value)
  if (!isNaN(num)) return num
  
  return value
}

function generateExcerpt(content: string, maxLength: number = 200): string {
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .substring(0, maxLength)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
```

### 4. Markdown 渲染器

在 `src/components/MarkdownRenderer.vue` 中实现 Markdown 渲染：

```vue
<template>
  <div class="markdown-renderer" ref="rendererRef" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, nextTick, watch, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/github.css'
import 'highlight.js/styles/github-dark.css'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import html from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import markdownItMathJax from '../utils/markdownItMathJax'
import { useMathJax } from '../utils/mathjax'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)
hljs.registerLanguage('html', html)
hljs.registerLanguage('json', json)

const md: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code class="language-${lang}">${hljs.highlight(str, { language: lang }).value}</code></pre>`
      } catch (__) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})

md.use(markdownItMathJax)

md.renderer.rules.heading_open = function (tokens, idx) {
  const level = tokens[idx].tag
  const text = tokens[idx + 1].content
  const id = text
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fa5-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  return `<${level} id="${id}">`
}

const props = defineProps<{
  content: string
}>()

const { loadMathJax, typeset } = useMathJax()
const rendererRef = ref<HTMLElement>()

const renderedContent = computed(() => {
  return md.render(props.content)
})

onMounted(async () => {
  await loadMathJax()
  nextTick(() => {
    addCopyButtons()
    addLineNumbers()
    typeset(rendererRef.value)
  })
})

watch(() => props.content, async () => {
  await loadMathJax()
  nextTick(() => {
    typeset(rendererRef.value)
  })
})

const addCopyButtons = () => {
  const codeBlocks = document.querySelectorAll('.markdown-renderer pre.hljs')
  codeBlocks.forEach((block) => {
    if (block.querySelector('.copy-button')) return
    
    const button = document.createElement('button')
    button.className = 'copy-button'
    button.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    `
    button.addEventListener('click', async () => {
      const code = block.querySelector('code')?.textContent || ''
      try {
        await navigator.clipboard.writeText(code)
        button.classList.add('copied')
        button.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `
        setTimeout(() => {
          button.classList.remove('copied')
          button.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          `
        }, 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    })
    block.appendChild(button)
  })
}

const addLineNumbers = () => {
  const codeBlocks = document.querySelectorAll('.markdown-renderer pre.hljs')
  codeBlocks.forEach((block) => {
    const code = block.querySelector('code')
    if (!code) return
    
    const lines = code.innerHTML.split('\n')
    if (lines.length <= 1) return
    
    const lineNumbersHtml = lines.map((_, i) => `<span class="line-number">${i + 1}</span>`).join('')
    const lineNumbersContainer = document.createElement('div')
    lineNumbersContainer.className = 'line-numbers'
    lineNumbersContainer.innerHTML = lineNumbersHtml
    
    block.insertBefore(lineNumbersContainer, code)
  })
}
</script>

<style scoped>
.markdown-renderer {
  color: var(--color-text);
}

.markdown-renderer :deep(p) {
  margin-bottom: var(--spacing-lg);
}

.markdown-renderer :deep(h1),
.markdown-renderer :deep(h2),
.markdown-renderer :deep(h3),
.markdown-renderer :deep(h4),
.markdown-renderer :deep(h5),
.markdown-renderer :deep(h6) {
  margin-top: var(--spacing-2xl);
  margin-bottom: var(--spacing-lg);
  font-weight: 700;
  line-height: 1.3;
}

.markdown-renderer :deep(h1) {
  font-size: var(--font-size-3xl);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: var(--spacing-md);
}

.markdown-renderer :deep(h2) {
  font-size: var(--font-size-2xl);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-sm);
}

.markdown-renderer :deep(h3) {
  font-size: var(--font-size-xl);
}

.markdown-renderer :deep(code) {
  background-color: var(--code-bg);
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-family: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  color: var(--code-text);
  border: 1px solid var(--code-border);
}

.markdown-renderer :deep(pre) {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  overflow-x: auto;
  margin-bottom: var(--spacing-lg);
  position: relative;
}

.markdown-renderer :deep(pre.hljs) {
  background-color: var(--code-bg) !important;
  border: 1px solid var(--code-border);
  padding: 0 !important;
  margin-bottom: var(--spacing-lg);
  display: flex !important;
  overflow-x: auto;
  transition: all 0.2s;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.markdown-renderer :deep(pre.hljs:hover) {
  border-color: var(--code-border-hover) !important;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.markdown-renderer :deep(pre code) {
  background-color: var(--code-bg) !important;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) var(--spacing-sm) !important;
  border-radius: 0;
  font-family: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace !important;
  font-size: 0.9em !important;
  line-height: 1.6 !important;
  display: block;
  white-space: pre !important;
  flex: 1;
  margin: 0 !important;
  box-sizing: border-box;
  color: var(--code-text) !important;
  border: 0 !important;
}

.markdown-renderer :deep(.line-numbers) {
  flex-shrink: 0;
  width: 3em !important;
  min-width: 3em !important;
  max-width: 3em !important;
  padding: var(--spacing-md) var(--spacing-sm) var(--spacing-md) 0 !important;
  text-align: right;
  border-right: 1px solid var(--code-border) !important;
  border: 0 !important;
  background-color: var(--code-bg-secondary) !important;
  user-select: none;
  overflow: hidden;
  box-sizing: border-box;
  display: flex !important;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 !important;
}

.markdown-renderer :deep(.line-number) {
  display: block;
  color: var(--code-line-number);
  font-family: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace !important;
  font-size: 0.9em !important;
  line-height: 1.6 !important;
  padding: 0 !important;
  margin: 0 !important;
  box-sizing: border-box;
  align-self: flex-end;
}

.markdown-renderer :deep(.copy-button) {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background-color: var(--code-bg-secondary);
  border: 1px solid var(--code-border);
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--code-text);
  font-size: 0.85em;
  transition: all 0.2s;
}

.markdown-renderer :deep(.copy-button:hover) {
  background-color: var(--code-bg-hover);
  border-color: var(--code-border-hover);
}

.markdown-renderer :deep(.copy-button.copied) {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.markdown-renderer :deep(.copy-button svg) {
  width: 14px;
  height: 14px;
}

.markdown-renderer :deep(ul),
.markdown-renderer :deep(ol) {
  margin-bottom: var(--spacing-lg);
  padding-left: var(--spacing-xl);
}

.markdown-renderer :deep(li) {
  margin-bottom: var(--spacing-sm);
}

.markdown-renderer :deep(blockquote) {
  border-left: 4px solid var(--color-primary);
  padding-left: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  color: var(--color-text-light);
  font-style: italic;
}

.markdown-renderer :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-lg);
}

.markdown-renderer :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: var(--spacing-lg);
}

.markdown-renderer :deep(th),
.markdown-renderer :deep(td) {
  border: 1px solid var(--color-border);
  padding: var(--spacing-sm) var(--spacing-md);
  text-align: left;
}

.markdown-renderer :deep(th) {
  background-color: var(--color-bg-secondary);
  font-weight: 600;
}

.markdown-renderer :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: var(--spacing-2xl) 0;
}

.markdown-renderer :deep(.mathjax-inline) {
  display: inline;
  margin: 0 0.1em;
}

.markdown-renderer :deep(.mathjax-display) {
  display: block;
  margin: var(--spacing-lg) 0;
  overflow-x: auto;
  text-align: center;
}

.markdown-renderer :deep(.mjx-chtml) {
  color: var(--color-text);
  font-size: 1em;
  line-height: 1.2;
}

.markdown-renderer :deep(.mjx-math) {
  color: var(--color-text);
}

.markdown-renderer :deep(.mjx-container) {
  font-size: 100% !important;
  margin: 0 !important;
}
</style>
```

### 5. 搜索功能

在 `src/utils/search.ts` 中实现搜索算法：

```typescript
import type { ArticleListItem } from '../types/article'

export interface SearchResult extends ArticleListItem {
  score: number
  matchedFields: string[]
}

export function searchArticles(
  articles: ArticleListItem[],
  query: string
): SearchResult[] {
  if (!query.trim()) {
    return []
  }

  const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 0)
  const results: SearchResult[] = []

  for (const article of articles) {
    const score = calculateScore(article, keywords)
    if (score > 0) {
      const matchedFields = getMatchedFields(article, keywords)
      results.push({
        ...article,
        score,
        matchedFields
      })
    }
  }

  return results.sort((a, b) => b.score - a.score)
}

function calculateScore(article: ArticleListItem, keywords: string[]): number {
  let score = 0

  for (const keyword of keywords) {
    const titleLower = article.title.toLowerCase()
    const excerptLower = article.excerpt.toLowerCase()
    const tagsLower = article.tags?.map(t => t.toLowerCase()) || []
    const categoryLower = article.category?.toLowerCase() || ''

    if (titleLower.includes(keyword)) {
      score += 10
      if (titleLower.startsWith(keyword)) {
        score += 5
      }
    }

    if (excerptLower.includes(keyword)) {
      score += 3
    }

    for (const tag of tagsLower) {
      if (tag.includes(keyword)) {
        score += 7
        if (tag === keyword) {
          score += 3
        }
      }
    }

    if (categoryLower.includes(keyword)) {
      score += 7
      if (categoryLower === keyword) {
        score += 3
      }
    }
  }

  return score
}

function getMatchedFields(article: ArticleListItem, keywords: string[]): string[] {
  const fields: string[] = []

  for (const keyword of keywords) {
    const titleLower = article.title.toLowerCase()
    const excerptLower = article.excerpt.toLowerCase()
    const tagsLower = article.tags?.map(t => t.toLowerCase()) || []
    const categoryLower = article.category?.toLowerCase() || ''

    if (titleLower.includes(keyword)) {
      if (!fields.includes('title')) {
        fields.push('title')
      }
    }

    if (excerptLower.includes(keyword)) {
      if (!fields.includes('content')) {
        fields.push('content')
      }
    }

    for (const tag of tagsLower) {
      if (tag.includes(keyword)) {
        if (!fields.includes('tags')) {
          fields.push('tags')
        }
        break
      }
    }

    if (categoryLower.includes(keyword)) {
      if (!fields.includes('category')) {
        fields.push('category')
      }
    }
  }

  return fields
}

export function highlightText(text: string, query: string): string {
  if (!query.trim()) {
    return text
  }

  const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 0)
  let highlightedText = text

  for (const keyword of keywords) {
    const regex = new RegExp(`(${escapeRegExp(keyword)})`, 'gi')
    highlightedText = highlightedText.replace(regex, '<mark>$1</mark>')
  }

  return highlightedText
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
```

### 6. 主题系统

在 `src/composables/useTheme.ts` 中实现主题管理：

```typescript
import { ref, watch, onMounted } from 'vue'

type Theme = 'light' | 'dark'

const currentTheme = ref<Theme>('light')

export function useTheme() {
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }

  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
  }

  const applyTheme = (theme: Theme) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    
    currentTheme.value = savedTheme || systemTheme
    applyTheme(currentTheme.value)
  }

  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme)
  })

  onMounted(() => {
    initTheme()
  })

  return {
    currentTheme,
    toggleTheme,
    setTheme
  }
}
```

在 `src/assets/styles/variables.css` 中定义 CSS 变量：

```css
:root {
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-text: #1f2937;
  --color-text-light: #6b7280;
  --color-bg: #ffffff;
  --color-bg-secondary: #f9fafb;
  --color-border: #e5e7eb;
  --border-radius: 0.5rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --code-bg: #f6f8fa;
  --code-bg-secondary: #f1f3f5;
  --code-bg-hover: #e8ebf0;
  --code-text: #24292e;
  --code-border: #d0d7de;
  --code-border-hover: #c8d1d9;
  --code-line-number: #6e7781;
}

[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-primary-dark: #3b82f6;
  --color-text: #f9fafb;
  --color-text-light: #9ca3af;
  --color-bg: #111827;
  --color-bg-secondary: #1f2937;
  --color-border: #374151;
  --code-bg: #0d1117;
  --code-bg-secondary: #161b22;
  --code-bg-hover: #21262d;
  --code-text: #c9d1d9;
  --code-border: #30363d;
  --code-border-hover: #484f58;
  --code-line-number: #8b949e;
}
```

### 7. 阅读时间计算

在 `src/utils/calculateReadingTime.ts` 中实现阅读时间计算：

```typescript
export function calculateReadingTime(content: string): { minutes: number } {
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishWords = (content.match(/[a-zA-Z]+/g) || []).length
  const codeLines = (content.match(/```[\s\S]*?```/g) || []).length
  const images = (content.match(/!\[.*?\]\(.*?\)/g) || []).length

  const chineseReadingTime = chineseChars / 500
  const englishReadingTime = englishWords / 200
  const codeReadingTime = codeLines * 0.5
  const imageReadingTime = images * 0.5

  const totalMinutes = Math.ceil(chineseReadingTime + englishReadingTime + codeReadingTime + imageReadingTime)

  return { minutes: totalMinutes }
}
```

## 开发和构建

### 开发模式

```bash
npm run dev
```

### 生产构建

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 添加新文章

在 `articles/` 目录下创建新的 Markdown 文件，文件名即为文章的 slug。

文章格式示例：

```markdown
---
title: 文章标题
date: 2026-01-10
tags:
  - 标签1
  - 标签2
category: 分类名称
excerpt: 文章摘要
---

这里是文章内容...

```



## 部署

### GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 `gh-pages` 分支或 `main` 分支的 `/docs` 目录
4. 配置自定义域名（可选）

### 自动部署

使用 GitHub Actions 自动构建和部署：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          destination_dir: .
```

## 最佳实践

1. **使用组合式 API**：更灵活的逻辑复用，代码更易维护
2. **类型定义**：充分利用 TypeScript 的类型系统，提高代码质量
3. **组件拆分**：保持组件单一职责，提高可复用性
4. **代码分割**：使用动态导入优化加载性能
5. **CSS 变量**：使用 CSS 变量实现主题切换，提高可维护性
6. **响应式设计**：确保在不同设备上都有良好的用户体验
7. **性能优化**：按需加载语言包，减少包体积
8. **代码规范**：遵循 Vue 3 和 TypeScript 的最佳实践


