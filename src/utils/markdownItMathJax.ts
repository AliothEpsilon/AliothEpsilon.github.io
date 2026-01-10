import MarkdownIt from 'markdown-it'

export default function markdownItMathJax(md: MarkdownIt) {
  md.inline.ruler.after('escape', 'math_inline', (state) => {
    let pos = state.pos
    const max = state.posMax

    if (state.src.charCodeAt(pos) !== 0x24) {
      return false
    }

    if (pos + 1 >= max) {
      return false
    }

    if (state.src.charCodeAt(pos + 1) === 0x24) {
      return false
    }

    const match = state.src.slice(pos).match(/^\$([^$\n]+?)\$/)
    if (!match) {
      return false
    }

    const content = match[1]
    const token = state.push('math_inline', 'math', 0)
    token.content = content
    token.markup = '$'
    state.pos += match[0].length
    return true
  })

  md.block.ruler.after('blockquote', 'math_block', (state, start, end, silent) => {
    let pos = state.bMarks[start] + state.tShift[start]
    let max = state.eMarks[start]

    if (pos + 2 > max) {
      return false
    }

    if (state.src.charCodeAt(pos) !== 0x24 || state.src.charCodeAt(pos + 1) !== 0x24) {
      return false
    }

    let line = start + 1
    let found = false

    while (line < end) {
      pos = state.bMarks[line] + state.tShift[line]
      max = state.eMarks[line]

      if (pos + 2 <= max && 
          state.src.charCodeAt(pos) === 0x24 && 
          state.src.charCodeAt(pos + 1) === 0x24) {
        found = true
        break
      }

      line++
    }

    if (!found || line === start + 1) {
      return false
    }

    if (silent) {
      return true
    }

    const content = state.getLines(start + 1, line, state.tShift[start + 1], true).trim()
    const token = state.push('math_block', 'math', 0)
    token.block = true
    token.content = content
    token.map = [start, line + 1]
    token.markup = '$$'
    state.line = line + 1
    return true
  })

  md.renderer.rules.math_inline = (tokens, idx) => {
    return `\\(${tokens[idx].content}\\)`
  }

  md.renderer.rules.math_block = (tokens, idx) => {
    return `\\[${tokens[idx].content}\\]`
  }
}
