import { contextBridge, ipcRenderer } from 'electron'

// 控制
contextBridge.exposeInMainWorld('theme', {
  variables: () => {
    ipcRenderer.send('css-variables')
  },
  // 恢复默认
  initVariables: () => {
    // init-css-variables
    ipcRenderer.send('init-css-variables')
  },
  save: (data: Object) => {
    ipcRenderer.send('save-css-variables', data)
  },
  on: (callback: (val: any) => void) => {
    ipcRenderer.on('on-css-variables', (_event, value) => callback(value))
  },
  // 设置主题模式
  setMode: (mode: string) => {
    ipcRenderer.send('set-theme-mode', mode)
  },
  mode: () => ipcRenderer.invoke('get-theme-mode')
})
