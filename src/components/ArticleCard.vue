<template>
  <article class="article-card">
    <RouterLink :to="`/article/${article.slug}`" class="article-link">
      <div class="article-header">
        <h2 class="article-title">{{ article.title }}</h2>
        <span v-if="article.pinned" class="pinned-badge" title="置顶文章">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        </span>
      </div>
      <div class="article-meta">
        <span class="article-date">{{ formatDate(article.date) }}</span>
        <RouterLink 
          v-if="article.category" 
          :to="{ name: 'category', params: { categoryName: article.category } }" 
          class="article-category"
        >
          {{ article.category }}
        </RouterLink>
        <span v-if="article.readingTime" class="article-reading-time">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {{ article.readingTime }} 分钟
        </span>
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
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius);
  transition: box-shadow 0.2s;
}

.article-card:hover {
  box-shadow: var(--shadow-md);
}

.article-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.article-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-md);
}

.article-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  color: var(--color-text);
}

.pinned-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 4px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
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

.article-excerpt {
  color: var(--color-text-light);
  line-height: 1.5;
  margin-bottom: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
