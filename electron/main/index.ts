import './env'
import './ipc/main'
import { app } from 'electron'
import { createShortcut } from '../core/shortcut'
import { createTray } from '../core/tray'
import { createWindow } from './window'
import { autoUpdateApp } from '../core/update'
import { onBeforeRequest } from '../core/session'

// 当应用程序准备就绪时，创建主窗口
app.whenReady().then(() => {
  // 创建快捷键
  createShortcut()

  // 创建菜单图标
  const tray = createTray()

  onBeforeRequest('')

  const window = createWindow()

  if (!window) return

  // 隐藏菜单栏
  window.setMenuBarVisibility(false)

  // 检查更新
  autoUpdateApp(window)

  // 监听点击托盘的事件
  tray.on('click', () => {
    // 隐藏状态下显示
    if (window.isVisible()) window.show()
  })

  // 等待加载完成
  const didFinishLoadHandler = () => {
    // 显示窗口
    window.show()
    // 加载执行完就注销
    window.webContents.removeListener('did-finish-load', didFinishLoadHandler)
    return
  }

  // 加载完成后显示窗口
  window.webContents.on('did-finish-load', didFinishLoadHandler)

  // 设置应用的用户模型 ID 替换为你的应用标识
  app.setAppUserModelId('com.alemonjs.desktop')
})
