import type { ArticleListItem } from '../types/article'

export interface TagInfo {
  name: string
  count: number
}

export interface CategoryInfo {
  name: string
  count: number
}

export function aggregateTags(articles: ArticleListItem[]): TagInfo[] {
  const tagMap = new Map<string, number>()
  
  articles.forEach(article => {
    article.tags?.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })
  
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export function aggregateCategories(articles: ArticleListItem[]): CategoryInfo[] {
  const categoryMap = new Map<string, number>()
  
  articles.forEach(article => {
    if (article.category) {
      categoryMap.set(article.category, (categoryMap.get(article.category) || 0) + 1)
    }
  })
  
  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export function filterByTag(articles: ArticleListItem[], tagName: string): ArticleListItem[] {
  return articles.filter(article => 
    article.tags?.includes(tagName)
  )
}

export function filterByCategory(articles: ArticleListItem[], categoryName: string): ArticleListItem[] {
  return articles.filter(article => 
    article.category === categoryName
  )
}

export function decodeURIComponentSafe(uri: string): string {
  try {
    return decodeURIComponent(uri)
  } catch {
    return uri
  }
}
