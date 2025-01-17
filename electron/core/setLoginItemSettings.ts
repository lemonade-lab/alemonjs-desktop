import { app } from 'electron'

// 设置开机自启
export function setAutoLaunch(enable: boolean) {
  app.setLoginItemSettings({
    openAtLogin: enable, // 是否开机自启
    path: app.getPath('exe') // 应用程序的可执行路径
  })
}

// 检查是否已设置开机自启
export function isAutoLaunchEnabled(): boolean {
  const settings = app.getLoginItemSettings()
  return settings.openAtLogin // 返回是否已开启开机自启
}
