import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('app', {
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  isTemplateExists: () => ipcRenderer.invoke('get-template-exists'),
  yarnInstall: () => ipcRenderer.invoke('yarn-install'),
  yarnAdd: (data: string) => ipcRenderer.invoke('yarn-add', data),
  botRun: () => ipcRenderer.invoke('bot-run'),
  botClose: () => ipcRenderer.invoke('bot-close'),
  botIsRunning: () => ipcRenderer.invoke('bot-is-running'),
  rmTemplateFiles: () => ipcRenderer.invoke('rm-template-files-dir')
})

contextBridge.exposeInMainWorld('controller', {
  minimize: () => ipcRenderer.send('minimize-window'),
  maximize: () => ipcRenderer.send('maximize-window'),
  close: () => ipcRenderer.send('close-window'),
  update: () => ipcRenderer.send('update-version')
})

contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  platform: process.platform
})

ipcRenderer.on('open-dev-tools', () => {
  ipcRenderer.send('OPEN-DEV-TOOLS')
})

ipcRenderer.on('reload-page', () => {
  window?.location?.reload()
})
