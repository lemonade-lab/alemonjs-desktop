import { contextBridge, ipcRenderer } from 'electron'
//
contextBridge.exposeInMainWorld('app', {
  getAppsPath: () => ipcRenderer.invoke('get-apps-path'),
  rmTemplateFiles: () => ipcRenderer.invoke('rm-template-files'),
  reIniteTemplate: () => ipcRenderer.send('re-inite-template'),
  readFiles: (data: string) => ipcRenderer.invoke('read-files', data),
  writeFiles: (dir: string, data: string) => ipcRenderer.invoke('write-files', dir, data),
  exists: (dir: string) => ipcRenderer.invoke('exists-files', dir),
  fetch: (url: string, options: any) => ipcRenderer.invoke('fetch', url, options),
  downloadFiles: (data: string) => ipcRenderer.send('download-files', data),
  openWindowTerminal: () => ipcRenderer.send('open-window-terminal'),
  openWindowMain: () => ipcRenderer.send('open-window-main'),
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  reStart: (dir: string) => ipcRenderer.send('restart-app', dir)
})
