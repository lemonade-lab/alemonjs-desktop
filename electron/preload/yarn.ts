import { contextBridge, ipcRenderer } from 'electron'

type callback = (value: number) => void

contextBridge.exposeInMainWorld('yarn', {
  // 执行命令
  cmds: (data: { type: string; value: string[] }) => ipcRenderer.send('yarn', data),
  // 监听变化
  on(callback: callback) {
    ipcRenderer.on('yarn-status', (_event, value) => callback(value))
  }
})
