export interface ReadingTimeResult {
  minutes: number
  text: string
}

export function calculateReadingTime(content: string): ReadingTimeResult {
  const CHINESE_CHARS_PER_MINUTE = 500
  const ENGLISH_WORDS_PER_MINUTE = 200
  const CODE_LINES_PER_MINUTE = 50
  const IMAGE_MINUTES = 0.5

  let text = content

  const codeBlocks = text.match(/```[\s\S]*?```/g) || []
  const imageCount = (text.match(/!\[.*?\]\(.*?\)/g) || []).length

  text = text.replace(/```[\s\S]*?```/g, '')
  text = text.replace(/!\[.*?\]\(.*?\)/g, '')

  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length
  const codeLines = codeBlocks.reduce((total, block) => {
    return total + block.split('\n').length
  }, 0)

  const chineseTime = chineseChars / CHINESE_CHARS_PER_MINUTE
  const englishTime = englishWords / ENGLISH_WORDS_PER_MINUTE
  const codeTime = codeLines / CODE_LINES_PER_MINUTE
  const imageTime = imageCount * IMAGE_MINUTES

  const totalMinutes = Math.ceil(chineseTime + englishTime + codeTime + imageTime)

  let resultText = ''
  if (totalMinutes < 1) {
    resultText = '少于 1 分钟'
  } else {
    resultText = `${totalMinutes} 分钟`
  }

  return {
    minutes: totalMinutes,
    text: resultText
  }
}
