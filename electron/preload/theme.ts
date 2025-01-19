import { contextBridge, ipcRenderer } from 'electron'

// 控制
contextBridge.exposeInMainWorld('theme', {
  variables: () => {
    ipcRenderer.send('css-variables')
  },
  on: (callback: (val: any) => void) => {
    ipcRenderer.on('on-css-variables', (_event, value) => callback(value))
  }
})
