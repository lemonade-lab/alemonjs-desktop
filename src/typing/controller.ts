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
  updateVersion: () => Promise<void>
  /**
   *
   * @param callback
   * @returns
   */
  onDownloadProgress: (callback: (val: any) => void) => void
  /**
   *
   */
  onNotification: (callback: (val: any) => void) => void
  /**
   *
   * @param callback
   * @returns
   */
  onModal: (callback: (val: any) => void) => void
  /**
   *
   * @param id
   * @returns
   */
  onClick: (code: number, data: any) => Promise<boolean>
}
