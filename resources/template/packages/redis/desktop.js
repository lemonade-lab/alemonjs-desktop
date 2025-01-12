import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import YAML from 'yaml'
// 当前目录
const __dirname = dirname(fileURLToPath(import.meta.url))
// 被激活的时候。
export const activate = context => {
  // 创建一个 webview。
  const webView = context.createSidebarWebView(context)

  // 监听 webview 的消息。
  webView.onMessage(data => {
    try {
      const value = data

      if (value.type == 'redis.from.save') {
        const redis = value.data
        const configDir = join(process.cwd(), 'alemon.config.yaml')
        const config = YAML.parse(readFileSync(configDir, 'utf-8')) ?? {}
        config.redis = {
          host: redis.host ?? '127.0.0.1',
          port: redis.port ?? 6379,
          password: redis.password ?? '',
          db: redis.db ?? 0
        }
        // vase
        const yaml = YAML.stringify(config)
        // 写入文件
        writeFileSync(configDir, yaml, 'utf-8')
        context.notification('保存成功～')
      } else if (value.type == 'redis.init') {
        const configDir = join(process.cwd(), 'alemon.config.yaml')
        const config = YAML.parse(readFileSync(configDir, 'utf-8')) ?? {}
        const redis = config.redis

        // 发送消息
        webView.postMessage({
          type: 'redis.init',
          data: redis
        })

        //
      }
    } catch (e) {
      console.error(e)
    }
  })

  // 当命令被触发的时候。
  context.onCommand('open.redis', () => {
    const dir = join(__dirname, 'dist', 'index.html')
    const scriptReg = /<script.*?src="(.+?)".*?>/
    const styleReg = /<link.*?href="(.+?)".*?>/
    // 创建 webview 路径
    const styleUri = context.createExtensionDir(join(__dirname, 'dist', 'assets', 'index.css'))
    const scriptUri = context.createExtensionDir(join(__dirname, 'dist', 'assets', 'index.js'))
    // 确保路径存在
    const html = readFileSync(dir, 'utf-8')
      .replace(scriptReg, `<script type="module" crossorigin src="${scriptUri}"></script>`)
      .replace(styleReg, `<link rel="stylesheet" crossorigin href="${styleUri}">`)
    // 立即渲染 webview
    webView.loadWebView(html)
  })
}
