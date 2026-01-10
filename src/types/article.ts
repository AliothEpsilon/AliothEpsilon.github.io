export interface ArticleMeta {
  title: string
  date: string
  tags?: string[]
  category?: string
  excerpt?: string
  readingTime?: number
}

export interface Article extends ArticleMeta {
  slug: string
  content: string
}

export interface ArticleListItem {
  slug: string
  title: string
  date: string
  tags?: string[]
  category?: string
  excerpt: string
  readingTime?: number
}

export interface TOCItem {
  id: string
  text: string
  level: number
  children?: TOCItem[]
}
