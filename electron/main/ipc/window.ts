import { BrowserWindow, ipcMain } from 'electron'
import { isAutoLaunchEnabled, setAutoLaunch } from '../../src/setLoginItemSettings'
import Logger from 'electron-log'
import { createTerminal } from '../terminal'
import { initTemplate } from '../../src/init'
import { yarn } from '../../src/yarn'

// 监听最小化、最大化和关闭事件
ipcMain.on('minimize-window', event => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (!win) return
  // 窗口已经被销毁
  if (win.isDestroyed()) return
  // 最小化窗口
  win.minimize()
})

ipcMain.on('maximize-window', event => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (!win) return
  if (win.isDestroyed()) return
  if (win.isMaximized()) {
    win.unmaximize()
  } else {
    win.maximize()
  }
})

ipcMain.on('close-window', event => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (!win) return
  // 窗口已经被销毁
  if (win.isDestroyed()) return
  // 判断平台
  if (process.platform === 'darwin') {
    // 隐藏窗口
    win.hide()
  } else {
    // 关闭窗口
    win.close()
  }
})

ipcMain.handle('set-auto-launch', (event, enable) => {
  try {
    setAutoLaunch(enable)
    return true
  } catch (e) {
    Logger.error(e)
    return false
  }
})

ipcMain.handle('get-auto-launch-status', () => isAutoLaunchEnabled())

let terminalWindow: Electron.BrowserWindow | null = null

ipcMain.on('open-window-terminal', () => {
  if (!terminalWindow) {
    terminalWindow = createTerminal()
    // terminalWindow 是可以关闭的
    terminalWindow.on('closed', () => {
      terminalWindow = null
    })
  } else {
    terminalWindow.show()
  }
})

ipcMain.on('open-window-main', () => {
  if (!global.mainWindow) {
    // main窗口是不可以被关闭的
    // 只能隐藏
  } else {
    global.mainWindow.show()
  }
})

ipcMain.handle('on-clicked', (event, code, data) => {
  if (code === 2010) {
    initTemplate()
    yarn(event.sender, data)
  }
  return true
})
