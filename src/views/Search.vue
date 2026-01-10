<template>
  <div class="search-page">
    <div class="search-header">
      <h1 class="search-title">搜索</h1>
      <SearchInput ref="searchInputRef" @search="handleSearch" />
    </div>

    <div v-if="searchQuery" class="search-results">
      <div class="search-info">
        <span class="search-count">{{ results.length }} 篇文章</span>
        <span class="search-query">包含 "{{ searchQuery }}"</span>
      </div>

      <div v-if="results.length > 0" class="results-list">
        <div v-for="result in results" :key="result.slug" class="result-item">
          <RouterLink :to="`/article/${result.slug}`" class="result-link">
            <h2 class="result-title" v-html="highlightText(result.title, searchQuery)"></h2>
            <div class="result-meta">
              <span class="result-date">{{ formatDate(result.date) }}</span>
              <span v-if="result.category" class="result-category">{{ result.category }}</span>
              <div v-if="result.matchedFields" class="matched-fields">
                <span
                  v-for="field in result.matchedFields"
                  :key="field"
                  class="matched-field"
                >
                  {{ getFieldLabel(field) }}
                </span>
              </div>
            </div>
            <p class="result-excerpt" v-html="highlightText(result.excerpt, searchQuery)"></p>
            <div v-if="result.tags && result.tags.length > 0" class="result-tags">
              <span v-for="tag in result.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </RouterLink>
        </div>
      </div>

      <div v-else class="no-results">
        <p>没有找到匹配的文章</p>
        <p class="no-results-hint">尝试使用不同的关键词搜索</p>
      </div>
    </div>

    <div v-else class="search-placeholder">
      <p>输入关键词开始搜索文章</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import SearchInput from '../components/SearchInput.vue'
import { searchArticles, highlightText } from '../utils/search'
import { formatDate, parseFrontmatter } from '../utils/article'
import type { ArticleListItem } from '../types/article'
import type { SearchResult } from '../utils/search'

const route = useRoute()
const searchQuery = ref('')
const results = ref<SearchResult[]>([])

const handleSearch = (query: string) => {
  searchQuery.value = query
  performSearch()
}

const performSearch = async () => {
  if (!searchQuery.value.trim()) {
    results.value = []
    return
  }

  const articleModules = import.meta.glob('../../articles/*.md', { query: '?raw', import: 'default' })
  const articles: ArticleListItem[] = []

  for (const path in articleModules) {
    const loader = articleModules[path]
    const content = await loader() as string
    const slug = path.replace('../../articles/', '').replace('.md', '')
    
    const article = parseFrontmatter(content, slug)
    
    articles.push({
      slug: article.slug,
      title: article.title,
      date: article.date,
      tags: article.tags,
      category: article.category,
      excerpt: article.excerpt || '',
      readingTime: article.readingTime
    })
  }

  results.value = searchArticles(articles, searchQuery.value)
}

const getFieldLabel = (field: string): string => {
  const labels: Record<string, string> = {
    title: '标题',
    content: '内容',
    tags: '标签',
    category: '分类'
  }
  return labels[field] || field
}

watch(() => route.query.q, (newQuery) => {
  if (newQuery && typeof newQuery === 'string') {
    searchQuery.value = newQuery
    performSearch()
  }
}, { immediate: true })

onMounted(() => {
  if (route.query.q && typeof route.query.q === 'string') {
    searchQuery.value = route.query.q
    performSearch()
  }
})
</script>

<style scoped>
.search-page {
  max-width: 800px;
  margin: 0 auto;
}

.search-header {
  margin-bottom: var(--spacing-2xl);
}

.search-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  color: var(--color-text);
}

.search-info {
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-light);
}

.search-count {
  font-weight: 600;
  color: var(--color-text);
}

.search-query {
  margin-left: var(--spacing-sm);
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.result-item {
  padding-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border);
}

.result-item:last-child {
  border-bottom: none;
}

.result-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.result-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
}

.result-title :deep(mark) {
  background-color: var(--color-primary-light);
  color: var(--color-primary-dark);
  padding: 0.125rem 0.25rem;
  border-radius: var(--border-radius-sm);
}

.result-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
}

.result-date {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.result-category {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: 500;
}

.matched-fields {
  display: flex;
  gap: var(--spacing-sm);
  margin-left: auto;
}

.matched-field {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
}

.result-excerpt {
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.result-excerpt :deep(mark) {
  background-color: var(--color-primary-light);
  color: var(--color-primary-dark);
  padding: 0.125rem 0.25rem;
  border-radius: var(--border-radius-sm);
}

.result-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: var(--color-bg-secondary);
  border-radius: 9999px;
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  transition: background-color 0.2s;
}

.result-link:hover .result-title {
  color: var(--color-primary);
}

.result-link:hover .tag {
  background-color: var(--color-primary);
  color: white;
}

.no-results {
  text-align: center;
  padding: var(--spacing-3xl) 0;
  color: var(--color-text-light);
}

.no-results-hint {
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.search-placeholder {
  text-align: center;
  padding: var(--spacing-3xl) 0;
  color: var(--color-text-light);
}
</style>
