export type WindowYarn = {
  /**
   * 加载
   * @returns
   */
  install: () => Promise<boolean>
  /**
   *  添加
   * @param name
   * @returns
   */
  add: (name: string) => Promise<void>
  /**
   *  监听
   * @param callback
   * @returns
   */
  onInstallStatus: (callback: (value: number) => void) => void
  /**
   *  监听
   * @param callback
   * @returns
   */
  onAddStatus: (callback: (value: number) => void) => void
  /**
   *  状态
   * @param name
   * @returns
   */
  status: (name: 'yarnInstall' | 'yarnAdd') => Promise<boolean>
}
