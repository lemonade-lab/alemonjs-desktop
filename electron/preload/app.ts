import { contextBridge, ipcRenderer } from 'electron'
contextBridge.exposeInMainWorld('app', {
  // static
  getAppsPath: () => ipcRenderer.invoke('get-apps-path'),
  // resources path
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  // Template files
  rmTemplateFiles: () => ipcRenderer.invoke('rm-template-files-dir'),
  // Read files
  readFiles: (data: string) => ipcRenderer.invoke('read-files', data)
})
