<template>
  <div class="category-page">
    <div class="page-header">
      <h1 class="page-title">分类：{{ categoryName }}</h1>
      <p class="page-subtitle">共 {{ filteredArticles.length }} 篇文章</p>
    </div>
    
    <div v-if="filteredArticles.length > 0" class="articles-list">
      <ArticleCard 
        v-for="article in filteredArticles" 
        :key="article.slug" 
        :article="article" 
      />
    </div>
    
    <div v-else class="empty-state">
      <p>该分类下暂无文章</p>
      <router-link to="/" class="back-link">返回首页</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ArticleCard from '../components/ArticleCard.vue'
import { parseFrontmatter } from '../utils/article'
import { filterByCategory } from '../utils/aggregation'
import { decodeURIComponentSafe } from '../utils/aggregation'
import type { ArticleListItem } from '../types/article'

const route = useRoute()
const articles = ref<ArticleListItem[]>([])

const categoryName = computed(() => {
  return decodeURIComponentSafe(route.params.categoryName as string)
})

const filteredArticles = computed(() => {
  return filterByCategory(articles.value, categoryName.value)
})

onMounted(async () => {
  const articleModules = import.meta.glob('../../articles/*.md', { query: '?raw', import: 'default' })
  
  const articleList = await Promise.all(
    Object.entries(articleModules).map(async ([path, loader]) => {
      const content = await loader() as string
      const slug = path.split('/').pop()?.replace('.md', '') || ''
      
      const article = parseFrontmatter(content, slug)
      
      return {
        slug: article.slug,
        title: article.title,
        date: article.date,
        tags: article.tags,
        category: article.category,
        excerpt: article.excerpt || '',
        readingTime: article.readingTime
      }
    })
  )
  
  articles.value = articleList.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
})
</script>

<style scoped>
.category-page {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-md);
}

.page-header {
  margin-bottom: var(--spacing-2xl);
  text-align: center;
}

.page-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
}

.page-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-3xl) 0;
  color: var(--color-text-light);
}

.empty-state p {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-lg);
}

.back-link {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--color-primary);
  color: var(--color-primary-text);
  text-decoration: none;
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
}

.back-link:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
</style>
