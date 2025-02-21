import { Menu, Tray, app, shell } from 'electron'
import { createLogoImageFromPath } from './icons'
import { ALEMONJS_BASE_URL } from '../data/conifg'

/**
 * 创建托盘
 * @returns
 */
export const createTray = () => {
  // 实例化一个托盘对象，传入的是托盘的图标
  const tray = new Tray(createLogoImageFromPath())
  // 移动到托盘上的提示
  tray.setToolTip('AlemonJS')
  // 设置 title
  // tray.setTitle('AlemonJS')
  // 监听托盘右键事件
  tray.on('right-click', () => {
    // 通过 Menu 创建菜单
    const menuConfig = Menu.buildFromTemplate([
      {
        label: '文档',
        click: () => {
          shell.openExternal(ALEMONJS_BASE_URL)
        }
      },
      {
        label: '关闭',
        click: () => {
          // 关闭
          app.exit()
        }
      }
    ])
    // 让我们的写的托盘右键的菜单替代原来的
    tray.popUpContextMenu(menuConfig)
  })
  return tray
}
