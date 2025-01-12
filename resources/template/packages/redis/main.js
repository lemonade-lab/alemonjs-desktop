import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
// 当前目录
const __dirname = dirname(fileURLToPath(import.meta.url))
// 被激活的时候。
export const activate = context => {
  // 需要支持 webview 消息监听
  context.onCommand('open.redis', () => {
    const dir = join(__dirname, 'index.html')
    const html = readFileSync(dir, 'utf-8')
    context.sidebar.webView.loadWebView(html)
  })
}
