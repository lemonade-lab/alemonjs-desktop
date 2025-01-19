import { contextBridge, ipcRenderer } from 'electron'

type callback = (value: number) => void

// 控制台
contextBridge.exposeInMainWorld('terminal', {
  // 监听控制台消息
  on: (callback: callback) => {
    ipcRenderer.on('on-terminal', (_event, value) => callback(value))
  }
})
