import { useEffect, useRef, useState } from 'react'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
export const useTerminal = (): [
  React.MutableRefObject<HTMLDivElement | null>,
  React.MutableRefObject<Terminal | null>
] => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const terminalInstance = useRef<Terminal | null>(null)

  useEffect(() => {
    if (!terminalRef.current) return
    // 创建并配置 Xterm 实例
    const terminal = new Terminal({
      theme: {
        background: '#FFFFFF00'
      },
      convertEol: true, // 自动转换换行符
      cursorStyle: 'bar', // 光标样式
      cursorInactiveStyle: 'none', // 非活动状态下的光标样式
      // 根据宽度得到咧数。
      cols: Math.floor(window.innerWidth / 10), // 列数
      rows: 40, // 行数
      fontSize: 14, // 字体大小
      cursorBlink: false, // 禁用光标闪烁
      disableStdin: true // 禁止用户输入
    })
    terminal.open(terminalRef.current)
    terminalInstance.current = terminal
    // 清理
    return () => {
      terminal.dispose()
    }
  }, [])

  return [terminalRef, terminalInstance]
}
