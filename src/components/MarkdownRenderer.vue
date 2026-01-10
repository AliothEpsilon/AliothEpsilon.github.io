<template>
  <div class="markdown-renderer" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const props = defineProps<{
  content: string
}>()

const renderedContent = computed(() => {
  return md.render(props.content)
})
</script>

<style scoped>
.markdown-renderer {
  line-height: 1.8;
  color: var(--color-text);
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
  background-color: var(--color-bg-secondary);
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
}

.markdown-renderer :deep(pre) {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  overflow-x: auto;
  margin-bottom: var(--spacing-lg);
}

.markdown-renderer :deep(pre code) {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
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
</style>
