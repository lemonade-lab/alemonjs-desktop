import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { getConfig, getConfigValue } from 'alemonjs'
import { Context } from './context-pro'
// 当前目录
const __dirname = dirname(fileURLToPath(import.meta.url))
// 被激活的时候。
export const activate = (context: typeof Context.prototype) => {
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
      if (data.type === 'desktop.form.save') {
        const desktop = data.data
        const config = getConfig()
        const value = config.value ?? {}
        value.apps = desktop.apps.split('.')
        config.saveValue(value)
        context.notification('desktop 配置保存成功～')
      } else if (data.type === 'desktop.init') {
        let config = getConfigValue()
        if (!config) config = {}
        // 发送消息
        webView.postMessage({
          type: 'desktop.init',
          data: {
            apps: config.apps ?? {}
          }
        })
      }
    } catch (e) {
      console.error(e)
    }
  })
}
