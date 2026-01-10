<template>
  <div class="home">
    <h1 class="home-title">欢迎来到我的博客</h1>
    <p class="home-subtitle">我在自己的无知面前心悦诚服</p>
    
    <div class="articles-list">
      <ArticleCard 
        v-for="article in articles" 
        :key="article.slug" 
        :article="article" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'
import { parseFrontmatter } from '../utils/article'
import type { ArticleListItem } from '../types/article'

const articles = ref<ArticleListItem[]>([])

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
.home-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.home-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.articles-list {
  max-width: 800px;
  margin: 0 auto;
}
</style>
