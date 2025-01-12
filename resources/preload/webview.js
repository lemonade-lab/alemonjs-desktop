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
      ipcRenderer.invoke(
        'expansions-post-message',
        JSON.stringify({
          type: 'webview-post-message',
          data: {
            name: name,
            value: data
          }
        })
      )
    }
  })
})
