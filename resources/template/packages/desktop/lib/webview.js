export class webView {
  /**
   *  插入脚本
   */
  get #htmlScript() {
    return `<script>  
            const createDesktopAPI = ()=> {
              const expansions_name = '${this.#name}'
              return window.appDesktopAPI.create(expansions_name)
            }
            window.createDesktopAPI = createDesktopAPI
    </script>`
  }

  #name = null

  __messages = []

  constructor(name) {
    this.#name = name
  }

  /**
   *
   * @param {*} callback
   */
  onMessage(callback) {
    this.__messages.push(callback)
  }

  /**
   * 传入消息
   * @param {*} data
   */
  postMessage(data) {
    process.send({
      // 丢给 on message
      type: 'webview-on-message',
      // 传入数据
      data: {
        // 模块名称
        name: this.#name,
        // 传入数据
        value: data
      }
    })
  }

  /**
   *
   * @param {*} html
   */
  loadWebView(html) {
    // 插入脚本
    const data = html.replace('<head>', `<head> ${this.#htmlScript}`)
    process.send({
      type: 'webview-sidebar-load',
      data: data
    })
  }
}
