export class Actions {
  // 一组行为，使用:分开
  #event = ''

  #name: string | null = null

  constructor(name: string) {
    this.#name = name
  }

  create() {
    // 创建 行为
    this.#event = 'action'
  }

  // 点击命令输入框
  onClickCommandInput() {
    // 点击命令输入框
    this.#event = `${this.#event}:click-CommandInput`
  }

  // 点击logo
  onClickLogo() {
    // 点击logo
    this.#event = `${this.#event}:click-Logo`
  }

  // 点击组件
  onClickComponent() {
    this.#event = `${this.#event}:click-Component`
  }

  // 点击扩展
  onClickExtension() {
    this.#event = `${this.#event}:click-Extension`
    return {
      loadWebView: (html: string) => {
        // const view = new webView('extension')
        // view.loadWebView(html)
        // return view
        console.log('loadWebView', html)
      }
    }
  }

  // 点击扩展商场
  onClickExtensionShoping() {
    this.#event = `${this.#event}:click-ExtensionShoping`
  }

  // 点击设置
  onClickSetting() {
    this.#event = `${this.#event}:click-Setting`
  }
}
