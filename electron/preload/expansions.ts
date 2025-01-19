import { contextBridge, ipcRenderer } from 'electron'

type callback = (value: number) => void

// 扩展
contextBridge.exposeInMainWorld('expansions', {
  // 状态
  status: () => ipcRenderer.invoke('expansions-status'),
  // 运行
  run: (data: string) => {
    ipcRenderer.send('expansions-run', data)
  },
  // 关闭 并得到状态
  close: () => {
    ipcRenderer.send('expansions-close')
  },
  // 监听
  onStatus: (callback: callback) => {
    ipcRenderer.on('expansions-status', (_event, value) => callback(value))
  },
  // 监听发来的 message
  onMessage: (callback: (value: any) => void) => {
    ipcRenderer.on('expansions-message', (_event, value) => callback(value))
  },
  //  weviews 发送消息
  postMessage: (data: any) => {
    ipcRenderer.invoke('expansions-post-message', data)
  }
})
