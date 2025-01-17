import { BrowserWindow, MessageBoxReturnValue, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import Store from 'electron-store'
import { debounce } from 'lodash'
import { promisify } from 'util'
import logger from 'electron-log'

/**
 * @description 检查更新脚本
 */

const sleep = promisify(setTimeout)

const store = new Store()

// 状态变量，用于跟踪是否正在下载
let isDownloading = false

/**
 * 用户确定是否下载更新
 */
export function downloadUpdate() {
  autoUpdater.downloadUpdate()
}

const showMessage = debounce((mainWindow: BrowserWindow, message: string) => {
  if (!mainWindow) return
  if (mainWindow.isDestroyed()) return
  mainWindow.webContents.send('on-notification', message)
  // 增加模态 - 当前禁止切换其他窗口
  // dialog.showMessageBox(mainWindow, {
  //   message: message
  // })
}, 1000)

/**
 * 退出并安装更新
 */
export function installUpdate() {
  autoUpdater.quitAndInstall()
}

/**
 * 自动更新的逻辑
 * @param mainWindow
 */
export async function autoUpdateApp(mainWindow: BrowserWindow, t = false) {
  if (!mainWindow) return
  if (mainWindow.isDestroyed()) return

  // 等待 60 秒再检查更新，确保窗口准备完成，用户进入系统
  if (!t) await sleep(1000 * 60)

  if (isDownloading) {
    showMessage(mainWindow, '正在后台下载中')
    return
  }

  // 每次启动自动更新检查更新版本
  autoUpdater.checkForUpdates()

  //
  autoUpdater.logger = logger
  autoUpdater.disableWebInstaller = false

  // 这个写成 false，写成 true 时，可能会报没权限更新
  autoUpdater.autoDownload = false // 自动下载

  // 当有可用更新的时候触发。 更新将自动下载。
  autoUpdater.on('update-available', info => {
    // 这里做的是检测到更新，直接就下载
    autoUpdater.downloadUpdate()

    // 设置状态为正在下载
    isDownloading = true

    // 检查到可用更新，交由用户提示是否下载
    // mainWindow.webContents.send('update-available', info);
    if (t) showMessage(mainWindow, '开始下载。。。')
  })

  // 下载更新包的进度，可以用于显示下载进度与前端交互等
  autoUpdater.on('download-progress', async progress => {
    // 计算下载百分比
    const downloadPercent = Math.round(progress.percent * 100) / 100
    // 实时同步下载进度到渲染进程，以便于渲染进程显示下载进度
    mainWindow.webContents.send('on-download-progress', downloadPercent)
  })

  // 当没有可用更新的时候触发，其实就是啥也不用做
  autoUpdater.on('update-not-available', () => {
    if (t) showMessage(mainWindow, '没有可用更新')
  })

  autoUpdater.on('error', error => {
    if (t) showMessage(mainWindow, '检查更新失败')
    logger.error('检查更新失败', error)
    isDownloading = false // 发生错误，重置状态
  })

  // 在更新下载完成的时候触发。
  autoUpdater.on('update-downloaded', info => {
    // 下载完成之后，弹出对话框提示用户是否立即安装更新
    logger.log('下载完成', info)
    // mainWindow.webContents.send('update-downloaded', info);

    // 下载完成，重置状态
    isDownloading = false

    // 只记录该版本被跳过
    const version = info.version
    const KEY = `skippedVersion-${version}`

    const skippedVersion = store.get(KEY)

    // 如果当前下载的版本就是设置的跳过的版本，那么就不提示用户安装

    if (!t && version == skippedVersion) return

    // dialog 想要使用，必须在 BrowserWindow 创建之后
    dialog
      .showMessageBox(mainWindow, {
        type: 'info',
        buttons: ['取消', '跳过版本', '更新'],
        title: '升级提示',
        message: '已为您下载最新应用!',
        detail: '点击“更新”马上替换为最新版本，点击“跳过版本”不再接收当前版本更新。'
      })
      .then((returnVal: MessageBoxReturnValue) => {
        const { response } = returnVal
        if (response === 2) {
          // 安装的时候如果设置过 skkipVersion, 需要清除掉
          store.delete(KEY)
          // 走默认的自动更新逻辑
          autoUpdater.quitAndInstall()
        } else if (response === 1) {
          // 如果用户选择跳过版本，我们储存这个版本号到 electron-store
          store.set(KEY, info.version)
        } else {
          // 取消
        }
      })

    // dialog end
  })
}
