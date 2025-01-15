const { ipcRenderer, contextBridge } = require('electron')

// 版本信息
contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  platform: process.platform
})

// 版本信息
contextBridge.exposeInMainWorld('appDesktopAPI', {
  create: name => ({
    postMessage: data => {
      ipcRenderer.invoke('webview-post-message', {
        type: 'webview-post-message',
        data: {
          name: name,
          value: data
        }
      })
    },
    onMessage: callback => {
      ipcRenderer.on('webview-on-message', (_event, data) => {
        if (data.name == name) {
          callback(data.value)
        }
      })
    }
  })
})
