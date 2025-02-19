import { ipcMain } from 'electron'
import Logger from 'electron-log'
import { webviewWindows } from '../../src/webview'
import { getCSSVariables, getInitCSSVariables, setCSSVariables } from '../../src/css'
import { localStorage } from '../../src/storage'

ipcMain.on('css-variables', event => {
  try {
    const d = getCSSVariables()
    if (!d) return
    // 发送数据
    event.sender.send('on-css-variables', d)
    // 发送给 webview
    webviewWindows.forEach((value, key) => {
      // 确保未被销毁
      if (value.isDestroyed()) return
      value.send('webview-hide-message', {
        _name: key,
        type: 'css-variables',
        data: d
      })
    })
  } catch (e) {
    Logger.error(e)
  }
})

ipcMain.on('init-css-variables', event => {
  try {
    const d = getInitCSSVariables()
    if (!d) return
    // 发送数据
    event.sender.send('on-css-variables', d)
    // 发送给 webview
    webviewWindows.forEach((value, key) => {
      // 确保未被销毁
      if (value.isDestroyed()) return
      value.send('webview-hide-message', {
        _name: key,
        type: 'css-variables',
        data: d
      })
    })
  } catch (e) {
    Logger.error(e)
  }
})

ipcMain.on('save-css-variables', (event, data) => {
  setCSSVariables(data)
})

const KEY = 'theme-mode'

ipcMain.on('set-theme-mode', (event, mode) => {
  // 存储起来
  localStorage.set(KEY, mode)

  // 设置的时候，发送给 webview
  webviewWindows.forEach((value, key) => {
    // 确保未被销毁
    if (value.isDestroyed()) return
    value.send('webview-hide-message', {
      _name: key,
      type: 'theme-mode',
      data: mode
    })
  })
})

ipcMain.handle('get-theme-mode', () => {
  return localStorage.get(KEY, 'light')
})
