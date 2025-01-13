import { globalShortcut, webContents } from 'electron'

/**
 * #description 快捷键映射
 */

interface ShortcutMap {
  [key: string]: string
}

// 自定义快捷键
const ShortcutMap: ShortcutMap = {
  'Ctrl+I': 'open-dev-tools',
  'Ctrl+R': 'reload-page'
}

//
export const createShortcut = () => {
  // 注册快捷键
  for (const key in ShortcutMap) {
    globalShortcut.register(key, () => {
      const allWebContents = webContents.getAllWebContents()
      // 向所有的 webContents 发送消息
      allWebContents.forEach(contents => {
        // 如果 webContents 已经销毁，则不发送消息
        if (contents.isDestroyed()) return
        // 发送消息
        contents.send(ShortcutMap[key])
      })
    })
  }
}
