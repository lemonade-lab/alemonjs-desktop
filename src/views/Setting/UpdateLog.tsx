import classNames from 'classnames'
import { useState } from 'react'

const data = [
  {
    version: '0.0.15',
    log: ['桌面图标尺寸调整']
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
  const [currentVersion, setCurrentVersion] = useState(data[0].version)
  const [logs, setLogs] = useState(data[0].log)
  const handleTabClick = (versionName: string) => {
    const selectedVersion = data.find(item => item.version === versionName)
    if (!selectedVersion) return
    setCurrentVersion(selectedVersion.version)
    setLogs(selectedVersion.log)
  }
  return (
    <div className="animate__animated animate__fadeIn select-none flex-1 flex-col flex justify-center items-center">
      <div className="flex-col gap-1 flex-1 flex justify-center py-2">
        <div className="flex ">
          {data.map((item, index) => (
            <button
              key={item.version}
              onClick={() => handleTabClick(item.version)}
              className={classNames(
                `duration-700 transition-all px-4 py-2 font-medium `,
                {
                  'text-white bg-blue-600': currentVersion === item.version,
                  'text-gray-700 bg-gray-200 hover:bg-gray-300': currentVersion !== item.version
                },
                {
                  'rounded-l-lg': index === 0,
                  'rounded-r-lg': index === data.length - 1,
                  'border-x border-slate-400': index !== data.length - 1 && index !== 0
                }
              )}
            >
              {item.version}
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center flex-1 p-6 rounded-lg shadow-inner bg-[var(--secondary-bg-front)] w-96 max-w-full">
          <ul className="list-disc pl-6 space-y-2 ">
            {logs.map((log, index) => (
              <li key={index} className="text-sm ">
                {log}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UpdateLog
