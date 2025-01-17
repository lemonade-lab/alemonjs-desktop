const { ipcRenderer, contextBridge } = require('electron')

// electron 桌面 接口
contextBridge.exposeInMainWorld('appDesktopAPI', {
  // 为 webview 创建 API
  create: name => ({
    // 发送消息
    postMessage: data => {
      ipcRenderer.invoke('webview-post-message', {
        type: 'webview-post-message',
        data: {
          name: name,
          value: data
        }
      })
    },
    // 监听消息
    onMessage: callback => {
      ipcRenderer.on('webview-on-message', (_event, data) => {
        if (data.name == name) {
          callback && callback(data.value)
        }
      })
    },
    theme: {
      // 主题变量
      variables: () => {
        ipcRenderer.send('css-variables')
      },
      // 主题变化
      on: callback => {
        ipcRenderer.on('on-css-variables', (_event, value) => callback(value))
      }
    }
  })
})
