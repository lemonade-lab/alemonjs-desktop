export type WindowApp = {
  /**
   * 资料目录
   * @returns
   */
  getAppPath: () => Promise<string>
  /***
   *
   */
  getAppsPath: () => Promise<{
    resourcesPath: string
    templatePath: string
    nodeModulesPath: string
    corePath: string
  }>
  /**
   *
   */
  readFiles: (dir: string) => Promise<string>
}
