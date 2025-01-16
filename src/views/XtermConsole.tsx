import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'

const XtermConsole = () => {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!terminalRef.current) return

    // 初始化终端
    const terminal = new Terminal({
      rows: 20,
      cols: 80,
      theme: {
        // background: '#1e1e1e',
        // foreground: '#ffffff'
      }
    })

    // 将终端挂载到 DOM 节点上
    terminal.open(terminalRef.current)

    // 添加初始内容
    terminal.writeln('Welcome to the Xterm Console!')
    terminal.writeln('Type something and press Enter...')

    // 捕获用户输入
    terminal.onKey(({ key, domEvent }) => {
      if (domEvent.key === 'Enter') {
        terminal.writeln('') // 换行
      }
    })

    terminal.onData(data => {
      if (data === '\u007F') {
        // 退格键
        terminal.write('\b \b')
      } else {
        terminal.write(data)
      }
    })

    return () => {
      // 清理终端实例
      terminal.dispose()
    }
  }, [])

  return (
    <div className="bg-black flex-1">
      <div ref={terminalRef} className="h-96 p-2 overflow-hidden" />
    </div>
  )
}

export default XtermConsole
