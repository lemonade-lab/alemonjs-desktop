import { platform } from 'node:process'
declare global {
  interface Window {
    app: {
      getAppPath: () => Promise<string>
      botConfigRead: () => Promise<string>
      botConfigWrite: (data: string) => Promise<boolean>
    }
    bot: {
      run: (args: string) => Promise<void>
      close: () => Promise<void>
      status: () => Promise<boolean>
      onStdout: (callback: (message: string) => void) => void
      onStatus: (callback: (status: number) => void) => void
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
