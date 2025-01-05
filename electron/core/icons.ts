import { join } from 'path'
import { nativeImage } from 'electron'
/**
 * #description 从路径创建图标
 */
export const createLogoImageFromPath = () => {
  if (process.platform === 'win32') {
    return nativeImage.createFromPath(join(__dirname, '../../icons/icon.ico'))
  } else {
    return nativeImage.createFromPath(join(__dirname, '../../icons/16x16.png'))
  }
}
