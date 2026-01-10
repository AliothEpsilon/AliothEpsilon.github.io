<template>
  <div class="article-container" v-if="article">
    <div class="article-content">
      <h1 class="article-title">{{ article.title }}</h1>
      <div class="article-meta">
        <span class="article-date">{{ formatDate(article.date) }}</span>
        <span v-if="article.category" class="article-category">{{ article.category }}</span>
      </div>
      <div v-if="article.tags && article.tags.length > 0" class="article-tags">
        <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <MarkdownRenderer :content="article.content" />
      <RouterLink to="/" class="back-link">← 返回首页</RouterLink>
    </div>
    <TableOfContents :items="toc" />
  </div>
  <div v-else class="not-found">
    <h1>文章未找到</h1>
    <RouterLink to="/">返回首页</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownRenderer from '../components/MarkdownRenderer.vue'
import TableOfContents from '../components/TableOfContents.vue'
import { parseFrontmatter, formatDate } from '../utils/article'
import { parseTOC } from '../utils/parseTOC'
import type { Article } from '../types/article'
import type { TOCItem } from '../types/article'

const route = useRoute()
const article = ref<Article | null>(null)
const toc = ref<TOCItem[]>([])

onMounted(async () => {
  const slug = route.params.slug as string
  
  try {
    const articleModules = import.meta.glob('../../articles/*.md', { query: '?raw', import: 'default' })
    const articlePath = `../../articles/${slug}.md`
    
    if (articleModules[articlePath]) {
      const content = await articleModules[articlePath]() as string
      article.value = parseFrontmatter(content, slug)
      toc.value = parseTOC(content)
    }
  } catch (error) {
    console.error('Failed to load article:', error)
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

.back-link {
  display: inline-block;
  margin-top: var(--spacing-2xl);
  color: var(--color-primary);
  font-weight: 500;
}

.back-link:hover {
  color: var(--color-primary-dark);
}

.not-found {
  text-align: center;
  padding: var(--spacing-2xl);
}
</style>
