export type WindowApp = {
  /***
   *
   */
  getAppsPath: () => Promise<{
    resourcesPath: string
    templatePath: string
    nodeModulesPath: string
    corePath: string
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
