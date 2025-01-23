import { globalShortcut, webContents } from 'electron'

/**
 * 当使用快捷键的时候
 * 向所有渲染进程发送消息
 * @description 快捷键映射
 */

interface ShortcutMap {
  [key: string]: () => void
}

// 自定义快捷键
const ShortcutMap: ShortcutMap = {
  // 快捷键 ： 事件名称
  F12: () => {
    const allWebContents = webContents.getAllWebContents()
    // 向所有的 webContents 发送消息
    allWebContents.forEach(contents => {
      // 如果 webContents 已经销毁，则不发送消息
      if (contents.isDestroyed()) return
      // 如果已经打开开发者工具，则关闭
      if (contents.isDevToolsOpened()) {
        contents.closeDevTools()
        return
      }
      // 打开开发者工具
      contents.openDevTools()
      return
    })
  }
}

//
export const createShortcut = () => {
  // 注册快捷键
  for (const key in ShortcutMap) {
    globalShortcut.register(key, ShortcutMap[key])
  }
}
