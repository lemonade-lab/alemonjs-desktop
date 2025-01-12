export type WindowExpansions = {
  /**
   * 运行
   * @param args
   * @returns
   */
  run: (args: string) => Promise<void>
  /**
   * 关闭
   * @returns
   */
  close: () => Promise<void>
  /**
   *  状态
   * @returns
   */
  status: () => Promise<boolean>
  /**
   *  监听
   * @param callback
   * @returns
   */
  onStdout: (callback: (message: string) => void) => void
  /**
   *  监听
   * @param callback
   * @returns
   */
  onStatus: (callback: (status: number) => void) => void
  /**
   *
   */
  onMessage: (callback: (value: string) => void) => void
  /**
   *
   */
  postMessage: (value: string) => Promise<string>
}
