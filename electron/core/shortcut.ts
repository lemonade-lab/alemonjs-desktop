import { globalShortcut, webContents } from 'electron'

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
        contents.send(ShortcutMap[key])
      })
    })
  }
}
