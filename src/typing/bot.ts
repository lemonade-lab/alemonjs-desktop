export type WindowBot = {
  /**
   *  状态
   * @returns
   * 成功返回 true
   */
  status: () => Promise<boolean>
  /**
   *  运行
   * @param args
   * @returns
   */
  run: (args: any) => Promise<void>
  /**
   *  关闭
   * @returns
   * 成功返回 true
   */
  close: () => Promise<void>
  /**
   *  监听
   * @param callback
   * @returns
   */
  onStatus: (callback: (status: number) => void) => void
}
