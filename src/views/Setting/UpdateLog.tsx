import { PrimaryDiv } from '@alemonjs/react-ui'

const data = [
  {
    version: '0.3.1',
    log: ['增加pkg检查', '内置机器人默认最新版']
  },
  {
    version: '0.3.0',
    log: ['初步完成Git仓库管理']
  },
  {
    version: '0.2.10',
    log: ['修复CodeEdit编辑异常', '支持以任意子扩展目录打开', '修复未内置依赖环境']
  },
  {
    version: '0.2.9',
    log: ['修复command机制']
  },
  {
    version: '0.2.8',
    log: ['资源镜像更改为npmmirror', '优化快捷键提示', '升级内置机器人版本', '支持编辑模板文件']
  },
  {
    version: '0.2.7',
    log: [
      '优化通知栏，避免频繁的和重复的通知',
      '统一所有图标风格',
      '支持扩展配置图标',
      '修复侧边栏未同步command'
    ]
  },
  {
    version: '0.2.6',
    log: ['新增“新人引导”机制', '修复控制台闪烁']
  },
  {
    version: '0.2.5',
    log: ['个性目录无需装包管理', '支持依赖自启', '支持扩展自启']
  },
  {
    version: '0.2.4',
    log: ['支持选择仓库管理目录', '修复yarn add命令错误']
  },
  {
    version: '0.2.3',
    log: ['优化更新弹窗', '修复路径地址错误', '调整桌面操作风格']
  },
  {
    version: '0.2.2',
    log: ['优化弹窗机制', '默认目前不提示初始化确认']
  },
  {
    version: '0.2.1',
    log: ['修复选择目录后，pkg判断错误问题', '非机器人目录初始化提示']
  },
  {
    version: '0.2.0',
    log: [
      '由自动加载依赖更改为引导加载',
      '允许在未加载依赖时访问设置',
      '支持以指定目录来打开桌面',
      '删除小组件设计页',
      '为部分图标增加气泡提示框',
      '优化通知栏频率',
      '优化图标样式'
    ]
  },
  {
    version: '0.1.4',
    log: ['修复windows扩展加载失败']
  },
  {
    version: '0.1.3',
    log: ['修复安装扩展时,未自动加载扩展', '修复警告通知栏样式丢失']
  },
  {
    version: '0.1.2',
    log: ['支持切换扩展版本', '支持加载扩展图标']
  },
  {
    version: '0.1.1',
    log: ['支持调节switch样式', '支持webview主题和黑白模式', '优化webview通讯']
  },
  {
    version: '0.1.0',
    log: [
      '重置扩展与机器人',
      '独立控制台',
      '主窗口仅隐藏而不关闭',
      '打开开发者工具',
      '补全主题变量和黑白模式',
      '开放主题组件'
    ]
  },
  {
    version: '0.0.21',
    log: ['优化npm包管理机制', '开放包管理器', '@alemonjs/process >= 0.0.2']
  },
  {
    version: '0.0.20',
    log: ['修复检查更新']
  },
  {
    version: '0.0.19',
    log: ['修复进程通讯', '优化主题配置文件', '支持主题恢复默认', '持久化机器人', '修复资源协议']
  },
  {
    version: '0.0.18',
    log: [
      '主题调色板',
      '进程文件下载',
      'lock文件下载',
      '设置页UI调整',
      '快捷键说明',
      '.npmrc配置编辑',
      'command指令优化',
      'command位置调整'
    ]
  },
  {
    version: '0.0.17',
    log: [
      '修复所有平台的错误配置',
      '修复应用开关失效',
      '修复控制台记录缺失',
      '支持控制台记录清除',
      '修复macos中，关闭窗口无法恢复扩展'
    ]
  },
  {
    version: '0.0.16',
    log: [
      '扩展搜索功能',
      '修复扩展列表未显示滚动条',
      'Apps更改为表格+开关',
      '支持command框',
      '通知栏队列显示',
      '修改更新扩展版本号不同步',
      '修复无法查看远程扩展文档'
    ]
  },
  {
    version: '0.0.15',
    log: [
      '桌面图标尺寸调整',
      '优化控制打印效果',
      '优化扩展检索机制',
      '内置可用机器人',
      '应用加载需要手动配置',
      '开机自启开关',
      '修复侧边栏激活框未生效',
      '禁止选择界面文本',
      '调整扩展API调用方式'
    ]
  },
  {
    version: '0.0.14',
    log: [
      '增加版本更新记录页',
      '优化化进程通讯',
      '优化交互效果',
      '扩展器启动控制按钮',
      '支持加载git仓库',
      '修复刷新窗口时,机器人和扩展器状态丢失',
      '增加警告信息通知、错误信息通知',
      '增加按钮确认模态框'
    ]
  },
  {
    version: '0.0.13',
    log: [
      '修复 windows 使用 webview时的路径错误。',
      '修复 windows 窗体栏 无法拖动问题。',
      '修复 启动时 未显示窗口。',
      '优化扩展列表。新增扩展刷新按钮。',
      '内置初始化资源，避免打开时超长加载。',
      '优先显示菜单栏，同时增加超长加载提示。',
      '修复添加扩展平台时，被误认为是应用包。',
      '增加检查更新按钮。'
    ]
  },
  {
    version: '0.0.12',
    log: [
      '桌面版本全新预览。',
      '新启动/关闭设计',
      '新UI调整',
      '支持查看控制台记录',
      '支持开发者自定义界面',
      '支持安装扩展'
    ]
  }
]

const UpdateLog = () => {
  return (
    <div className="animate__animated animate__fadeIn flex-1 flex-col flex">
      <div className="flex-col gap-2 flex-1 flex p-6 ">
        <PrimaryDiv className="flex flex-col flex-1  p-6 rounded-lg shadow-inner  max-w-full">
          <div
            className="text-2xl flex items-center justify-between font-semibold mb-4 border-b
            border-secondary-border
           dark:border-dark-secondary-border
          "
          >
            <div>更新记录</div>
          </div>
          <div className="flex flex-col gap-4 h-[calc(100vh-11rem)] overflow-auto scrollba">
            <div className="flex  flex-col flex-1 overflow-auto h-[calc(100vh-2.4rem)] scrollbar gap-6 py-4 rounded-lg  ">
              {data.map((item, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-semibold mb-4">{item.version}</h2>
                  <ul className="list-disc pl-6 space-y-2 ">
                    {item.log.map((log, index) => (
                      <li key={index} className="text-sm ">
                        {log}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </PrimaryDiv>
      </div>
    </div>
  )
}

export default UpdateLog
