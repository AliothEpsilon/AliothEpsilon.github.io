import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'blog-theme'

const theme = ref<Theme>('light')

export function useTheme() {
  const isDark = ref(false)

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    isDark.value = newTheme === 'dark'
    applyTheme(newTheme)
    saveTheme(newTheme)
  }

  const toggleTheme = () => {
    const newTheme: Theme = theme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const applyTheme = (newTheme: Theme) => {
    const html = document.documentElement
    if (newTheme === 'dark') {
      html.setAttribute('data-theme', 'dark')
    } else {
      html.removeAttribute('data-theme')
    }
  }

  const saveTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    } catch (error) {
      console.warn('Failed to save theme preference:', error)
    }
  }

  const loadTheme = (): Theme => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme
      }
    } catch (error) {
      console.warn('Failed to load theme preference:', error)
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  }

  const initTheme = () => {
    const initialTheme = loadTheme()
    setTheme(initialTheme)
  }

  watch(theme, (newTheme) => {
    isDark.value = newTheme === 'dark'
  })

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    initTheme
  }
}
