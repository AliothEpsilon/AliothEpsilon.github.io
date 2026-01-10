import type { ArticleListItem } from '../types/article'

export interface SearchResult extends ArticleListItem {
  score: number
  matchedFields: string[]
}

export function searchArticles(
  articles: ArticleListItem[],
  query: string
): SearchResult[] {
  if (!query.trim()) {
    return []
  }

  const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 0)
  const results: SearchResult[] = []

  for (const article of articles) {
    const score = calculateScore(article, keywords)
    if (score > 0) {
      const matchedFields = getMatchedFields(article, keywords)
      results.push({
        ...article,
        score,
        matchedFields
      })
    }
  }

  return results.sort((a, b) => b.score - a.score)
}

function calculateScore(article: ArticleListItem, keywords: string[]): number {
  let score = 0

  for (const keyword of keywords) {
    const titleLower = article.title.toLowerCase()
    const excerptLower = article.excerpt.toLowerCase()
    const tagsLower = article.tags?.map(t => t.toLowerCase()) || []
    const categoryLower = article.category?.toLowerCase() || ''

    if (titleLower.includes(keyword)) {
      score += 10
      if (titleLower.startsWith(keyword)) {
        score += 5
      }
    }

    if (excerptLower.includes(keyword)) {
      score += 3
    }

    for (const tag of tagsLower) {
      if (tag.includes(keyword)) {
        score += 7
        if (tag === keyword) {
          score += 3
        }
      }
    }

    if (categoryLower.includes(keyword)) {
      score += 7
      if (categoryLower === keyword) {
        score += 3
      }
    }
  }

  return score
}

function getMatchedFields(article: ArticleListItem, keywords: string[]): string[] {
  const fields: string[] = []

  for (const keyword of keywords) {
    const titleLower = article.title.toLowerCase()
    const excerptLower = article.excerpt.toLowerCase()
    const tagsLower = article.tags?.map(t => t.toLowerCase()) || []
    const categoryLower = article.category?.toLowerCase() || ''

    if (titleLower.includes(keyword)) {
      if (!fields.includes('title')) {
        fields.push('title')
      }
    }

    if (excerptLower.includes(keyword)) {
      if (!fields.includes('content')) {
        fields.push('content')
      }
    }

    for (const tag of tagsLower) {
      if (tag.includes(keyword)) {
        if (!fields.includes('tags')) {
          fields.push('tags')
        }
        break
      }
    }

    if (categoryLower.includes(keyword)) {
      if (!fields.includes('category')) {
        fields.push('category')
      }
    }
  }

  return fields
}

export function highlightText(text: string, query: string): string {
  if (!query.trim()) {
    return text
  }

  const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 0)
  let highlightedText = text

  for (const keyword of keywords) {
    const regex = new RegExp(`(${escapeRegExp(keyword)})`, 'gi')
    highlightedText = highlightedText.replace(regex, '<mark>$1</mark>')
  }

  return highlightedText
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
