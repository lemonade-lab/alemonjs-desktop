import { ipcMain } from 'electron'
import { resourcesPath } from 'process'
import { corePath, templatePath } from '../../core/static'
import { existsSync, readdirSync, rmdirSync, statSync, unlinkSync } from 'fs'
import { join } from 'path'

// 得到资源目录
ipcMain.handle('get-app-path', () => {
  return resourcesPath
})

// 询问 模版依赖状况
ipcMain.handle('get-template-exists', () => {
  return existsSync(corePath)
})

/**
 *
 * @param path
 * @returns
 */
const rmTemplateFile = (path: string[]) => {
  const dir = join(templatePath, ...path)
  return unlinkSync(dir)
}

/**
 *
 * @param path
 */
const rmTemplateDir = (path: string[]) => {
  // 深度便利得到该文件夹的所有子文件。删除
  const dirPath = join(templatePath, path.join('/'))
  const files = readdirSync(dirPath)
  files.forEach(file => {
    const filePath = join(dirPath, file)
    const stats = statSync(filePath)
    if (stats.isDirectory()) {
      // 若是文件夹，则继续深度便利
      rmTemplateDir([...path, file])
    } else {
      // 若是文件，则删除
      rmTemplateFile([...path, file])
    }
  })
  // 删除该文件夹
  rmdirSync(dirPath)
}

// 删除所有图片
ipcMain.handle('rm-template-files-dir', () => {
  return rmTemplateDir(['public', 'file'])
})
