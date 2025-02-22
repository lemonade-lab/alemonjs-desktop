import { contextBridge, ipcRenderer } from 'electron'

// 控制
contextBridge.exposeInMainWorld('theme', {
  // 得到 css 变量
  variables: () => {
    ipcRenderer.send('css-variables')
  },
  // 恢复默认
  initVariables: () => {
    // init-css-variables
    ipcRenderer.send('init-css-variables')
  },
  // 保存 css 变量
  save: (data: Object) => {
    ipcRenderer.send('save-css-variables', data)
  },
  // 监听 css 变量
  on: (callback: (val: any) => void) => {
    ipcRenderer.on('on-css-variables', (_event, value) => callback(value))
  },
  // 设置主题模式
  setMode: (mode: string) => {
    ipcRenderer.send('set-theme-mode', mode)
  },
  // 得到主题模式
  mode: () => ipcRenderer.invoke('get-theme-mode')
})
