import { BrowserWindow, ipcMain } from 'electron'
import { autoUpdateApp } from '../core/update'

// 更新版本
ipcMain.on('update-version', (event, __) => {
  const window = BrowserWindow.fromWebContents(event.sender)
  if (!window) return
  if (window.isDestroyed()) return
  autoUpdateApp(window, true)
})
