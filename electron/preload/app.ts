import { contextBridge, ipcRenderer } from 'electron'
//
contextBridge.exposeInMainWorld('app', {
  // static
  getAppsPath: () => ipcRenderer.invoke('get-apps-path'),
  // Template files
  rmTemplateFiles: () => ipcRenderer.invoke('rm-template-files'),
  // Read files
  readFiles: (data: string) => ipcRenderer.invoke('read-files', data),
  writeFiles: (dir: string, data: string) => ipcRenderer.invoke('write-files', dir, data),
  downloadFiles: (data: string) => ipcRenderer.send('download-files', data)
})
