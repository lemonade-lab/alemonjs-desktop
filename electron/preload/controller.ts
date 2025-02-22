import { contextBridge, ipcRenderer } from 'electron'

// 控制 electron
contextBridge.exposeInMainWorld('controller', {
  // 最小化
  minimize: () => {
    ipcRenderer.send('minimize-window')
  },
  // 最大化
  maximize: () => {
    ipcRenderer.send('maximize-window')
  },
  // 关闭
  close: () => {
    ipcRenderer.send('close-window')
  },
  // 更新版本
  updateVersion: () => {
    ipcRenderer.send('update-version')
  },
  // 下载进度
  onDownloadProgress: (callback: (val: any) => void) => {
    ipcRenderer.on('on-download-progress', (_event, value) => callback(value))
  },
  // 通知栏
  onNotification: (callback: (val: any) => void) => {
    ipcRenderer.on('on-notification', (_event, value) => callback(value))
  },
  // 弹窗
  onModal: (callback: (val: any) => void) => {
    ipcRenderer.on('on-modal', (_event, value) => callback(value))
  },
  // 点击按钮
  onClick: (code: number, data: any) => ipcRenderer.invoke('clicked', code, data)
})
