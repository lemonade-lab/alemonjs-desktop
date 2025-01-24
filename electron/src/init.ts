import { cpSync, rmSync } from 'fs'
import { templatePath, userDataTemplatePath } from './static'
export const initTemplate = async () => {
  // 确保目录被清空
  rmSync(userDataTemplatePath, { recursive: true, force: true })
  // 复制模板文件
  cpSync(templatePath, userDataTemplatePath, { recursive: true })
}
