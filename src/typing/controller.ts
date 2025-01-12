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
   * 加载css变量
   * @returns
   */
  cssVariables: () => Promise<void>
  /**
   * 监听css变量
   * @param callback
   * @returns
   */
  onCSSVariables: (callback: (value: string) => void) => void
}
