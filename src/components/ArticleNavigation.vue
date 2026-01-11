<template>
  <aside class="article-navigation">
    <h3 class="nav-title">文章归档</h3>
    <div v-for="(group, year) in articlesByYear" :key="year" class="year-section">
      <h4 class="year-header" @click="toggleYear(year)">
        {{ year }} <span class="article-count">({{ group.length }})</span>
        <span class="toggle-icon">{{ isYearCollapsed(year) ? '▶' : '▼' }}</span>
      </h4>
      <ul v-show="!isYearCollapsed(year)" class="date-list">
        <li v-for="article in group" :key="article.slug" class="date-item">
          <RouterLink 
            :to="`/article/${article.slug}`" 
            class="date-link"
            :class="{ active: activeSlug === article.slug }"
          >
            <span class="date-text">{{ formatDate(article.date) }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { ArticleListItem } from '../types/article'

defineProps<{
  articlesByYear: Record<string, ArticleListItem[]>
}>()

const route = useRoute()

const activeSlug = computed(() => {
  return route.params.slug as string
})

const collapsedYears = ref<Set<string>>(new Set())

const toggleYear = (year: string) => {
  if (collapsedYears.value.has(year)) {
    collapsedYears.value.delete(year)
  } else {
    collapsedYears.value.add(year)
  }
}

const isYearCollapsed = (year: string) => {
  return collapsedYears.value.has(year)
}

const formatDate = (date: string) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>

<style scoped>
.article-navigation {
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  position: fixed;
  left: calc((100% - 1200px) / 2 - var(--spacing-xl));
  top: calc(var(--spacing-lg) * 2 + 60px);
  width: 250px;
  max-height: calc(100vh - var(--spacing-xl) * 2 - var(--spacing-lg) * 2 - 20px);
  overflow-y: auto;
}

@media (max-width: 1200px) {
  .article-navigation {
    left: calc((100% - 100vw) / 2 + 20px - var(--spacing-xl));
  }
}

@media (max-width: 900px) {
  .article-navigation {
    display: none;
  }
}

.nav-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-border);
}

.year-section {
  margin-bottom: var(--spacing-lg);
}

.year-section:last-child {
  margin-bottom: 0;
}

.year-header {
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;
}

.year-header:hover {
  color: var(--color-primary);
}

.article-count {
  font-size: var(--font-size-sm);
  font-weight: 400;
  color: var(--color-text-light);
  margin-left: var(--spacing-xs);
}

.toggle-icon {
  font-size: var(--font-size-xs);
  margin-left: var(--spacing-xs);
  transition: transform 0.2s;
}

.date-list {
  list-style: none;
  padding-left: var(--spacing-sm);
}

.date-item {
  margin-bottom: var(--spacing-xs);
}

.date-link {
  display: block;
  text-decoration: none;
  color: var(--color-text-light);
  font-size: var(--font-size-sm);
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius);
  transition: all 0.2s;
}

.date-link:hover {
  color: var(--color-primary);
  background-color: var(--color-bg);
}

.date-link.active {
  color: var(--color-primary);
  background-color: var(--color-bg);
  font-weight: 500;
}

.date-text {
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;
}
</style>
