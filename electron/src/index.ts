import './core/env'
import './ipc'
import { createShortcut } from './core/shortcut'
import { createTray } from './core/tray'
import { onBeforeRequest } from './core/session'
import { app, BrowserWindow } from 'electron'
import { temporaryStorage } from './data/storage'
import { createWindow } from './main'

// 定义全局变量类型 window
declare global {
  var mainWindow: BrowserWindow | null
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
    if (temporaryStorage.autoUpdate) {
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
  if (temporaryStorage.autoUpdate) {
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
