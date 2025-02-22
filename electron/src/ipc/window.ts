import { BrowserWindow, ipcMain } from 'electron'
import { createTerminal } from '../terminal'
import { initTemplate } from '../core/init'
import { yarn } from '../../src/script/yarn'
import { temporaryStorage } from '../../src/data/storage'
import * as updater from 'electron-updater'

// 监听最小化、最大化和关闭事件
ipcMain.on('minimize-window', event => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (!win) return
  // 窗口已经被销毁
  if (win.isDestroyed()) return
  // 最小化窗口
  win.minimize()
})

// 监听最小化、最大化和关闭事件
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

// 监听最小化、最大化和关闭事件
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

// 打开终端窗口
let terminalWindow: Electron.BrowserWindow | null = null

// 监听打开终端窗口
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

// 监听打开主窗口
ipcMain.on('open-window-main', () => {
  if (!global.mainWindow) {
    // main窗口是不可以被关闭的
    // 只能隐藏
  } else {
    global.mainWindow.show()
  }
})

// 触发窗口的点击事件
ipcMain.handle('clicked', (event, code, data) => {
  if (code === 2000) {
    temporaryStorage.autoUpdate = true
    updater.autoUpdater.quitAndInstall()
  } else if (code === 2010) {
    initTemplate()
    yarn(event.sender, data)
  }
  return true
})
