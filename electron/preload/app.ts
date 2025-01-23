import { contextBridge, ipcRenderer } from 'electron'
//
contextBridge.exposeInMainWorld('app', {
  getAppsPath: () => ipcRenderer.invoke('get-apps-path'),
  rmTemplateFiles: () => ipcRenderer.invoke('rm-template-files'),
  reIniteTemplate: () => ipcRenderer.send('re-inite-template'),
  readFiles: (data: string) => ipcRenderer.invoke('read-files', data),
  writeFiles: (dir: string, data: string) => ipcRenderer.invoke('write-files', dir, data),
  downloadFiles: (data: string) => ipcRenderer.send('download-files', data),
  /**
   *
   * @returns
   */
  openWindowTerminal: () => ipcRenderer.send('open-window-terminal'),
  /**
   *
   */
  openWindowMain: () => ipcRenderer.send('open-window-main')
})
