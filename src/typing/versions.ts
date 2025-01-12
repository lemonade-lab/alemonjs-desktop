import { platform } from 'node:process'
export type WindowVersions = {
  chrome: string
  node: string
  electron: string
  platform: typeof platform
}
