import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { getConfigValue, getConfig } from 'alemonjs'

// 当前目录
const __dirname = dirname(fileURLToPath(import.meta.url))
// 被激活的时候。
const activate = context => {
  // 创建一个 webview。
  const webView = context.createSidebarWebView(context)
  // 当命令被触发的时候。
  context.onCommand('open.desktop', () => {
    const dir = join(__dirname, '../', 'dist', 'index.html')
    const scriptReg = /<script.*?src="(.+?)".*?>/
    const styleReg = /<link.*?href="(.+?)".*?>/
    // 创建 webview 路径
    const styleUri = context.createExtensionDir(
      join(__dirname, '../', 'dist', 'assets', 'index.css')
    )
    const scriptUri = context.createExtensionDir(
      join(__dirname, '../', 'dist', 'assets', 'index.js')
    )
    // 确保路径存在
    const html = readFileSync(dir, 'utf-8')
      .replace(scriptReg, `<script type="module" crossorigin src="${scriptUri}"></script>`)
      .replace(styleReg, `<link rel="stylesheet" crossorigin href="${styleUri}">`)
    // 立即渲染 webview
    webView.loadWebView(html)
  })
  // 监听 webview 的消息。
  webView.onMessage(data => {
    try {
      if (data.type == 'desktop.get.apps') {
        let config = getConfigValue()
        if (!config) config = {}
        const d = Array.isArray(config.apps) ? config.apps : []
        // 发送消息
        webView.postMessage({
          type: 'desktop.get.apps',
          data: d
        })
      } else if (data.type == 'desktop.open.apps') {
        let config = getConfig()
        const value = config.value
        if (value && Array.isArray(value.apps)) {
          const name = data.data
          if (!value.apps.includes(name)) {
            value.apps.push(name)
            config.saveValue(value)
          }
        }
      } else if (data.type == 'desktop.disable.apps') {
        let config = getConfig()
        const value = config.value
        if (value && Array.isArray(value.apps)) {
          const name = data.data
          value.apps = value.apps.filter(item => item !== name)
          config.saveValue(value)
        }
      }
    } catch (e) {
      console.error(e)
    }
  })
}

export { activate }
