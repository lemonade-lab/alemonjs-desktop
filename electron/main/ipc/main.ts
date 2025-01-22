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

/**
 * 主进程自身，
 * 通过渲染进程发送的消息
 * 再传递回主进程
 * 可以知晓发送该消息的渲染进程是谁
 * 操作对应的渲染进程
 * 打开开发者工具
 * @description 开发者工具
 */

ipcMain.on('open-dev-tools', event => {
  event.sender.openDevTools()
})
