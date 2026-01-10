<template>
  <article class="article-card">
    <RouterLink :to="`/article/${article.slug}`" class="article-link">
      <h2 class="article-title">{{ article.title }}</h2>
      <div class="article-meta">
        <span class="article-date">{{ formatDate(article.date) }}</span>
        <RouterLink 
          v-if="article.category" 
          :to="{ name: 'category', params: { categoryName: article.category } }" 
          class="article-category"
        >
          {{ article.category }}
        </RouterLink>
      </div>
      <p class="article-excerpt">{{ article.excerpt }}</p>
      <div v-if="article.tags && article.tags.length > 0" class="article-tags">
        <RouterLink 
          v-for="tag in article.tags" 
          :key="tag" 
          :to="{ name: 'tag', params: { tagName: tag } }" 
          class="tag"
        >
          {{ tag }}
        </RouterLink>
      </div>
    </RouterLink>
  </article>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { ArticleListItem } from '../types/article'
import { formatDate } from '../utils/article'

defineProps<{
  article: ArticleListItem
}>()
</script>

<style scoped>
.article-card {
  margin-bottom: var(--spacing-lg);
}

.article-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.article-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
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

.article-excerpt {
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.article-tags {
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

.article-link:hover .article-title {
  color: var(--color-primary);
}

.article-link:hover .tag {
  background-color: var(--color-primary);
  color: white;
}
</style>
