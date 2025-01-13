import { contextBridge, ipcRenderer } from 'electron'

// 控制 electron
contextBridge.exposeInMainWorld('controller', {
  minimize: () => ipcRenderer.send('minimize-window'),
  maximize: () => ipcRenderer.send('maximize-window'),
  close: () => ipcRenderer.send('close-window'),
  update: () => ipcRenderer.send('update-version'),
  cssVariables: () => ipcRenderer.invoke('css-variables'),
  onCSSVariables: (callback: (val: any) => void) => {
    ipcRenderer.on('on-css-variables', (_event, value) => callback(value))
  }
})
