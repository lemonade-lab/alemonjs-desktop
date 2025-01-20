const data = [
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
      '扩展自动加载主题',
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
        <div className="flex flex-col flex-1  p-6 rounded-lg shadow-inner bg-[var(--alemonjs-primary-bg)]  max-w-full">
          <div className="text-2xl flex items-center justify-between font-semibold mb-4 border-b">
            <div>更新记录</div>
          </div>
          <div className="flex flex-col gap-4 h-[calc(100vh-11rem)] overflow-y-auto scrollba">
            <div className="flex  flex-col flex-1 overflow-auto h-[calc(100vh-2.4rem)] scrollbar gap-6 py-4 rounded-lg  bg-[var(--alemonjs-primary-bg)] ">
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
        </div>
      </div>
    </div>
  )
}

export default UpdateLog
