import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('app', {
  // resources path
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  // Template files
  rmTemplateFiles: () => ipcRenderer.invoke('rm-template-files-dir')
})
