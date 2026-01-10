<template>
  <div class="markdown-renderer" ref="rendererRef" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, nextTick, watch, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/github.css'
import 'highlight.js/styles/github-dark.css'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import go from 'highlight.js/lib/languages/go'
import rust from 'highlight.js/lib/languages/rust'
import cpp from 'highlight.js/lib/languages/cpp'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import html from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import yaml from 'highlight.js/lib/languages/yaml'
import markdown from 'highlight.js/lib/languages/markdown'
import markdownItMathJax from '../utils/markdownItMathJax'
import { useMathJax } from '../utils/mathjax'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('java', java)
hljs.registerLanguage('go', go)
hljs.registerLanguage('rust', rust)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)
hljs.registerLanguage('html', html)
hljs.registerLanguage('json', json)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('markdown', markdown)

const md: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code class="language-${lang}">${hljs.highlight(str, { language: lang }).value}</code></pre>`
      } catch (__) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})

md.use(markdownItMathJax)

md.renderer.rules.heading_open = function (tokens, idx) {
  const level = tokens[idx].tag
  const text = tokens[idx + 1].content
  const id = text
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fa5-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  return `<${level} id="${id}">`
}

const props = defineProps<{
  content: string
}>()

const { loadMathJax, typeset } = useMathJax()
const rendererRef = ref<HTMLElement>()

const renderedContent = computed(() => {
  return md.render(props.content)
})

onMounted(async () => {
  await loadMathJax()
  nextTick(() => {
    addCopyButtons()
    addLineNumbers()
    typeset(rendererRef.value)
  })
})

watch(() => props.content, async () => {
  await loadMathJax()
  nextTick(() => {
    typeset(rendererRef.value)
  })
})

const addCopyButtons = () => {
  const codeBlocks = document.querySelectorAll('.markdown-renderer pre.hljs')
  codeBlocks.forEach((block) => {
    if (block.querySelector('.copy-button')) return
    
    const button = document.createElement('button')
    button.className = 'copy-button'
    button.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    `
    button.addEventListener('click', async () => {
      const code = block.querySelector('code')?.textContent || ''
      try {
        await navigator.clipboard.writeText(code)
        button.classList.add('copied')
        button.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `
        setTimeout(() => {
          button.classList.remove('copied')
          button.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          `
        }, 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    })
    block.appendChild(button)
  })
}

const addLineNumbers = () => {
  const codeBlocks = document.querySelectorAll('.markdown-renderer pre.hljs')
  codeBlocks.forEach((block) => {
    const code = block.querySelector('code')
    if (!code) return
    
    const lines = code.innerHTML.split('\n')
    if (lines.length <= 1) return
    
    const lineNumbersHtml = lines.map((_, i) => `<span class="line-number">${i + 1}</span>`).join('')
    const lineNumbersContainer = document.createElement('div')
    lineNumbersContainer.className = 'line-numbers'
    lineNumbersContainer.innerHTML = lineNumbersHtml
    
    block.insertBefore(lineNumbersContainer, code)
  })
}
</script>

<style scoped>
.markdown-renderer {
  color: var(--color-text);
}

.markdown-renderer :deep(p) {
  margin-bottom: var(--spacing-lg);
}

.markdown-renderer :deep(h1),
.markdown-renderer :deep(h2),
.markdown-renderer :deep(h3),
.markdown-renderer :deep(h4),
.markdown-renderer :deep(h5),
.markdown-renderer :deep(h6) {
  margin-top: var(--spacing-2xl);
  margin-bottom: var(--spacing-lg);
  font-weight: 700;
  line-height: 1.3;
}

.markdown-renderer :deep(h1) {
  font-size: var(--font-size-3xl);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: var(--spacing-md);
}

.markdown-renderer :deep(h2) {
  font-size: var(--font-size-2xl);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-sm);
}

.markdown-renderer :deep(h3) {
  font-size: var(--font-size-xl);
}

.markdown-renderer :deep(p) {
  margin-bottom: var(--spacing-lg);
}

.markdown-renderer :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}

.markdown-renderer :deep(a:hover) {
  color: var(--color-primary-dark);
}

.markdown-renderer :deep(code) {
  background-color: var(--code-bg);
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-family: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  color: var(--code-text);
  border: 1px solid var(--code-border);
}

[data-theme="dark"] .markdown-renderer :deep(code) {
  background-color: var(--code-bg-secondary);
}

.markdown-renderer :deep(pre) {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  overflow-x: auto;
  margin-bottom: var(--spacing-lg);
  position: relative;
}

.markdown-renderer :deep(pre.hljs) {
  background-color: var(--code-bg) !important;
  border: 1px solid var(--code-border);
  padding: 0 !important;
  margin-bottom: var(--spacing-lg);
  counter-reset: line;
  display: flex !important;
  overflow-x: auto;
  transition: all 0.2s;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.markdown-renderer :deep(pre.hljs:hover) {
  border-color: var(--code-border-hover) !important;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.markdown-renderer :deep(pre code) {
  background-color: var(--code-bg) !important;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) var(--spacing-sm) !important;
  border-radius: 0;
  font-family: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace !important;
  font-size: 0.9em !important;
  line-height: 1.6 !important;
  display: block;
  white-space: pre !important;
  flex: 1;
  margin: 0 !important;
  box-sizing: border-box;
  color: var(--code-text) !important;
  border-top: 0 !important;
  border-bottom: 0 !important;
  border-left: 0 !important;
  border-right: 0 !important;
}

[data-theme="dark"] .markdown-renderer :deep(pre code) {
  background-color: var(--code-bg-secondary) !important;
}

.markdown-renderer :deep(pre code .hljs) {
  color: var(--code-text) !important;
  line-height: 1.6 !important;
  display: block;
}

.markdown-renderer :deep(pre code .hljs-keyword),
.markdown-renderer :deep(pre code .hljs-title) {
  color: #d73a49 !important;
}

.markdown-renderer :deep(pre code .hljs-string),
.markdown-renderer :deep(pre code .hljs-type),
.markdown-renderer :deep(pre code .hljs-built_in),
.markdown-renderer :deep(pre code .hljs-builtin-name) {
  color: #032f62 !important;
}

.markdown-renderer :deep(pre code .hljs-number),
.markdown-renderer :deep(pre code .hljs-literal) {
  color: #005cc5 !important;
}

.markdown-renderer :deep(pre code .hljs-comment) {
  color: #6a737d !important;
}

.markdown-renderer :deep(pre code .hljs-function),
.markdown-renderer :deep(pre code .hljs-title.function_) {
  color: #6f42c1 !important;
}

.markdown-renderer :deep(pre code .hljs-variable) {
  color: #e36209 !important;
}

.markdown-renderer :deep(pre code .hljs-attr),
.markdown-renderer :deep(pre code .hljs-property) {
  color: #005cc5 !important;
}

.markdown-renderer :deep(pre code .hljs-selector-tag),
.markdown-renderer :deep(pre code .hljs-selector-class),
.markdown-renderer :deep(pre code .hljs-selector-id) {
  color: #22863a !important;
}

.markdown-renderer :deep(pre code .hljs-selector-pseudo) {
  color: #6f42c1 !important;
}

.markdown-renderer :deep(pre code .hljs-section) {
  color: #005cc5 !important;
}

.markdown-renderer :deep(pre code .hljs-bullet) {
  color: #e36209 !important;
}

.markdown-renderer :deep(pre code .hljs-tag) {
  color: #22863a !important;
}

[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-keyword),
[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-title) {
  color: #ff7b72 !important;
}

[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-string),
[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-type),
[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-built_in),
[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-builtin-name) {
  color: #a5d6ff !important;
}

[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-number),
[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-literal) {
  color: #79c0ff !important;
}

[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-comment) {
  color: #8b949e !important;
}

[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-function),
[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-title.function_) {
  color: #d2a8ff !important;
}

[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-variable) {
  color: #ffa657 !important;
}

[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-attr),
[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-property) {
  color: #79c0ff !important;
}

[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-selector-tag),
[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-selector-class),
[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-selector-id) {
  color: #7ee787 !important;
}

[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-selector-pseudo) {
  color: #d2a8ff !important;
}

[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-section) {
  color: #79c0ff !important;
}

[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-bullet) {
  color: #ffa657 !important;
}

[data-theme="dark"] .markdown-renderer :deep(pre code .hljs-tag) {
  color: #7ee787 !important;
}

.markdown-renderer :deep(.line-numbers) {
  flex-shrink: 0;
  width: 3em !important;
  min-width: 3em !important;
  max-width: 3em !important;
  padding: var(--spacing-md) var(--spacing-sm) var(--spacing-md) 0 !important;
  text-align: right;
  border-right: 1px solid var(--code-border) !important;
  border-top: 0 !important;
  border-bottom: 0 !important;
  border-left: 0 !important;
  background-color: var(--code-bg-secondary) !important;
  user-select: none;
  overflow: hidden;
  box-sizing: border-box;
  display: flex !important;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 !important;
}

[data-theme="dark"] .markdown-renderer :deep(.line-numbers) {
  background-color: var(--code-bg) !important;
}

.markdown-renderer :deep(.line-number) {
  display: block;
  color: var(--code-line-number);
  font-family: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace !important;
  font-size: 0.9em !important;
  line-height: 1.6 !important;
  padding: 0 !important;
  margin: 0 !important;
  box-sizing: border-box;
  align-self: flex-end;
}

.markdown-renderer :deep(.copy-button) {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background-color: var(--code-bg-secondary);
  border: 1px solid var(--code-border);
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--code-text);
  font-size: 0.85em;
  transition: all 0.2s;
}

.markdown-renderer :deep(.copy-button:hover) {
  background-color: var(--code-bg-hover);
  border-color: var(--code-border-hover);
}

.markdown-renderer :deep(.copy-button.copied) {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.markdown-renderer :deep(.copy-button svg) {
  width: 14px;
  height: 14px;
}

.markdown-renderer :deep(ul),
.markdown-renderer :deep(ol) {
  margin-bottom: var(--spacing-lg);
  padding-left: var(--spacing-xl);
}

.markdown-renderer :deep(li) {
  margin-bottom: var(--spacing-sm);
}

.markdown-renderer :deep(blockquote) {
  border-left: 4px solid var(--color-primary);
  padding-left: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  color: var(--color-text-light);
  font-style: italic;
}

.markdown-renderer :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-lg);
}

.markdown-renderer :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: var(--spacing-lg);
}

.markdown-renderer :deep(th),
.markdown-renderer :deep(td) {
  border: 1px solid var(--color-border);
  padding: var(--spacing-sm) var(--spacing-md);
  text-align: left;
}

.markdown-renderer :deep(th) {
  background-color: var(--color-bg-secondary);
  font-weight: 600;
}

.markdown-renderer :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: var(--spacing-2xl) 0;
}

.markdown-renderer :deep(.mathjax-inline) {
  display: inline;
  margin: 0 0.1em;
}

.markdown-renderer :deep(.mathjax-display) {
  display: block;
  margin: var(--spacing-lg) 0;
  overflow-x: auto;
  text-align: center;
}

.markdown-renderer :deep(.mjx-chtml) {
  color: var(--color-text);
  font-size: 1em;
  line-height: 1.2;
}

[data-theme="dark"] .markdown-renderer :deep(.mjx-chtml) {
  color: var(--color-text);
}

.markdown-renderer :deep(.mjx-math) {
  color: var(--color-text);
}

[data-theme="dark"] .markdown-renderer :deep(.mjx-math) {
  color: var(--color-text);
}

.markdown-renderer :deep(.mjx-container) {
  font-size: 100% !important;
  margin: 0 !important;
}

.markdown-renderer :deep(.mjx-container[jax="CHTML"] > mjx-assistive-mml) {
  border: 0 !important;
  clip: auto !important;
  display: block !important;
  height: auto !important;
  margin: 0 !important;
  overflow: visible !important;
  padding: 0 !important;
  position: absolute !important;
  width: auto !important;
  top: 0 !important;
  left: 0 !important;
}
</style>
