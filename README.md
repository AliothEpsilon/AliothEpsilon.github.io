# AliothEpsilon.github.io

基于 Vite + Vue 3 + TypeScript 构建的个人博客系统。

## 技术栈

- **Vite** - 极速的构建工具
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集
- **Vue Router** - Vue 官方路由
- **Markdown-it** - Markdown 解析器
- **Highlight.js** - 代码语法高亮
- **MathJax** - 数学公式渲染

## 项目结构

```
blog/
├── .github/              # GitHub 配置
│   └── workflows/
│       └── deploy.yml   # GitHub Actions 自动部署配置
├── src/
│   ├── assets/          # 资源文件
│   │   └── styles/
│   │       ├── highlight.css  # 代码高亮样式
│   │       ├── main.css # 全局样式
│   │       └── variables.css  # CSS 变量
│   ├── components/      # 组件
│   │   ├── ArticleCard.vue    # 文章卡片
│   │   ├── Layout.vue      # 布局组件
│   │   ├── MarkdownRenderer.vue  # Markdown 渲染器
│   │   ├── ReadingProgressBar.vue  # 阅读进度条
│   │   ├── SearchInput.vue  # 搜索输入框
│   │   ├── TableOfContents.vue  # 目录导航组件
│   │   └── ThemeToggle.vue # 主题切换组件
│   ├── composables/     # 组合式函数
│   │   └── useTheme.ts  # 主题管理
│   ├── types/           # TypeScript 类型定义
│   │   └── article.ts   # 文章相关类型（Article、ArticleMeta、ArticleListItem、TOCItem）
│   ├── utils/           # 工具函数
│   │   ├── aggregation.ts # 标签和分类聚合工具
│   │   ├── article.ts   # Frontmatter 解析工具
│   │   ├── markdownItMathJax.ts # Markdown-it 数学公式插件
│   │   ├── mathjax.ts   # MathJax 加载和配置工具
│   │   ├── parseTOC.ts  # 目录解析工具
│   │   └── search.ts    # 搜索算法工具
│   ├── views/           # 页面
│   │   ├── Article.vue  # 文章详情页
│   │   ├── Categories.vue # 分类列表页
│   │   ├── Category.vue # 分类详情页
│   │   ├── Home.vue     # 首页
│   │   ├── Search.vue   # 搜索结果页
│   │   ├── Tag.vue      # 标签详情页
│   │   └── Tags.vue     # 标签列表页
│   ├── App.vue          # 根组件
│   ├── main.ts          # 入口文件
│   └── vite-env.d.ts    # TypeScript 类型声明
├── articles/            # Markdown 文章源文件
├── .gitignore           # Git 忽略文件配置
├── LICENSE              # MIT 开源许可证
├── index.html           # HTML 入口文件
├── package.json         # 项目配置和依赖
├── package-lock.json    # 依赖版本锁定文件
├── tsconfig.json        # TypeScript 配置
├── tsconfig.node.json   # Node.js TypeScript 配置
├── vite.config.ts       # Vite 构建配置
└── README.md            # 项目文档
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

date: 2025-01-10

这里是文章内容...

## 二级标题

- 列表项 1
- 列表项 2

代码示例：

```javascript
console.log('Hello, World!')
```

数学公式示例：

行内公式：$E = mc^2$

块级公式：

$$
\int_{a}^{b} f(x) dx = F(b) - F(a)
$$

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$



## 功能特性

### 版权保护（已完成）

- ✅ MIT 开源许可证声明（LICENSE）
- ✅ 页面版权声明（HTML meta 标签）
- ✅ 页脚版权信息和许可证提示
- ✅ 法律保护框架
- ✅ GitHub Actions 自动部署配置

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

### 第六阶段（已完成）

- ✅ 代码语法高亮系统（基于 highlight.js）
- ✅ 支持多种编程语言高亮（JavaScript、TypeScript、Python、CSS、HTML、Bash、JSON 等）
- ✅ 代码行号显示
- ✅ 代码复制按钮（右上角）
- ✅ 复制成功提示动画
- ✅ 深色/浅色主题下的代码样式适配
- ✅ 代码块样式优化（背景色、边框、悬停效果）
- ✅ 行号样式（颜色、对齐、间距）
- ✅ 复制按钮样式（图标、悬停效果、点击反馈）
- ✅ TypeScript 类型安全（md 变量类型注解、highlight 函数返回类型）

### 第七阶段（已完成）

- ✅ 阅读进度条组件（ReadingProgressBar.vue）
- ✅ 滚动监听和进度计算逻辑
- ✅ 进度条样式（固定在顶部，3px 高度）
- ✅ 进度条动画效果（平滑过渡）
- ✅ 深色/浅色主题适配
- ✅ 文章详情页集成
- ✅ CSS 变量支持（进度条颜色）

### 第八阶段（已完成）

- ✅ 目录导航组件（TableOfContents.vue）
- ✅ 目录解析工具（parseTOC.ts）
- ✅ 目录项类型定义（TOCItem）
- ✅ 多级标题支持（1-6 级）
- ✅ 目录项点击跳转（平滑滚动）
- ✅ 滚动时自动高亮当前章节
- ✅ 固定定位（右侧悬浮）
- ✅ 响应式设计（小屏幕自动隐藏）
- ✅ 文章详情页集成

### 第九阶段（已完成）

- ✅ 数学公式渲染系统（基于 MathJax 3.2.2）
- ✅ Markdown-it 数学公式插件（markdownItMathJax.ts）
- ✅ MathJax 加载和配置工具（mathjax.ts）
- ✅ 行内公式支持（`$...$`）
- ✅ 块级公式支持（`$$...$$`）
- ✅ 公式渲染不受 Markdown 正文行高影响
- ✅ 上标下标正确渲染
- ✅ 积分符号上下界正确显示
- ✅ 分式分子分母间距正常
- ✅ 深色/浅色主题适配
- ✅ CDN 动态加载（避免安装问题）
- ✅ TypeScript 类型安全

### 第十阶段（已完成）

- ✅ 阅读时间计算工具（calculateReadingTime.ts）
- ✅ 智能计算中文字符、英文单词、代码行数和图片数量
- ✅ 中文阅读速度：500 字/分钟
- ✅ 英文阅读速度：200 词/分钟
- ✅ 代码阅读速度：50 行/分钟
- ✅ 图片阅读时间：0.5 分钟/张
- ✅ 文章详情页显示阅读时间
- ✅ 文章列表卡片显示阅读时间
- ✅ 首页文章列表显示阅读时间
- ✅ 标签页文章列表显示阅读时间
- ✅ 分类页文章列表显示阅读时间
- ✅ 搜索结果显示阅读时间
- ✅ 时钟图标显示
- ✅ 深色/浅色主题适配
- ✅ TypeScript 类型安全

### 后续计划

- [ ] 评论系统集成
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

**部署说明**：
- 使用 hash 路由模式（`createWebHashHistory`）避免 GitHub Pages 路由问题
- 自动部署到 `gh-pages` 分支的根目录
- 推送到 `main` 分支后自动触发部署流程

## 许可证

MIT
