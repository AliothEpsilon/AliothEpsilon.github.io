import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './assets/styles/main.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/article/:slug',
      name: 'article',
      component: () => import('./views/Article.vue')
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('./views/Tags.vue')
    },
    {
      path: '/tag/:tagName',
      name: 'tag',
      component: () => import('./views/Tag.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('./views/Categories.vue')
    },
    {
      path: '/category/:categoryName',
      name: 'category',
      component: () => import('./views/Category.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue')
    }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
