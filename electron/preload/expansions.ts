import { contextBridge, ipcRenderer } from 'electron'

type callback = (value: number) => void

// 扩展
contextBridge.exposeInMainWorld('expansions', {
  run: (data: string) => ipcRenderer.invoke('expansions-run', data),
  close: () => ipcRenderer.invoke('expansions-close'),
  status: () => ipcRenderer.invoke('expansions-status'),
  onStdout: (callback: callback) =>
    ipcRenderer.on('expansions-stdout', (_event, value) => callback(value)),
  onStatus: (callback: callback) =>
    ipcRenderer.on('expansions-status', (_event, value) => callback(value)),
  // 监听 electron 发来的 command
  onCommand: (callback: (value: string) => void) =>
    ipcRenderer.on('expansions-command', (_event, value) => callback(value)),
  // 监听 electron 发来的 message
  onMessage: (callback: (value: any) => void) =>
    ipcRenderer.on('expansions-message', (_event, value) => callback(value)),
  postMessage: (data: any) => ipcRenderer.invoke('expansions-post-message', data)
})
