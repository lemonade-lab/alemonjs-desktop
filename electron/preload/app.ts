import { contextBridge, ipcRenderer } from 'electron'
//
contextBridge.exposeInMainWorld('app', {
  // static
  getAppsPath: () => ipcRenderer.invoke('get-apps-path'),
  // Template files
  rmTemplateFiles: () => ipcRenderer.invoke('rm-template-files'),
  // Read files
  readFiles: (data: string) => ipcRenderer.invoke('read-files', data)
})
