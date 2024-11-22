import { platform } from 'node:process'
declare global {
  interface Window {
    app: {
      getAppPath: () => Promise<string>
      isTemplateExists: () => Promise<boolean>
      yarnInstall: () => Promise<boolean>
      yarnAdd: (name: string) => Promise<void>
      botRun: () => Promise<void>
      botClose: () => Promise<void>
      botIsRunning: () => Promise<boolean>
      readResourcesFilesAlemonConfigJson: () => Promise<string>
      writeResourcesAlemonConfigJson: (data: string) => Promise<boolean>
      readResourcesTmSrcHelloResTs: () => Promise<string>
      writeResourcesTmSrcHelloResTs: (data: string) => Promise<boolean>
      readResourcesFilesTestMessageJson: () => Promise<string>
      writeResourcesFilesTestMessageJson: (data: string) => Promise<boolean>
      readResourcesFilesGuiConfigJson: () => Promise<string>
      writeResourcesFilesGuiConfigJson: (data: string) => Promise<boolean>
      rmTemplateFiles: () => Promise<void>

      readResourcesFilesEventJson: () => Promise<string>
      writeResourcesFilesEventJson: (data: string) => Promise<boolean>
    }
    controller: {
      minimize: () => Promise<void>
      maximize: () => Promise<void>
      close: () => Promise<void>
      update: () => Promise<void>
    }
    versions: {
      chrome: string
      node: string
      electron: string
      platform: typeof platform
    }
  }
}
