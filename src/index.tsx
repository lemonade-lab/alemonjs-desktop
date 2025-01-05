import { platform } from 'node:process'
declare global {
  interface Window {
    app: {
      getAppPath: () => Promise<string>
      isTemplateExists: () => Promise<boolean>
      /**
       * yarn
       * @returns
       */
      yarnInstall: () => Promise<boolean>
      yarnAdd: (name: string) => Promise<void>
      /**
       * bot
       * @returns
       */
      botRun: () => Promise<void>
      botClose: () => Promise<void>
      botIsRunning: () => Promise<boolean>
      botConfigRead: () => Promise<string>
      botConfigWrite: (data: string) => Promise<boolean>
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
