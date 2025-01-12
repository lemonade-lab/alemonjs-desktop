import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
// 当前目录
const __dirname = dirname(fileURLToPath(import.meta.url))
// 被激活的时候。
export const activate = context => {
  // 需要支持 webview 消息监听
  context.onCommand('open.redis', () => {
    const dir = join(__dirname, 'assets', 'index.html')
    const scriptReg = /<script.*?src="(.+?)".*?>/g
    const styleReg = /<link.*?href="(.+?)".*?>/g
    // 创建 webview 路径
    const styleUri = context.createExtensionDir(join(__dirname, 'assets', 'index.css'))
    const scriptUri = context.createExtensionDir(join(__dirname, 'assets', 'index.js'))
    const html = readFileSync(dir, 'utf-8')
      // .replace('<head>', `<head> <script> window.alemonjs = getAlemonAPI(); </script>`)
      .replace(scriptReg, `<script type="module" crossorigin src="${scriptUri}"></script>`)
      .replace(styleReg, `<link rel="stylesheet" crossorigin href="${styleUri}">`)
    console.log('html', html)
    context.sidebar.webView.loadWebView(html)
  })
}
