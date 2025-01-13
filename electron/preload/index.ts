import { contextBridge, ipcRenderer } from 'electron'

type callback = (value: number) => void

contextBridge.exposeInMainWorld('app', {
  // resources path
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  // Template files
  rmTemplateFiles: () => ipcRenderer.invoke('rm-template-files-dir')
})

// 扩展
contextBridge.exposeInMainWorld('expansions', {
  run: (data: string) => ipcRenderer.invoke('expansions-run', data),
  close: () => ipcRenderer.invoke('expansions-close'),
  status: () => ipcRenderer.invoke('expansions-status'),
  onStdout: (callback: callback) =>
    ipcRenderer.on('expansions-stdout', (_event, value) => callback(value)),
  onStatus: (callback: callback) =>
    ipcRenderer.on('expansions-status', (_event, value) => callback(value)),
  // 监听 electron 发来的 command
  onCommand: (callback: (value: string) => void) =>
    ipcRenderer.on('expansions-command', (_event, value) => callback(value)),
  // 监听 electron 发来的 message
  onMessage: (callback: (value: any) => void) =>
    ipcRenderer.on('expansions-message', (_event, value) => callback(value)),
  postMessage: (data: any) => ipcRenderer.invoke('expansions-post-message', data)
})

contextBridge.exposeInMainWorld('bot', {
  run: (data: string) => ipcRenderer.invoke('bot-run', data),
  close: () => ipcRenderer.invoke('bot-close'),
  status: () => ipcRenderer.invoke('bot-status'),
  onStdout: (callback: callback) =>
    ipcRenderer.on('bot-stdout', (_event, value) => callback(value)),
  onStatus: (callback: callback) => ipcRenderer.on('bot-status', (_event, value) => callback(value))
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
  update: () => ipcRenderer.send('update-version'),
  cssVariables: () => ipcRenderer.invoke('css-variables'),
  onCSSVariables: (callback: (val: any) => void) => {
    ipcRenderer.on('on-css-variables', (_event, value) => callback(value))
  }
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
