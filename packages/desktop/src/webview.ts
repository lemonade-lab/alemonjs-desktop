import { processSend } from './send'

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

  __messages: Function[] = []

  constructor(name) {
    this.#name = name
  }

  /**
   *
   * @param {*} callback
   */
  onMessage(callback: Function) {
    this.__messages.push(callback)
  }

  /**
   * 传入消息
   * @param {*} data
   */
  postMessage(data: any) {
    processSend({
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
  loadWebView(html: string) {
    // 插入脚本
    const data = html.replace('<head>', `<head> ${this.#htmlScript}`)
    processSend({
      type: 'webview-sidebar-load',
      data: data
    })
  }
}
