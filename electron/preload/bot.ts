import { contextBridge, ipcRenderer } from 'electron'

type callback = (value: number) => void

contextBridge.exposeInMainWorld('bot', {
  run: (data: string) => ipcRenderer.invoke('bot-run', data),
  close: () => ipcRenderer.invoke('bot-close'),
  status: () => ipcRenderer.invoke('bot-status'),
  onStdout: (callback: callback) =>
    ipcRenderer.on('bot-stdout', (_event, value) => callback(value)),
  onStatus: (callback: callback) => ipcRenderer.on('bot-status', (_event, value) => callback(value))
})
