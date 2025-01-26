import { protocol, net, session } from 'electron'
import { existsSync } from 'fs'
import url from 'url'
export function onBeforeRequest(): void {
  // 注册 "onBeforeRequest" 事件的处理程序
  // session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
  //   const url = details.url
  //   if (url.startsWith('resource://-')) {
  //     const localPath = url.replace('resource://-', '')
  //     console.error('localPath', localPath)
  //     // 检查文件是否存在
  //     if (existsSync(localPath)) {
  //       callback({
  //         redirectURL: `file://${localPath}`
  //       })
  //       return
  //     }
  //   }
  //   // 继续原始请求
  //   callback({})
  // })
  // protocol.registerFileProtocol('resource', (request, callback) => {
  //   const url = request.url.replace('resource://', '') // 去掉协议部分
  //   const filePath = join(url) // 映射到本地路径
  //   callback({ path: filePath })
  // })
  protocol.handle('resource', request => {
    // if (process.platform === 'win32') {
    //   const filePath = decodeURIComponent(
    //     request.url.slice('resource://'.length).replace(/^-\//, '')
    //   )
    //   console.error('filePath', filePath)
    //   return net.fetch(url.pathToFileURL(filePath).toString())
    // }
    const filePath = decodeURIComponent(request.url.replace('resource://-/', ''))
    console.error('filePath', filePath)
    return net.fetch(url.pathToFileURL(filePath).toString())
  })
}
