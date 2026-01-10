# AliothEpsilon.github.io

基于 Vite + Vue 3 + TypeScript 构建的个人博客系统。

## 技术栈

- **Vite** - 极速的构建工具
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集
- **Vue Router** - Vue 官方路由
- **Markdown-it** - Markdown 解析器

## 项目结构

```
blog/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 资源文件
│   │   └── styles/
│   │       ├── main.css   # 全局样式
│   │       └── variables.css  # CSS 变量
│   ├── components/        # 组件
│   │   ├── ArticleCard.vue    # 文章卡片
│   │   ├── Layout.vue      # 布局组件
│   │   ├── MarkdownRenderer.vue  # Markdown 渲染器
│   │   ├── SearchInput.vue  # 搜索输入框
│   │   └── ThemeToggle.vue # 主题切换组件
│   ├── composables/       # 组合式函数
│   │   └── useTheme.ts    # 主题管理
│   ├── types/             # TypeScript 类型定义
│   │   └── article.ts     # 文章相关类型
│   ├── utils/             # 工具函数
│   │   ├── aggregation.ts # 标签和分类聚合工具
│   │   ├── article.ts     # Frontmatter 解析工具
│   │   └── search.ts      # 搜索算法工具
│   ├── views/             # 页面
│   │   ├── Article.vue    # 文章详情页
│   │   ├── Categories.vue # 分类列表页
│   │   ├── Category.vue   # 分类详情页
│   │   ├── Home.vue       # 首页
│   │   ├── Search.vue     # 搜索结果页
│   │   ├── Tag.vue        # 标签详情页
│   │   └── Tags.vue       # 标签列表页
│   ├── App.vue            # 根组件
│   ├── main.ts            # 入口文件
│   └── vite-env.d.ts      # TypeScript 类型声明
├── articles/              # Markdown 文章源文件
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tsconfig.node.json
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看博客

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 预览生产构建

```bash
npm run preview
```

## 添加新文章

在 `articles/` 目录下创建新的 Markdown 文件，文件名即为文章的 slug。

文章格式示例：

```markdown
# 文章标题

date: 2024-01-10

这里是文章内容...

## 二级标题

- 列表项 1
- 列表项 2

代码示例：

```javascript
console.log('Hello, World!')
```
```

## 功能特性

### 第一阶段（已完成）

- ✅ 项目基础架构搭建（Vite + Vue 3 + TypeScript）
- ✅ 基础路由系统
- ✅ Markdown 文章渲染基础能力
- ✅ 首页布局（文章列表）
- ✅ 文章详情页
- ✅ 基础样式系统
- ✅ 响应式设计

### 第二阶段（已完成）

- ✅ 文章 Frontmatter 解析（标题、日期、标签、分类、摘要）
- ✅ 文章列表按时间排序
- ✅ 自定义 Frontmatter 解析器（浏览器兼容）
- ✅ TypeScript 类型定义系统
- ✅ 文章元数据展示

### 第三阶段（已完成）

- ✅ 标签列表页面（Tags.vue）
- ✅ 标签详情页面（Tag.vue）
- ✅ 分类列表页面（Categories.vue）
- ✅ 分类详情页面（Category.vue）
- ✅ 标签和分类数据聚合工具
- ✅ 文章卡片中的标签和分类链接
- ✅ 导航菜单中的标签和分类入口
- ✅ 标签云展示（按文章数量调整大小）
- ✅ 分类列表展示（带文章数量）

### 第四阶段（已完成）

- ✅ 搜索输入框组件（SearchInput.vue）
- ✅ 搜索结果页面（Search.vue）
- ✅ 搜索算法工具（支持标题、内容、标签、分类搜索）
- ✅ 多关键词搜索（空格分隔）
- ✅ 搜索结果相关性排序
- ✅ 搜索关键词高亮显示
- ✅ 搜索快捷键支持（Ctrl+K）
- ✅ 导航菜单中的搜索入口
- ✅ 匹配字段标签显示

### 第五阶段（已完成）

- ✅ 深色/浅色主题系统设计
- ✅ CSS 变量支持两种主题（浅色/深色）
- ✅ 主题切换组件（ThemeToggle.vue）
- ✅ 主题状态管理（useTheme 组合式函数）
- ✅ 主题持久化（localStorage）
- ✅ 系统主题自动检测（prefers-color-scheme）
- ✅ 导航栏主题切换按钮
- ✅ 主题切换动画效果

### 后续计划

- [ ] 代码高亮
- [ ] 评论系统集成
- [ ] 阅读进度条
- [ ] 目录导航（TOC）
- [ ] SEO 优化
- [ ] Sitemap 生成
- [ ] RSS Feed 生成

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
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 许可证

MIT
