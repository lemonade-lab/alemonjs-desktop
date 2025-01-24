const { ipcRenderer, contextBridge } = require('electron')

const invoke = 'expansions-post-message'

const select = {
  // 消息
  postMessage: 'webview-post-message',
  onMessage: 'webview-on-message',
  // 主题变量
  cssVariables: 'webview-css-variables',
  onCSSVariables: 'webview-on-css-variables',
  // 扩展
  getExpansions: 'webview-get-expansions',
  onExpansionsMessage: 'webview-on-expansions-message'
}

/**
 *
 * @param {*} callback
 * @param {*} select
 * @param {*} name
 */
const createOn = (callback, select, name) => {
  ipcRenderer.on(select, (_event, data) => {
    if (data.name == name) {
      callback && callback(data.value)
    }
  })
}

/**
 *
 * @param {*} data
 * @param {*} name
 * @param {*} typing
 */
const createValue = (data, name, typing) => {
  ipcRenderer.invoke(invoke, {
    type: typing,
    data: {
      name: name,
      value: data
    }
  })
}

contextBridge.exposeInMainWorld('appDesktopHideAPI', {
  // 创建api
  create: name => {
    // 创建时，发送一条进行记录webview
    ipcRenderer.invoke('webview-hide-message-create', {
      _name: name
    })
    // 返回api
    return {
      send: data => {
        /**
         * _name string
         * type string
         * data object
         */
        ipcRenderer.send('webview-hide-message', {
          _name: name,
          type: data?.type || '',
          data: data?.data || {}
        })
      },
      // 监听消息
      on: callback => {
        ipcRenderer.on('webview-hide-message', (_event, data) => {
          /**
           * _name string
           * type string
           * data object
           */
          if (data._name == name && callback) {
            // console.log('webview-hide-message', JSON.stringify(data))
            callback(data)
          }
        })
      }
    }
  },
  /**
   * @deprecated
   * @param {*} name
   * @returns
   */
  themeVariables: name => createValue({}, name, select.cssVariables),
  /**
   * @deprecated
   * @param {*} name
   * @param {*} callback
   * @returns
   */
  themeOn: (name, callback) => createOn(callback, select.onCSSVariables, name)
})

// electron 桌面 接口
contextBridge.exposeInMainWorld('appDesktopAPI', {
  // 为 webview 创建 API
  create: name => {
    // send on
    return {
      // 发送消息
      postMessage: data => createValue(data, name, select.postMessage),
      // 监听消息
      onMessage: callback => createOn(callback, select.onMessage, name),
      // 扩展
      expansion: {
        // 获取扩展列表
        getList: () => createValue({}, name, select.getExpansions),
        // 监听发来的 message
        on: callback => createOn(callback, select.onExpansionsMessage, name)
      }
    }
  }
})
