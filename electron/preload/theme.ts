import { contextBridge, ipcRenderer } from 'electron'

// 控制
contextBridge.exposeInMainWorld('theme', {
  variables: () => {
    ipcRenderer.send('css-variables')
  },
  save: (data: Object) => {
    ipcRenderer.send('save-css-variables', data)
  },
  on: (callback: (val: any) => void) => {
    ipcRenderer.on('on-css-variables', (_event, value) => callback(value))
  }
})
