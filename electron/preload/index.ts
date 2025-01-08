import { contextBridge, ipcRenderer } from 'electron'

type callback = (value: number) => void

contextBridge.exposeInMainWorld('app', {
  // resources path
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  // bot
  botRun: (data: string) => ipcRenderer.invoke('bot-run', data),
  botClose: () => ipcRenderer.invoke('bot-close'),
  botStatus: () => ipcRenderer.invoke('bot-status'),
  onBotStdout: (callback: callback) =>
    ipcRenderer.on('bot-stdout', (_event, value) => callback(value)),
  onBotStatus: (callback: callback) =>
    ipcRenderer.on('bot-status', (_event, value) => callback(value)),
  // Template files
  rmTemplateFiles: () => ipcRenderer.invoke('rm-template-files-dir'),
  // bot config
  botConfigRead: () => ipcRenderer.invoke('bot-config-read'),
  botConfigWrite: () => ipcRenderer.invoke('bot-config-write')
})

contextBridge.exposeInMainWorld('yarn', {
  // yarn
  install: () => ipcRenderer.invoke('yarn-install'),
  add: (data: string) => ipcRenderer.invoke('yarn-add', data),
  onInstallStatus: (callback: callback) =>
    ipcRenderer.on('yarn-install-status', (_event, value) => callback(value)),
  onAddStatus: (callback: callback) =>
    ipcRenderer.on('yarn-add-status', (_event, value) => callback(value)),
  status: (data: 'yarnInstall' | 'yarnAdd') => ipcRenderer.invoke('yarn-status', data)
})

// 控制 electron
contextBridge.exposeInMainWorld('controller', {
  minimize: () => ipcRenderer.send('minimize-window'),
  maximize: () => ipcRenderer.send('maximize-window'),
  close: () => ipcRenderer.send('close-window'),
  update: () => ipcRenderer.send('update-version')
})

// 版本信息
contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  platform: process.platform
})

// 开发工具
ipcRenderer.on('open-dev-tools', () => {
  ipcRenderer.send('OPEN-DEV-TOOLS')
})

// 刷新页面
ipcRenderer.on('reload-page', () => {
  window?.location?.reload()
})
