<template>
  <aside class="recent-articles">
    <h3 class="recent-title">最新文章</h3>
    <ul class="recent-list">
      <li v-for="article in recentArticles" :key="article.slug" class="recent-item">
        <RouterLink :to="`/article/${article.slug}`" class="recent-link">
          <span class="recent-article-title">{{ article.title }}</span>
          <div v-if="article.tags && article.tags.length > 0" class="recent-tags">
            <span v-for="tag in article.tags.slice(0, 3)" :key="tag" class="recent-tag">
              {{ tag }}
            </span>
          </div>
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { ArticleListItem } from '../types/article'

defineProps<{
  recentArticles: ArticleListItem[]
}>()
</script>

<style scoped>
.recent-articles {
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  position: fixed;
  right: calc((100% - 1200px) / 2 - var(--spacing-xl));
  top: calc(var(--spacing-lg) * 2 + 60px);
  width: 250px;
}

@media (max-width: 1200px) {
  .recent-articles {
    right: calc((100% - 100vw) / 2 + 20px - var(--spacing-xl));
  }
}

@media (max-width: 900px) {
  .recent-articles {
    display: none;
  }
}

.recent-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-border);
}

.recent-list {
  list-style: none;
}

.recent-item {
  margin-bottom: var(--spacing-md);
}

.recent-item:last-child {
  margin-bottom: 0;
}

.recent-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.recent-article-title {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
  line-height: 1.4;
  transition: color 0.2s;
}

.recent-link:hover .recent-article-title {
  color: var(--color-primary);
}

.recent-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.recent-tag {
  display: inline-block;
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
  background-color: var(--color-bg);
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
}
</style>
