import { contextBridge, ipcRenderer } from 'electron'

type callback = (value: number) => void

contextBridge.exposeInMainWorld('yarn', {
  // 得到 yarn 状态
  status: (data: 'yarnInstall' | 'yarnAdd' | 'yarnLink' | 'yarnUnLink') =>
    ipcRenderer.invoke('yarn-status', data),
  // yarn 得到是否成功
  install: () => ipcRenderer.invoke('yarn-install'),
  onInstallStatus: (callback: callback) => {
    ipcRenderer.on('yarn-install-status', (_event, value) => callback(value))
  },
  add: (data: string) => ipcRenderer.invoke('yarn-add', data),
  onAddStatus: (callback: callback) =>
    ipcRenderer.on('yarn-add-status', (_event, value) => callback(value)),
  link: (data: string) => ipcRenderer.invoke('yarn-link', data),
  onLinkStatus: (callback: callback) =>
    ipcRenderer.on('yarn-link-status', (_event, value) => callback(value)),
  unLink: (data: string) => ipcRenderer.invoke('yarn-unlink', data),
  onUnLinkStatus: (callback: callback) =>
    ipcRenderer.on('yarn-unlink-status', (_event, value) => callback(value))
})
