import { contextBridge, ipcRenderer } from 'electron'

type callback = (value: number) => void

contextBridge.exposeInMainWorld('bot', {
  // 得到机器人状态
  status: () => ipcRenderer.invoke('bot-status'),
  // 运行
  run: (data: string) => {
    ipcRenderer.send('bot-run', data)
  },
  // 关闭
  close: () => {
    ipcRenderer.send('bot-close')
  },
  // 监听运行状态
  onStatus: (callback: callback) => {
    ipcRenderer.on('bot-status', (_event, value) => callback(value))
  }
})
