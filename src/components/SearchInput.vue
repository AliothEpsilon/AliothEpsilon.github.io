<template>
  <div class="search-input-container">
    <div class="search-input-wrapper">
      <input
        ref="inputRef"
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder="搜索文章..."
        @keyup.enter="handleSearch"
        @keyup.esc="handleClear"
      />
      <button
        v-if="searchQuery"
        class="clear-button"
        @click="handleClear"
        aria-label="清除搜索"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <button class="search-button" @click="handleSearch" aria-label="搜索">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>
    <div class="search-hint">
      按 <kbd>Ctrl</kbd> + <kbd>K</kbd> 快速搜索
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  search: [query: string]
}>()

const searchQuery = ref('')
const inputRef = ref<HTMLInputElement>()

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value)
  }
}

const handleClear = () => {
  searchQuery.value = ''
  inputRef.value?.focus()
}

const handleShortcut = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault()
    inputRef.value?.focus()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleShortcut)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleShortcut)
})

defineExpose({
  focus: () => inputRef.value?.focus()
})
</script>

<style scoped>
.search-input-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  font-size: var(--font-size-base);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-md);
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-input::placeholder {
  color: var(--color-text-light);
}

.clear-button {
  position: absolute;
  right: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: none;
  background-color: transparent;
  color: var(--color-text-light);
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;
}

.clear-button:hover {
  background-color: var(--color-bg-secondary);
  color: var(--color-text);
}

.search-button {
  position: absolute;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background-color: var(--color-primary);
  color: white;
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: var(--color-primary-dark);
}

.search-hint {
  margin-top: var(--spacing-sm);
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

kbd {
  display: inline-block;
  padding: 0.125rem 0.375rem;
  font-size: var(--font-size-xs);
  font-family: inherit;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  box-shadow: 0 1px 0 var(--color-border);
}
</style>
