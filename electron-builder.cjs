/**
 * @see https://www.electron.build/configuration/configuration
 */
/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: 'com.alemonjs.desktop',
  productName: 'AlemonJS',
  asar: true,
  electronDownload: {
    mirror: 'https://npmmirror.com/mirrors/electron/'
  },
  directories: {
    output: 'release'
  },
  files: ['dist-electron', 'dist', 'icons'],
  mac: {
    icon: './icons/icon.icns',
    target: [
      {
        target: 'dmg',
        arch: ['x64', 'arm64']
      }
    ],
    artifactName: '${productName}-${version}-${arch}.${ext}'
  },
  linux: {
    icon: './icons/512x512.png',

    target: [
      {
        target: 'AppImage',
        arch: ['x64', 'arm64']
      },
      {
        target: 'deb',
        arch: ['x64', 'arm64']
      }
    ],
    category: 'Utility',
    artifactName: '${productName}-${version}-${arch}.${ext}'
  },
  win: {
    icon: './icons/icon.ico',
    target: [
      {
        target: 'nsis',
        arch: ['x64', 'arm64']
      },
      {
        target: '7z',
        arch: ['x64', 'arm64']
      }
    ],
    artifactName: '${productName}-${version}-${arch}.${ext}'
  },
  nsis: {
    oneClick: false, // 是否一键安装
    perMachine: false, // 是否单机安装
    allowToChangeInstallationDirectory: true, // 是否允许用户更改安装目录
    deleteAppDataOnUninstall: false, // 是否删除安装后的数据
    allowElevation: true, // 是否允许提升权限
    runAfterFinish: true, // 安装完成后是否运行
    installerIcon: './icons/icon.ico', // 安装图标
    uninstallerIcon: './icons/icon.ico', // 卸载图标
    installerHeader: './icons/icon.ico', // 安装的头部(右边的图标)
    installerHeaderIcon: './icons/icon.ico', // 安装时头部图标
    installerSidebar: './assets/installerSidebar.bmp', // 安装包安装侧边图片，要求164 × 314 像素
    uninstallerSidebar: './assets/installerSidebar.bmp', // 安装包卸载侧边图片，要求164 × 314 像素
    createDesktopShortcut: true, // 是否创建桌面图标
    createStartMenuShortcut: true, // 是否创建开始菜单图标
    shortcutName: '${productName}', // 图标名称
    // displayLanguageSelector: true, //是否允许选择安装包语言
    // installerLanguages: ['zh_CN', 'en_US'], //安装包语言
    installerLanguages: ['zh_CN'], //安装包语言只要中文
    // https://learn.microsoft.com/zh-cn/openspecs/windows_protocols/ms-lcid/a9eac961-e77d-41a6-90a5-ce1a8b0cdb9c?redirectedfrom=MSDN
    language: 0x0804 //设置安装包 属性 详细信息 语言 为 中文简体
    // license: './LICENSE.txt', // 许可证 需要gb2312格式
    // include: './alemon.nsh'
  },
  publish: {
    provider: 'generic',
    url: 'https://alemonjs.com/desktop/release'
  },
  extraResources: [
    {
      from: 'resources/files',
      to: 'files',
      filter: ['*']
    },
    {
      from: 'resources/template',
      to: 'template',
      filter: ['*', '!node_modules', '!.yarn{,/**/*}']
    },
    {
      from: 'resources/template/src',
      to: 'template/src',
      filter: ['*']
    },
    {
      from: 'resources/template/src/apps/hello',
      to: 'template/src/apps/hello',
      filter: ['*']
    },
    {
      from: 'resources/template/bin',
      to: 'template/bin',
      filter: ['*']
    }
  ]
}
