import { BrowserWindow, screen, shell } from 'electron'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))

// 获取屏幕尺寸
const getScreenSize = (): Electron.Size => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  return { width, height }
}

const preload = join(__dirname, '../../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

export const createTerminal = () => {
  // 获取屏幕尺寸
  const screenSize = getScreenSize()
  // 创建浏览器窗口。
  const terminal = new BrowserWindow({
    width: parseInt((screenSize.width * 0.6).toFixed(0)),
    height: parseInt((screenSize.height * 0.6).toFixed(0)),
    minWidth: parseInt((screenSize.width * 0.6).toFixed(0)),
    minHeight: parseInt((screenSize.height * 0.6).toFixed(0)),
    // 默认窗口标题。默认为"Electron"。
    // 如果 HTML 标签<title>是 在加载的 HTML 文件中定义loadURL()，该属性将被忽略。
    title: 'AlemonJS',
    // 窗口标题栏的样式。默认为default。可能的值为：
    titleBarStyle: 'hidden',
    // 先隐藏窗口
    show: true,
    // 窗口标题栏的颜色。默认为#000000。
    icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
    // 是否可以最小化窗口。默认为true。
    webPreferences: {
      // nodeIntegration: true,
      contextIsolation: true,
      // webSecurity: false, // 禁用 Web 安全策略，允许 file:// 协议加载
      webviewTag: true, // 启用 webview 支持
      preload
    }
  })

  // 加载应用的HTML(URL when dev)。
  if (url) {
    terminal.loadURL(url + '#/window/terminal')
  } else {
    terminal.loadFile(indexHtml, {
      hash: '#/window/terminal'
    })
  }

  // // 等待加载完成
  const didFinishLoadHandler = () => {
    if (!terminal) return
    if (terminal.isDestroyed()) return
    // 显示窗口
    terminal.show()
    // 加载执行完就注销
    terminal.webContents.removeListener('did-finish-load', didFinishLoadHandler)
    return
  }

  // 隐藏菜单栏
  terminal.setMenuBarVisibility(false)

  // 加载完成后显示窗口
  terminal.webContents.on('did-finish-load', didFinishLoadHandler)

  // 让所有链接都通过浏览器打开，而不是通过应用程序打开
  terminal.webContents.setWindowOpenHandler(({ url }) => {
    if (/http(s)?:\/\//.test(url)) {
      shell.openExternal(url)
    }
    return { action: 'deny' }
  })

  return terminal
}
