<template>
  <div class="tags-page">
    <h1 class="page-title">标签</h1>
    <p class="page-subtitle">共 {{ tags.length }} 个标签</p>
    
    <div class="tags-cloud">
      <router-link 
        v-for="tag in tags" 
        :key="tag.name" 
        :to="{ name: 'tag', params: { tagName: tag.name } }"
        class="tag-item"
        :class="getTagSizeClass(tag.count)"
      >
        <span class="tag-name">{{ tag.name }}</span>
        <span class="tag-count">{{ tag.count }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { parseFrontmatter } from '../utils/article'
import { aggregateTags } from '../utils/aggregation'
import type { TagInfo } from '../utils/aggregation'

const tags = ref<TagInfo[]>([])

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
  
  tags.value = aggregateTags(articles)
})

function getTagSizeClass(count: number): string {
  if (count >= 3) return 'tag-large'
  if (count >= 2) return 'tag-medium'
  return 'tag-small'
}
</script>

<style scoped>
.tags-page {
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

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  justify-content: center;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  color: var(--color-text);
  transition: all var(--transition-fast);
  border: 1px solid var(--color-border);
}

.tag-item:hover {
  background-color: var(--color-primary);
  color: var(--color-primary-text);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.tag-name {
  font-weight: 500;
}

.tag-count {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  background-color: var(--color-bg-tertiary);
  padding: 2px 6px;
  border-radius: var(--border-radius-sm);
}

.tag-item:hover .tag-count {
  background-color: var(--color-primary-dark);
  color: var(--color-primary-text);
}

.tag-small {
  font-size: var(--font-size-sm);
}

.tag-medium {
  font-size: var(--font-size-base);
}

.tag-large {
  font-size: var(--font-size-lg);
  font-weight: 600;
}
</style>
