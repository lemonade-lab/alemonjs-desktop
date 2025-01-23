import './bot'
import './app'
import './window'
import './yarn'
import './css'
import './expansions'
import { BrowserWindow, ipcMain } from 'electron'
import { autoUpdateApp } from '../../core/update'

// version
ipcMain.on('update-version', (event, __) => {
  const window = BrowserWindow.fromWebContents(event.sender)
  if (!window) return
  if (window.isDestroyed()) return
  autoUpdateApp(window, true)
})
