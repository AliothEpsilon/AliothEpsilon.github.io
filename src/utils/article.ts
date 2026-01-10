import type { Article, ArticleMeta } from '../types/article'

export function parseFrontmatter(content: string, slug: string): Article {
  const result = parseSimpleFrontmatter(content)
  
  const meta: ArticleMeta = {
    title: result.data.title || slug,
    date: result.data.date || new Date().toISOString(),
    tags: result.data.tags || [],
    category: result.data.category || '',
    excerpt: result.data.excerpt || generateExcerpt(result.content)
  }
  
  return {
    ...meta,
    slug,
    content: result.content
  }
}

interface ParseResult {
  data: Record<string, any>
  content: string
}

function parseSimpleFrontmatter(content: string): ParseResult {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { data: {}, content }
  }
  
  const frontmatter = match[1]
  const markdownContent = match[2]
  
  const data = parseYaml(frontmatter)
  
  return { data, content: markdownContent }
}

function parseYaml(yaml: string): Record<string, any> {
  const result: Record<string, any> = {}
  const lines = yaml.split('\n')
  let currentKey: string | null = null
  let currentArray: string[] = []
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    
    const colonIndex = trimmed.indexOf(':')
    
    if (colonIndex !== -1) {
      if (currentKey && currentArray.length > 0) {
        result[currentKey] = currentArray
        currentArray = []
      }
      
      currentKey = trimmed.substring(0, colonIndex).trim()
      const value = trimmed.substring(colonIndex + 1).trim()
      
      if (value) {
        result[currentKey] = parseValue(value)
        currentKey = null
      }
    } else if (trimmed.startsWith('-') && currentKey) {
      const arrayValue = trimmed.substring(1).trim()
      if (arrayValue) {
        currentArray.push(parseValue(arrayValue))
      }
    }
  }
  
  if (currentKey && currentArray.length > 0) {
    result[currentKey] = currentArray
  }
  
  return result
}

function parseValue(value: string): any {
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1)
  }
  
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1)
  }
  
  if (value === 'true') return true
  if (value === 'false') return false
  if (value === 'null') return null
  
  const num = Number(value)
  if (!isNaN(num)) return num
  
  return value
}

function generateExcerpt(content: string, maxLength: number = 200): string {
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .substring(0, maxLength)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
