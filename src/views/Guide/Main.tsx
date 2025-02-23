import { useEffect, useState } from 'react'
import Joyride from 'react-joyride'

// 引导
const KEY = 'FIRST_GUIDE'
// 条件
const KEY_DATA = '2'

// 定义引导步骤
const steps = [
  {
    target: '.steps-1',
    content:
      '这是“加载依赖”按钮。依赖是机器人运行所需要的软件包。可不进行加载，但会无法使用和“机器人”相关的功能',
    disableBeacon: true
  },
  {
    target: '.steps-2',
    content:
      '这是“扩展器运行和暂停”按钮。仅有在依赖完成后可运行的按钮，运行后，可使用“扩展市场”和“应用列表”。'
  },
  {
    target: '.steps-3',
    content: '这是“指令输入框”，可以快速执行桌面或扩展器设计的快捷功能'
  },
  {
    target: '.steps-4',
    content: '这是“主页”按钮，当没有安装依赖时，可回到“主页”进行操作'
  },
  {
    target: '.steps-5',
    content: '这里“菜单栏-控制台”，需要“加载依赖”。可以查看机器人的运行日志，操作机器人的启动和停止'
  },
  {
    target: '.steps-6',
    content: '这里“菜单栏-扩展市场”，需要“加载依赖”。可以查看和安装扩展器'
  },
  {
    target: '.steps-7',
    content:
      '这里“菜单栏-应用列表”，需要“加载依赖”。可以查看和操作应用，修改不同应用的配置，是最核心的设计之一'
  },
  {
    target: '.steps-8',
    content: '设置可以让你对应用进行个性化调整，如主题、自启、管理仓库和依赖等...'
  }
]

export default function GuideMain({ stepIndex }: { stepIndex: number }) {
  const [step, setSetp] = useState(-1)

  // 引导回调函数
  const handleJoyrideCallback = (data: { action: string; index: number; type: string }) => {
    console.log('Joyride:', data)
    if (data.action == 'skip' && data.type == 'tour:end') {
      console.log('跳过')
      localStorage.setItem(KEY, KEY_DATA)
    }
  }
  useEffect(() => {
    if (stepIndex == -1) {
      return
    }
    const guide = localStorage.getItem(KEY)
    if (!guide || (guide && guide != KEY_DATA)) {
      setSetp(stepIndex)
    }
  }, [stepIndex])
  return (
    <Joyride
      steps={step == -1 ? [] : steps.slice(step - 1, steps.length)} // 引导步骤
      run={step == -1 ? false : true} // 是否运行引导
      callback={handleJoyrideCallback} // 回调函数
      continuous={true} // 是否连续显示步骤（显示“Next”按钮）
      showProgress={false} // 显示进度条
      showSkipButton={true} // 显示跳过按钮
      locale={{
        skip: '不再显示'
      }}
      styles={{
        options: {
          zIndex: 1000 // 设置 z-index
        }
      }}
    />
  )
}
