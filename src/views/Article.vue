<template>
  <div class="article-container" v-if="article">
    <div class="article-content">
      <h1 class="article-title">{{ article.title }}</h1>
      <div class="article-meta">
        <span class="article-date">{{ formatDate(article.date) }}</span>
        <span v-if="article.category" class="article-category">{{ article.category }}</span>
        <span v-if="article.readingTime" class="article-reading-time">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {{ article.readingTime }} 分钟
        </span>
      </div>
      <div v-if="article.tags && article.tags.length > 0" class="article-tags">
        <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <MarkdownRenderer :content="article.content" />
      <ArticlePrevNext :prevArticle="prevArticle" :nextArticle="nextArticle" />
    </div>
    <TableOfContents :items="toc" />
  </div>
  <div v-else class="not-found">
    <h1>文章未找到</h1>
    <RouterLink to="/">返回首页</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownRenderer from '../components/MarkdownRenderer.vue'
import TableOfContents from '../components/TableOfContents.vue'
import ArticlePrevNext from '../components/ArticlePrevNext.vue'
import { parseFrontmatter, formatDate } from '../utils/article'
import { parseTOC } from '../utils/parseTOC'
import type { Article, ArticleListItem } from '../types/article'
import type { TOCItem } from '../types/article'

const route = useRoute()
const article = ref<Article | null>(null)
const toc = ref<TOCItem[]>([])
const allArticles = ref<ArticleListItem[]>([])

const sortedArticles = computed(() => {
  return [...allArticles.value].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
})

const prevArticle = computed(() => {
  if (!article.value) return undefined
  const currentIndex = sortedArticles.value.findIndex(a => a.slug === article.value?.slug)
  if (currentIndex === -1 || currentIndex === sortedArticles.value.length - 1) return undefined
  return sortedArticles.value[currentIndex + 1]
})

const nextArticle = computed(() => {
  if (!article.value) return undefined
  const currentIndex = sortedArticles.value.findIndex(a => a.slug === article.value?.slug)
  if (currentIndex <= 0) return undefined
  return sortedArticles.value[currentIndex - 1]
})

const loadArticle = async (slug: string) => {
  try {
    const articleModules = import.meta.glob('../../articles/*.md', { query: '?raw', import: 'default' })
    const articlePath = `../../articles/${slug}.md`
    
    if (articleModules[articlePath]) {
      const content = await articleModules[articlePath]() as string
      article.value = parseFrontmatter(content, slug)
      toc.value = parseTOC(content)
    }
    
    const articles: ArticleListItem[] = []
    for (const path in articleModules) {
      const slugMatch = path.match(/articles\/(.+)\.md$/)
      if (slugMatch) {
        const articleSlug = slugMatch[1]
        const articleContent = await articleModules[path]() as string
        const parsedArticle = parseFrontmatter(articleContent, articleSlug)
        articles.push({
          slug: parsedArticle.slug,
          title: parsedArticle.title,
          date: parsedArticle.date,
          tags: parsedArticle.tags,
          category: parsedArticle.category,
          excerpt: parsedArticle.excerpt || '',
          readingTime: parsedArticle.readingTime,
          pinned: parsedArticle.pinned
        })
      }
    }
    allArticles.value = articles
  } catch (error) {
    console.error('Failed to load article:', error)
  }
}

onMounted(() => {
  const slug = route.params.slug as string
  loadArticle(slug)
})

watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    loadArticle(newSlug as string)
    window.scrollTo({ top: 0 })
  }
})
</script>

<style scoped>
.article-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.article-content {
  max-width: 800px;
}

.article-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  line-height: 1.3;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.article-date {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.article-category {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: 500;
}

.article-reading-time {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.article-reading-time svg {
  flex-shrink: 0;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-2xl);
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: var(--color-bg-secondary);
  border-radius: 9999px;
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.not-found {
  text-align: center;
  padding: var(--spacing-2xl);
}
</style>
