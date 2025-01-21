export type WindowYarn = {
  /**
   *  状态
   * @param name
   * @returns
   */
  status: (name: 'yarnInstall' | 'yarnAdd' | 'yarnLink') => Promise<boolean>
  /**
   * 加载
   * @returns
   */
  install: () => Promise<boolean>
  /**
   *  监听
   * @param callback
   * @returns
   */
  onInstallStatus: (callback: (value: number) => void) => void
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
  onAddStatus: (callback: (value: number) => void) => void
  /**
   * 关联
   */
  link: (name: string) => Promise<void>
  /**
   *  监听
   * @param callback
   * @returns
   */
  onLinkStatus: (callback: (value: number) => void) => void
  /**
   *
   * @param name
   * @returns
   */
  unLink: (name: string) => Promise<void>
  /**
   *  监听
   * @param callback
   * @returns
   */
  onUnLinkStatus: (callback: (value: number) => void) => void
}
