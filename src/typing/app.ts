export type WindowApp = {
  getConfig: (KEY: string | string[]) => Promise<any>
  setConfig: (KEY: string, value: any) => Promise<boolean>
  /**
   *
   * @param dir
   * @returns
   */
  readFiles: (dir: string) => Promise<string>
  /**
   *
   * @param dir
   * @param data
   * @returns
   */
  writeFiles: (dir: string, data: string) => Promise<string>
  /**
   *
   * @param dir
   * @returns
   */
  exists: (dir: string) => Promise<boolean>
  /**
   *
   * @param dir
   * @returns
   */
  downloadFiles: (dir: string) => Promise<void>
  /**
   *
   */
  resetTemplate: () => Promise<void>

  /**
   *
   * @param url
   * @param options
   * @returns
   */
  fetch: (url: string, options: any) => Promise<any>
  /**
   *
   * @returns
   */
  selectDirectory: () => Promise<string[]>
  /**
   *
   * @param dir
   * @returns
   */
  reStart: (dir: string) => void
}

export type WindowPage = {
  /**
   *
   */
  openWindowTerminal: () => void
  /**
   *
   */
  openWindowMain: () => void
}
