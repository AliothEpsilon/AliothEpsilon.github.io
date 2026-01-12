<template>
  <div class="prev-next-nav">
    <RouterLink 
      v-if="prevArticle" 
      :to="{ name: 'article', params: { slug: prevArticle.slug } }" 
      class="nav-link prev-link"
    >
      <div class="nav-icon">←</div>
      <div class="nav-content">
        <div class="nav-label">上一篇</div>
        <div class="nav-title">{{ prevArticle.title }}</div>
      </div>
    </RouterLink>
    
    <div v-else class="nav-placeholder"></div>
    
    <RouterLink 
      v-if="nextArticle" 
      :to="{ name: 'article', params: { slug: nextArticle.slug } }" 
      class="nav-link next-link"
    >
      <div class="nav-content">
        <div class="nav-label">下一篇</div>
        <div class="nav-title">{{ nextArticle.title }}</div>
      </div>
      <div class="nav-icon">→</div>
    </RouterLink>
    
    <div v-else class="nav-placeholder"></div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { ArticleListItem } from '../types/article'

defineProps<{
  prevArticle?: ArticleListItem
  nextArticle?: ArticleListItem
}>()
</script>

<style scoped>
.prev-next-nav {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--color-border);
}

.nav-link {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius);
  text-decoration: none;
  transition: all 0.2s;
  min-width: 0;
}

.nav-link:hover {
  background-color: var(--color-bg);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.prev-link {
  justify-content: flex-start;
}

.next-link {
  justify-content: flex-end;
  text-align: right;
}

.nav-icon {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-primary);
  flex-shrink: 0;
}

.nav-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  min-width: 0;
}

.nav-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  font-weight: 500;
}

.nav-title {
  font-size: var(--font-size-base);
  color: var(--color-text);
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nav-placeholder {
  flex: 1;
}

@media (max-width: 600px) {
  .prev-next-nav {
    flex-direction: column;
  }
  
  .nav-link {
    width: 100%;
  }
  
  .nav-placeholder {
    display: none;
  }
}
</style>
