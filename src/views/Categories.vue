<template>
  <div class="categories-page">
    <h1 class="page-title">分类</h1>
    <p class="page-subtitle">共 {{ categories.length }} 个分类</p>
    
    <div class="categories-list">
      <router-link 
        v-for="category in categories" 
        :key="category.name" 
        :to="{ name: 'category', params: { categoryName: category.name } }"
        class="category-item"
      >
        <div class="category-info">
          <span class="category-name">{{ category.name }}</span>
          <span class="category-count">{{ category.count }} 篇文章</span>
        </div>
        <svg class="arrow-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { parseFrontmatter } from '../utils/article'
import { aggregateCategories } from '../utils/aggregation'
import type { CategoryInfo } from '../utils/aggregation'

const categories = ref<CategoryInfo[]>([])

onMounted(async () => {
  const articleModules = import.meta.glob('../../articles/*.md', { query: '?raw', import: 'default' })
  
  const articles = await Promise.all(
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
        excerpt: article.excerpt || ''
      }
    })
  )
  
  categories.value = aggregateCategories(articles)
})
</script>

<style scoped>
.categories-page {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-md);
}

.page-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  text-align: center;
}

.page-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.category-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg) var(--spacing-xl);
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  color: var(--color-text);
  transition: all var(--transition-fast);
  border: 1px solid var(--color-border);
}

.category-item:hover {
  background-color: var(--color-primary);
  color: var(--color-primary-text);
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
}

.category-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.category-name {
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.category-count {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.category-item:hover .category-count {
  color: var(--color-primary-text);
}

.arrow-icon {
  color: var(--color-text-light);
  transition: transform var(--transition-fast);
}

.category-item:hover .arrow-icon {
  color: var(--color-primary-text);
  transform: translateX(4px);
}
</style>
