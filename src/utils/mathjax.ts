import { computed } from 'vue'

declare global {
  interface Window {
    MathJax: any
  }
}

export function useMathJax() {
  const isMathJaxLoaded = computed(() => typeof window.MathJax !== 'undefined')

  const loadMathJax = () => {
    if (isMathJaxLoaded.value) {
      return Promise.resolve()
    }

    return new Promise<void>((resolve, reject) => {
      (window as any).MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']],
          processEscapes: true,
          processEnvironments: true,
          tags: 'ams',
          packages: {
            '[+]': ['noerrors', 'noundefined']
          }
        },
        startup: {
          typeset: false
        },
        loader: {
          load: ['[tex]/noerrors', '[tex]/noundefined']
        },
        chtml: {
          scale: 1,
          minScale: 0.5,
          mtextInheritFont: false,
          merrorInheritFont: true,
          mathmlSpacing: false,
          skipAttributes: {},
          exFactor: 0.5,
          displayAlign: 'center',
          displayIndent: '0'
        }
      }

      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.js'
      
      script.onload = () => {
        setTimeout(() => {
          resolve()
        }, 100)
      }
      
      script.onerror = () => {
        reject(new Error('Failed to load MathJax'))
      }

      document.head.appendChild(script)
    })
  }

  const typeset = (element?: HTMLElement) => {
    if (typeof window.MathJax === 'undefined' || !window.MathJax.typesetPromise) {
      return
    }

    window.MathJax.typesetPromise([element || document.body]).catch((err: any) => {
      console.error('MathJax typeset failed:', err)
    })
  }

  const clear = () => {
    if (typeof window.MathJax === 'undefined' || !window.MathJax.typesetClear) {
      return
    }

    window.MathJax.typesetClear()
  }

  return {
    isMathJaxLoaded,
    loadMathJax,
    typeset,
    clear
  }
}
