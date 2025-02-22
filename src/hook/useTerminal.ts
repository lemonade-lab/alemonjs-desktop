import { useEffect, useRef, useState } from 'react'
import { Terminal } from 'xterm'
import { WebLinksAddon } from 'xterm-addon-web-links'
import 'xterm/css/xterm.css'
import { FitAddon } from 'xterm-addon-fit'
import { SerializeAddon } from 'xterm-addon-serialize'
import _ from 'lodash'

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
        background: '#FFFFFF00',
        selectionBackground: '#00000080',
        // 前景色
        foreground: '#00000060'
      },
      convertEol: true, // 自动转换换行符
      cursorStyle: 'bar', // 光标样式
      cursorInactiveStyle: 'none', // 非活动状态下的光标样式
      // 根据宽度得到咧数。
      // fontSize: 14, // 字体大小
      cursorBlink: false, // 禁用光标闪烁
      disableStdin: true // 禁止用户输入
    })
    // 打开链接
    const webLinksAddon = new WebLinksAddon((event, uri) => {
      window.open(uri, '_blank')
    })
    terminal.loadAddon(webLinksAddon)
    // 自适应
    const fitAddon = new FitAddon()
    terminal.loadAddon(fitAddon)
    // 保存和加载终端状态
    const serializeAddon = new SerializeAddon()
    terminal.loadAddon(serializeAddon)
    terminal.open(terminalRef.current)
    terminalInstance.current = terminal
    const resize = _.debounce(() => {
      // 初始调整终端大小以适应容器
      fitAddon.fit()
    }, 700)
    resize()
    // 监听窗口大小变化事件
    window.addEventListener('resize', resize)
    // 清理
    return () => {
      terminal.dispose()
      // 移除监听
      window.removeEventListener('resize', resize)
    }
  }, [])

  return [terminalRef, terminalInstance]
}
