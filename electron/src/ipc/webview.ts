import { ipcMain } from 'electron'
import { webviewWindows } from '../../src/data/webview'
import { getCSSVariables } from '../core/css'
import { localStorage } from '../../src/data/storage'
import { ALEMONJS_THEM_MODE } from '../../src/data/conifg'

// window
// webview-hide-message-create
ipcMain.handle('webview-hide-message-create', (event, data) => {
  const _name = data._name
  webviewWindows.set(_name, event.sender)
})

// webview 私密消息
ipcMain.on('webview-hide-message', (event, data) => {
  // webview 发送消息过来
  const _name = data._name
  if (!webviewWindows.has(_name)) return
  if (data.type == 'css-variables') {
    const d = getCSSVariables()
    if (!d) return
    webviewWindows.get(_name)?.send('webview-hide-message', {
      _name,
      type: 'css-variables',
      data: d
    })
  } else if (data.type == 'theme-mode') {
    // 读取本地存储。获取主题模式
    // 主题模式
    webviewWindows.get(_name)?.send('webview-hide-message', {
      _name,
      type: 'theme-mode',
      data: localStorage.get(ALEMONJS_THEM_MODE)
    })
  }
})
