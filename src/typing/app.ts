export type WindowApp = {
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
