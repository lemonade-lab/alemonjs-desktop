/**
 *
 * @param select
 * @returns
 */
export const updateTheme = (select: boolean) => {
  if (select === true) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
    return
  } else if (select === false) {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
    return
  }
  // 如果是暗黑模式 则添加 dark 类
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  } else {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }
}

/**
 *
 * @returns
 */
export const isDarkTheme = () => {
  const value = localStorage.getItem('theme')
  if (value === 'dark') {
    return true
  }
  return false
}
