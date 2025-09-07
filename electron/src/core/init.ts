import { cpSync, rmSync } from 'fs'
import { templatePath, userDataTemplatePath } from '../data/static'
export const initTemplate = () => {
  // 确保目录被清空
  rmSync(userDataTemplatePath, { recursive: true, force: true })
  // 复制模板文件
  cpSync(templatePath, userDataTemplatePath, { recursive: true })
}
import { userDataPackagePath } from '../data/static'
import { readFileSync, writeFileSync } from 'node:fs'
let pkgData: any = null
export const initNodeModules = () => {
  if (pkgData) return
  const pkg = readFileSync(userDataPackagePath, 'utf-8')
  const data = JSON.parse(pkg)
  pkgData = data
  let T = false
  if (!pkgData?.dependencies) {
    pkgData.dependencies = {}
  }
  if (!pkgData?.devDependencies) {
    pkgData.devDependencies = {}
  }
  // 检查是否存在 @alemonjs/process
  if (!pkgData.dependencies['@alemonjs/process'] && !pkgData.devDependencies['@alemonjs/process']) {
    pkgData.dependencies['@alemonjs/process'] = 'latest'
    T = true
  }
  // 检查是否存在 alemonjs
  if (!pkgData.dependencies['alemonjs'] && !pkgData.devDependencies['alemonjs']) {
    pkgData.dependencies['alemonjs'] = 'latest'
    T = true
  }
  // 检查是否存在 private
  if (!pkgData.private) {
    pkgData.private = true
    T = true
  }
  // 检查是否存在 workspaces
  if (!pkgData.workspaces || !Array.isArray(pkgData.workspaces)) {
    pkgData.workspaces = ['packages/*']
    T = true
  }
  // 检查是否存在 packages/*
  if (pkgData.workspaces.indexOf('packages/*') === -1) {
    pkgData.workspaces.push('packages/*')
    T = true
  }
  // 检查是否存在 plugins/*
  if (pkgData.workspaces.indexOf('plugins/*') === -1) {
    pkgData.workspaces.push('plugins/*')
    T = true
  }
  // 检查是否存在 extensions/*
  if (pkgData.workspaces.indexOf('extensions/*') === -1) {
    pkgData.workspaces.push('extensions/*')
    T = true
  }
  if (T) {
    const nowData = JSON.stringify(pkgData, null, 2)
    writeFileSync(userDataPackagePath, nowData, 'utf-8')
    console.log('initNodeModules')
  }
}
