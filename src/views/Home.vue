<template>
  <div class="home">
    <h1 class="home-title">欢迎来到我的博客</h1>
    <p class="home-subtitle">我在自己的无知面前心悦诚服</p>
    
    <div class="home-layout">
      <aside class="left-sidebar">
        <ArticleNavigation :articles-by-year="articlesByYear" />
      </aside>
      
      <main class="main-content">
        <ArticleCard 
          v-for="article in articles" 
          :key="article.slug" 
          :article="article" 
        />
      </main>
      
      <aside class="right-sidebar">
        <RecentArticles :recent-articles="recentArticles" />
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'
import ArticleNavigation from '../components/ArticleNavigation.vue'
import RecentArticles from '../components/RecentArticles.vue'
import { parseFrontmatter } from '../utils/article'
import type { ArticleListItem } from '../types/article'

const articles = ref<ArticleListItem[]>([])

const recentArticles = computed(() => {
  return articles.value.slice(0, 5)
})

const articlesByYear = computed(() => {
  const grouped: Record<string, ArticleListItem[]> = {}
  
  articles.value.forEach(article => {
    const year = new Date(article.date).getFullYear().toString()
    if (!grouped[year]) {
      grouped[year] = []
    }
    grouped[year].push(article)
  })
  
  return grouped
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
        readingTime: article.readingTime,
        pinned: article.pinned || false
      }
    })
  )
  
  articles.value = articleList.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
})
</script>

<style scoped>
.home {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.home-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  text-align: center;
}

.home-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-light);
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.home-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 250px 0 250px;
}

.main-content {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

@media (max-width: 1200px) {
  .home-layout {
    padding: 0 290px 0 290px;
  }
}

@media (max-width: 900px) {
  .home-layout {
    padding: 0 var(--spacing-lg);
  }
}
</style>
