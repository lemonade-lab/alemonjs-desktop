import './env'
import './ipc/main'
import { createShortcut } from '../core/shortcut'
import { createTray } from '../core/tray'
import { autoUpdateApp } from '../core/update'
import { onBeforeRequest } from '../core/session'
import { app, BrowserWindow, shell, screen } from 'electron'
import { join } from 'node:path'

// 获取屏幕尺寸
const getScreenSize = (): Electron.Size => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  return { width, height }
}

let win: BrowserWindow | null = null

const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

/**
 * 创建窗口
 */
export const createWindow = () => {
  // 获取屏幕尺寸
  const screenSize = getScreenSize()

  // 创建浏览器窗口。
  win = new BrowserWindow({
    width: parseInt((screenSize.width * 0.75).toFixed(0)),
    height: parseInt((screenSize.height * 0.75).toFixed(0)),
    minWidth: parseInt((screenSize.width * 0.75).toFixed(0)),
    minHeight: parseInt((screenSize.height * 0.75).toFixed(0)),
    // 默认窗口标题。默认为"Electron"。
    // 如果 HTML 标签<title>是 在加载的 HTML 文件中定义loadURL()，该属性将被忽略。
    title: 'AlemonJS',
    // 窗口标题栏的样式。默认为default。可能的值为：
    titleBarStyle: 'hidden',
    // 先隐藏窗口
    show: false,
    // 窗口标题栏的颜色。默认为#000000。
    icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
    // 是否可以最小化窗口。默认为true。
    webPreferences: {
      webSecurity: false, // 禁用 Web 安全策略，允许 file:// 协议加载
      webviewTag: true, // 启用 webview 支持
      preload
    }
  })

  if (win.isDestroyed()) return

  // 加载应用的HTML(URL when dev)。
  if (url) {
    win.loadURL(url)
  } else {
    win.loadFile(indexHtml)
  }

  // 让所有链接都通过浏览器打开，而不是通过应用程序打开
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  // 在窗口被关闭时进行清理
  win.on('closed', () => {
    win = null
  })
}

const initWindow = () => {
  // 创建窗口
  createWindow()

  if (!win) return

  // 隐藏菜单栏
  win.setMenuBarVisibility(false)

  // 检查更新
  autoUpdateApp(win)

  // 等待加载完成
  const didFinishLoadHandler = () => {
    if (!win) return
    if (win.isDestroyed()) return
    // 显示窗口
    win.show()
    // 加载执行完就注销
    win.webContents.removeListener('did-finish-load', didFinishLoadHandler)
    return
  }

  // 加载完成后显示窗口
  win.webContents.on('did-finish-load', didFinishLoadHandler)
}

// 当应用程序准备就绪时，创建主窗口
app.whenReady().then(() => {
  // 设置应用的用户模型 ID 替换为你的应用标识
  app.setAppUserModelId('com.alemonjs.desktop')

  // 创建快捷键
  createShortcut()

  // 注册资源协议
  onBeforeRequest()

  // 创建菜单图标
  const tray = createTray()

  // 监听点击托盘的事件
  tray.on('click', () => {
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
      const win = allWindows[0]
      if (win.isDestroyed()) return
      // 最小化窗口
      if (win.isMinimized()) win.restore()
      win.focus()
    } else {
      // 初始化窗口
      initWindow()
    }
  })
})

// 当所有窗口都关闭后，退出应用程序
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 防止应用程序的多个实例
app.on('second-instance', () => {
  if (win) {
    if (win.isDestroyed()) return
    // if (!win.isVisible()) win.show()
    // 如果用户尝试打开另一个窗口，则聚焦于主窗口
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

// 如果用户单击应用程序的停靠栏图标，则恢复主窗口
app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    const win = allWindows[0]
    if (win.isDestroyed()) return
    // 最小化窗口
    if (win.isMinimized()) win.restore()
    win.focus()
  } else {
    // 初始化窗口
    initWindow()
  }
})
