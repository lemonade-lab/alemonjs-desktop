export type WindowExpansions = {
  /**
   *  状态
   * @returns
   */
  status: () => Promise<boolean>
  /**
   * 运行
   * @param args
   * @returns
   */
  run: (args: any) => Promise<void>
  /**
   * 关闭
   * @returns
   */
  close: () => Promise<void>
  /**
   *  监听
   * @param callback
   * @returns
   */
  onStatus: (callback: (status: number) => void) => void
  /**
   *
   */
  onMessage: (callback: (value: any) => void) => void
  /**
   *
   */
  postMessage: (value: any) => Promise<void>
}
