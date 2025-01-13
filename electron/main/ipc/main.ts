import './bot'
import './template'
import './window'
import './yarn'
import './css'
import './expansions'
import { BrowserWindow, ipcMain } from 'electron'
import { autoUpdateApp } from '../../core/update'

// tools
ipcMain.on('OPEN-DEV-TOOLS', event => {
  const window = BrowserWindow.fromWebContents(event.sender)
  // 打开开发者工具
  window?.webContents?.openDevTools()
})

// version
ipcMain.on('update-version', (event, __) => {
  const window = BrowserWindow.fromWebContents(event.sender)
  window && autoUpdateApp(window, true)
})
