import { contextBridge, ipcRenderer } from 'electron'
import './app'
import './bot'
import './controller'
import './expansions'
import './versions'
import './yarn'

type callback = (value: number) => void

// 开发工具
ipcRenderer.on('open-dev-tools', () => {
  ipcRenderer.send('OPEN-DEV-TOOLS')
})

// 刷新页面
ipcRenderer.on('reload-page', () => {
  window?.location?.reload()
  // 更改为。发送消息到主进程。
  // 由主进程来重新创建窗口
})

// 控制台
contextBridge.exposeInMainWorld('terminal', {
  // 监听控制台消息
  on: (callback: callback) => {
    ipcRenderer.on('on-terminal', (_event, value) => callback(value))
  }
})
