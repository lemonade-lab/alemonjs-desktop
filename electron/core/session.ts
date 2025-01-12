import { protocol, net } from 'electron'
import { resourcesPath } from '../core/static'
import { join } from 'path'
import url from 'url'

/**
 * @param {*} baseUrl
 */
export function onBeforeRequest(baseUrl: string): void {
  // 注册 "onBeforeRequest" 事件的处理程序
  // session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
  //   const url = details.url
  //   console.error('details.url ', url)
  //   if (url.startsWith('resource://-')) {
  //     const localPath = url.replace('resource://-', '')
  //     const resPATH = join(resourcesPath, localPath)
  //     console.error('localPath ', localPath)
  //     console.error('resPATH ', resPATH)
  //     // 检查文件是否存在
  //     if (existsSync(resPATH)) {
  //       callback({
  //         redirectURL: `file://${resPATH}`
  //       })
  //       return
  //     }
  //   }
  //   // 继续原始请求
  //   callback({})
  //   return
  // })
  protocol.handle('resource', request => {
    const filePath = request.url.slice('resource://'.length)
    const dir = join(resourcesPath, filePath)
    return net.fetch(url.pathToFileURL(dir).toString())
  })
}
