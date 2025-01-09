import { platform } from 'node:process'
declare global {
  interface Window {
    app: {
      getAppPath: () => Promise<string>
      botRun: (args: string) => Promise<void>
      botClose: () => Promise<void>
      botStatus: () => Promise<boolean>
      onBotStdout: (callback: (message: string) => void) => void
      onBotStatus: (callback: (status: number) => void) => void
      botConfigRead: () => Promise<string>
      botConfigWrite: (data: string) => Promise<boolean>
    }
    yarn: {
      install: () => Promise<boolean>
      add: (name: string) => Promise<void>
      onInstallStatus: (callback: (value: number) => void) => void
      onAddStatus: (callback: (value: number) => void) => void
      status: (name: 'yarnInstall' | 'yarnAdd') => Promise<boolean>
    }
    controller: {
      minimize: () => Promise<void>
      maximize: () => Promise<void>
      close: () => Promise<void>
      update: () => Promise<void>
      cssVariables: () => Promise<void>
      onCSSVariables: (callback: (value: string) => void) => void
    }
    versions: {
      chrome: string
      node: string
      electron: string
      platform: typeof platform
    }
  }
}
