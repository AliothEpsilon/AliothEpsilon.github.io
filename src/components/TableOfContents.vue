<template>
  <nav class="table-of-contents" v-if="items.length > 0">
    <div class="toc-title">目录</div>
    <ul class="toc-list">
      <li v-for="item in items" :key="item.id" :class="['toc-item', `toc-level-${item.level}`, { active: activeId === item.id }]">
        <a :href="`#${item.id}`" @click.prevent="scrollTo(item.id)" class="toc-link">{{ item.text }}</a>
        <ul v-if="item.children && item.children.length > 0" class="toc-list">
          <li v-for="child in item.children" :key="child.id" :class="['toc-item', `toc-level-${child.level}`, { active: activeId === child.id }]">
            <a :href="`#${child.id}`" @click.prevent="scrollTo(child.id)" class="toc-link">{{ child.text }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { TOCItem } from '../types/article'

const props = defineProps<{
  items: TOCItem[]
}>()

const activeId = ref('')

const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const headerOffset = 110
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

const updateActiveId = () => {
  const headings = document.querySelectorAll('.markdown-renderer h1, .markdown-renderer h2, .markdown-renderer h3, .markdown-renderer h4, .markdown-renderer h5, .markdown-renderer h6')
  
  if (headings.length === 0) {
    activeId.value = ''
    return
  }

  const headerOffset = 110
  let currentId = ''
  
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i]
    if (!heading.id) continue
    
    const rect = heading.getBoundingClientRect()
    
    if (rect.top >= headerOffset) {
      currentId = heading.id
      break
    }
  }
  
  if (currentId === '') {
    for (let i = headings.length - 1; i >= 0; i--) {
      const heading = headings[i]
      if (!heading.id) continue
      
      currentId = heading.id
      break
    }
  }
  
  activeId.value = currentId
}

let ticking = false

const onScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateActiveId()
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      updateActiveId()
    }, 100)
    window.addEventListener('scroll', onScroll, { passive: true })
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.table-of-contents {
  position: fixed;
  top: 100px;
  right: 50px;
  width: 200px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  font-size: var(--font-size-sm);
  z-index: 100;
}

.toc-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-list .toc-list {
  padding-left: var(--spacing-md);
  margin-top: var(--spacing-xs);
}

.toc-item {
  margin-bottom: var(--spacing-xs);
}

.toc-link {
  display: block;
  color: var(--color-text-light) !important;
  text-decoration: none;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  transition: all 0.2s ease;
}

.toc-link:hover {
  color: var(--color-primary) !important;
  background-color: var(--color-bg-secondary);
}

.toc-item.active > .toc-link {
  color: var(--color-primary) !important;
  background-color: var(--color-bg-secondary);
  font-weight: 500;
}

.toc-level-1 {
  font-weight: 500;
}

.toc-level-2 {
  font-weight: 400;
}

.toc-level-3 {
  font-size: var(--font-size-xs);
}

@media (max-width: 1024px) {
  .table-of-contents {
    display: none;
  }
}
</style>