export interface ArticleMeta {
  title: string
  date: string
  tags?: string[]
  category?: string
  excerpt?: string
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
}
