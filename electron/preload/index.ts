import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('app', {
  // resources path
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  // yarn
  yarnInstall: () => ipcRenderer.invoke('yarn-install'),
  yarnAdd: (data: string) => ipcRenderer.invoke('yarn-add', data),
  // bot
  botRun: () => ipcRenderer.invoke('bot-run'),
  botClose: () => ipcRenderer.invoke('bot-close'),
  botIsRunning: () => ipcRenderer.invoke('bot-is-running'),
  // Template
  isTemplateExists: () => ipcRenderer.invoke('get-template-exists'),
  rmTemplateFiles: () => ipcRenderer.invoke('rm-template-files-dir'),
  // bot config
  botConfigRead: () => ipcRenderer.invoke('bot-config-read'),
  botConfigWrite: () => ipcRenderer.invoke('bot-config-write')
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
