import './env'
import './ipc'
import { createShortcut } from '../src/shortcut'
import { createTray } from '../src/tray'
import { onBeforeRequest } from '../src/session'
import { app, BrowserWindow, shell, screen } from 'electron'
import { storage } from '../src/storage'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))

// 获取屏幕尺寸
const getScreenSize = (): Electron.Size => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  return { width, height }
}

// 定义全局变量类型 window
declare global {
  var mainWindow: BrowserWindow | null
}

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
  const main = new BrowserWindow({
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
      // nodeIntegration: true,
      contextIsolation: true,
      // webSecurity: false, // 禁用 Web 安全策略，允许 file:// 协议加载
      webviewTag: true, // 启用 webview 支持
      preload
    }
  })

  if (main.isDestroyed()) return

  // 加载应用的HTML(URL when dev)。
  if (url) {
    main.loadURL(url)
  } else {
    main.loadFile(indexHtml)
  }

  //等待加载完成
  const didFinishLoadHandler = () => {
    if (!main) return
    if (main.isDestroyed()) return
    // 显示窗口
    main.show()
    // 加载执行完就注销
    main.webContents.removeListener('did-finish-load', didFinishLoadHandler)
    return
  }

  // 加载完成后显示窗口
  main.webContents.on('did-finish-load', didFinishLoadHandler)

  // 隐藏菜单栏
  main.setMenuBarVisibility(false)

  // 让所有链接都通过浏览器打开，而不是通过应用程序打开
  main.webContents.setWindowOpenHandler(({ url }) => {
    if (/http(s)?:\/\//.test(url)) {
      shell.openExternal(url)
    }
    return { action: 'deny' }
  })

  return main
}

const initWindow = () => {
  // 创建窗口
  const main = createWindow()
  if (main) {
    global.mainWindow = main
  }
  if (!global.mainWindow) return

  // 在窗口被关闭时进行清理
  global.mainWindow.on('closed', () => {
    global.mainWindow = null
  })

  // 禁止窗口关闭，改为隐藏
  global.mainWindow.on('close', event => {
    if (storage.autoUpdate) {
      app.quit()
      return
    }
    if (global.mainWindow && global.mainWindow.isVisible()) {
      event.preventDefault() // 阻止默认的关闭行为
      global.mainWindow.hide() // 隐藏窗口
    } else {
      // 关闭
      app.exit()
    }
  })
}

// 当应用程序准备就绪时，创建主窗口
app.whenReady().then(() => {
  // 初始化窗口
  initWindow()

  setTimeout(() => {
    onBeforeRequest()
    createShortcut()

    // 创建菜单图标
    const tray = createTray()
    // 监听点击托盘的事件
    tray.on('click', () => {
      if (!global.mainWindow) return
      // 窗口被销毁了
      if (global.mainWindow.isDestroyed()) return
      // 最小就得恢复正常
      if (global.mainWindow.isMinimized()) global.mainWindow.restore()
      // 隐藏中得显示
      if (!global.mainWindow.isVisible()) global.mainWindow.show()
      // 聚焦
      global.mainWindow.focus()
    })
  })
})

// 防止应用程序的多个实例
app.on('second-instance', () => {
  if (!global.mainWindow) return
  // 窗口被销毁了
  if (global.mainWindow.isDestroyed()) return
  // 如果用户尝试打开另一个窗口，则聚焦于主窗口
  if (global.mainWindow.isMinimized()) global.mainWindow.restore()
  // 聚焦
  global.mainWindow.focus()
})

// 当所有窗口都关闭后，退出应用程序
app.on('window-all-closed', () => {
  if (storage.autoUpdate) {
    app.quit()
    return
  }
})

// 监听退出事件
app.on('before-quit', () => {
  // 直接关闭
  app.exit()
})

// 如果用户单击应用程序的停靠栏图标，则恢复主窗口
app.on('activate', () => {
  if (!global.mainWindow) return
  // 窗口被销毁了
  if (global.mainWindow.isDestroyed()) return
  // 最小就得恢复正常
  if (global.mainWindow.isMinimized()) global.mainWindow.restore()
  // 隐藏中得显示
  if (!global.mainWindow.isVisible()) global.mainWindow.show()
  // 聚焦
  global.mainWindow.focus()
})

/**
 * 注销周期
 * win.on('close')
 * app.on('all-close')
 * app.on('before-quit')
 *
 * 如果是程序坞，则
 * before-quit
 * close
 * all-close
 *
 * 最终是 before-quit
 * 都执行 app.exit()
 *
 */
