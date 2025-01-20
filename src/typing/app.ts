export type WindowApp = {
  /***
   *
   */
  getAppsPath: () => Promise<{
    [key: string]: string
    userDataTemplatePath: string
    userDataNodeModulesPath: string
    userDataPackagePath: string
    preloadPath: string
    logMainPath: string
  }>
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
  downloadFiles: (dir: string) => Promise<void>
}
