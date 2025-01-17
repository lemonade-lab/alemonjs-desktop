export type WindowController = {
  /**
   *  最小化
   * @returns
   */
  minimize: () => Promise<void>
  /**
   *  最大化
   * @returns
   */
  maximize: () => Promise<void>
  /**
   *  关闭
   * @returns
   */
  close: () => Promise<void>
  /**
   *  更新
   * @returns
   */
  update: () => Promise<void>
  /**
   *
   * @param callback
   * @returns
   */
  onDownloadProgress: (callback: (val: any) => void) => void
  /**
   *
   * @param enable
   * @returns
   */
  setAutoLaunch: (enable: boolean) => Promise<boolean>
  /**
   *
   */
  autoLaunchStutas: () => Promise<boolean>
  /**
   *
   */
  onNotification: (callback: (val: any) => void) => void
}
