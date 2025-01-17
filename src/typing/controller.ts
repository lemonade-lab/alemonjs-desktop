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
   */
  setAutoLaunch: (enable: boolean) => Promise<boolean>
  /**
   *
   */
  autoLaunchStutas: () => Promise<boolean>
}
