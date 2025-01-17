import { contextBridge, ipcRenderer } from 'electron'

// 控制 electron
contextBridge.exposeInMainWorld('controller', {
  minimize: () => {
    ipcRenderer.send('minimize-window')
  },
  maximize: () => {
    ipcRenderer.send('maximize-window')
  },
  close: () => {
    ipcRenderer.send('close-window')
  },
  update: () => {
    ipcRenderer.send('update-version')
  },
  setAutoLaunch: (enable: boolean) => ipcRenderer.invoke('set-auto-launch', enable),
  autoLaunchStutas: () => ipcRenderer.invoke('get-auto-launch-status')
})

// 控制
contextBridge.exposeInMainWorld('theme', {
  // 主题变量
  variables: () => {
    ipcRenderer.send('css-variables')
  },
  // 主题变化
  on: (callback: (val: any) => void) => {
    ipcRenderer.on('on-css-variables', (_event, value) => callback(value))
  }
})
