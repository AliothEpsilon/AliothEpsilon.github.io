<template>
  <div class="layout">
    <header class="header">
      <div class="container">
        <nav class="nav">
          <RouterLink to="/" class="nav-logo">AliothEpsilon</RouterLink>
          <div class="nav-links">
            <RouterLink to="/" class="nav-link">首页</RouterLink>
            <RouterLink to="/tags" class="nav-link">标签</RouterLink>
            <RouterLink to="/categories" class="nav-link">分类</RouterLink>
            <RouterLink to="/search" class="nav-link nav-search" aria-label="搜索">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </RouterLink>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
    <main class="main">
      <div class="container">
        <slot />
      </div>
    </main>
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ currentYear }} AliothEpsilon. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import { useTheme } from '../composables/useTheme'

const currentYear = computed(() => new Date().getFullYear())
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-lg) 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.nav-link {
  color: var(--color-text-light);
  font-weight: 500;
  display: flex;
  align-items: center;
  height: 40px;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-primary);
}

.nav-search {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.nav-search svg {
  transition: transform 0.2s;
}

.nav-search:hover svg {
  transform: scale(1.1);
}

.main {
  flex: 1;
  padding: var(--spacing-2xl) 0;
}

.footer {
  background-color: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-lg) 0;
  text-align: center;
  color: var(--color-text-light);
}
</style>
