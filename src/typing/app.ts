export type WindowApp = {
  /**
   * 资料目录
   * @returns
   */
  getAppPath: () => Promise<string>
  /**
   * 读取config
   * @returns
   */
  botConfigRead: () => Promise<string>
  /**
   *  写入config
   * @param data
   * @returns
   */
  botConfigWrite: (data: string) => Promise<boolean>
}
