import { ipcMain } from 'electron'
import { webviewWindows } from '../../src/webview'
import { getCSSVariables } from '../../src/css'

// webview 隐藏消息
ipcMain.on('webview-hide-message', (event, data) => {
  // webview 发送消息过来
  const _name = data.name
  if (!webviewWindows.has(_name)) {
    return
  }
  if (data.type == 'css-variables') {
    const d = getCSSVariables()
    if (!d) return
    webviewWindows.get(_name)?.send('webview-hide-message', {
      _name,
      type: 'css-variables',
      data: d
    })
  } else if (data.type == 'them-mode') {
    // 读取本地存储。获取主题模式
    // 主题模式
    // webviewWindows.get(_name)?.send('webview-hide-message', {
    //   _name,
    //   type: 'them-mode',
    //   data: data.data
    // })
  }
})
