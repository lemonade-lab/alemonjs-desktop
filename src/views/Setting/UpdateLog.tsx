const data = [
  {
    version: '0.0.16',
    log: ['扩展搜索功能', '修复扩展列表未显示滚动条', 'Apps更改为表格+开关']
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
      '优化扩展稳定主题色',
      '开放扩展主题色同步API',
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
    <div className="animate__animated animate__fadeIn flex-1 flex-col flex justify-center items-center">
      <div className="flex-1 p-1">
        <div className="flex  flex-col flex-1 overflow-auto h-[calc(100vh-2.4rem)] scrollbar gap-6 px-6 py-4 rounded-lg shadow-inner bg-[var(--secondary-bg-front)] ">
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
  )
}

export default UpdateLog
