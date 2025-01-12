import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
// 当前目录
const __dirname = dirname(fileURLToPath(import.meta.url))
// 被激活的时候。
export const activate = context => {
  // 创建一个 webview。
  const webView = context.createSidebarWebView(context)

  // 监听 webview 的消息。
  webView.onMessage(data => {
    console.log(data)
  })

  // 当命令被触发的时候。
  context.onCommand('open.redis', () => {
    const dir = join(__dirname, 'assets', 'index.html')
    const scriptReg = /<script.*?src="(.+?)".*?>/
    const styleReg = /<link.*?href="(.+?)".*?>/
    // 创建 webview 路径
    const styleUri = context.createExtensionDir(join(__dirname, 'assets', 'index.css'))
    const scriptUri = context.createExtensionDir(join(__dirname, 'assets', 'index.js'))
    // 确保路径存在
    const html = readFileSync(dir, 'utf-8')
      .replace(scriptReg, `<script type="module" crossorigin src="${scriptUri}"></script>`)
      .replace(styleReg, `<link rel="stylesheet" crossorigin href="${styleUri}">`)
    // 立即渲染 webview
    webView.loadWebView(html)
  })
}
