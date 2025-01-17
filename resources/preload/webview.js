const { ipcRenderer, contextBridge } = require('electron')

// electron 桌面 接口
contextBridge.exposeInMainWorld('appDesktopAPI', {
  // 为 webview 创建 API
  create: name => ({
    // 发送消息
    postMessage: data => {
      ipcRenderer.invoke('expansions-post-message', {
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
    },
    expansion: {
      // 获取扩展列表
      getList: () => {
        // 触发获取扩展列表
        ipcRenderer.invoke('expansions-post-message', {
          type: 'webview-get-expansions',
          data: {
            name: name,
            value: {}
          }
        })
      },
      // 监听发来的 message
      on: callback => {
        ipcRenderer.on('webview-expansions-message', (_event, data) => {
          if (data.name == name) {
            callback && callback(data.value)
          }
        })
      }
    }
  })
})
