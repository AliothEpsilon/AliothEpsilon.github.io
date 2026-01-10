<template>
  <div class="reading-progress-bar" :style="{ top: `${headerHeight}px` }">
    <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)
const headerHeight = ref(0)

const calculateProgress = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const progressValue = (scrollTop / scrollHeight) * 100
  progress.value = Math.min(Math.max(progressValue, 0), 100)
}

const handleScroll = () => {
  requestAnimationFrame(calculateProgress)
}

onMounted(() => {
  const header = document.querySelector('.header')
  if (header) {
    headerHeight.value = header.getBoundingClientRect().height
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true })
  calculateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.reading-progress-bar {
  position: sticky;
  top: 0;
  width: 100%;
  height: 3px;
  background-color: var(--reading-progress-bg);
  z-index: 99;
}

.progress-bar {
  height: 100%;
  background-color: var(--reading-progress-bar);
  transition: width 0.1s ease-out;
  border-radius: 0 2px 2px 0;
}
</style>
