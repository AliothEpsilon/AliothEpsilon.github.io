/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.css' {
  const content: string
  export default content
}

declare module '*.md' {
  const content: string
  export default content
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  glob(pattern: string, options?: { as?: 'raw' }): Record<string, () => Promise<string>>
}
