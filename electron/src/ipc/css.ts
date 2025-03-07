import { ipcMain } from 'electron'
import Logger from 'electron-log'
import { webviewWindows } from '../../src/data/webview'
import { getCSSVariables, getInitCSSVariables, setCSSVariables } from '../core/css'
import { localStorage } from '../../src/data/storage'
import { ALEMONJS_THEM_MODE } from '../../src/data/conifg'

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

ipcMain.on('set-theme-mode', (event, mode) => {
  // 存储起来
  localStorage.set(ALEMONJS_THEM_MODE, mode)

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
  return localStorage.get(ALEMONJS_THEM_MODE, 'light')
})
