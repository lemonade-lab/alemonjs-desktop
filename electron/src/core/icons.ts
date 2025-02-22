import { nativeImage } from 'electron'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * #description 从路径创建图标
 */
export const createLogoImageFromPath = () => {
  if (process.platform === 'win32') {
    return nativeImage.createFromPath(join(__dirname, '../../../icons/icon.ico'))
  } else {
    return nativeImage.createFromPath(join(__dirname, '../../../icons/16x16.png'))
  }
}
