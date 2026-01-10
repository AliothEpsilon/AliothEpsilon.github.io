import type { TOCItem } from '../types/article'

export function parseTOC(markdown: string): TOCItem[] {
  const toc: TOCItem[] = []
  const lines = markdown.split('\n')
  const stack: TOCItem[] = []

  lines.forEach((line) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const text = match[2].trim()
      const id = generateId(text)

      const item: TOCItem = {
        id,
        text,
        level,
        children: []
      }

      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop()
      }

      if (stack.length === 0) {
        toc.push(item)
      } else {
        const parent = stack[stack.length - 1]
        if (parent.children) {
          parent.children.push(item)
        }
      }

      stack.push(item)
    }
  })

  return toc
}

function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fa5-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}