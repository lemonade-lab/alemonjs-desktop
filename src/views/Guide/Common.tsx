import { useEffect, useState } from 'react'
import Joyride from 'react-joyride'
// 引导
const KEY = 'FIRST_GUIDE_COMMON'
// 条件
const KEY_DATA = '1'
// 定义引导步骤
const steps = [
  {
    target: '.steps-common-1',
    content: '想每次都自动”启动扩展器”吗？可点击此处开关，同时也会自动完成“加载依赖”',
    disableBeacon: true
  },
  {
    target: '.steps-common-2',
    content: '如果你想加载个性化机器人，或把桌面安装到指定目录，可“以指定目录打开”',
    disableBeacon: true
  }
]
export default function GuideCommon() {
  const [run, setRun] = useState(false)
  // 引导回调函数
  const handleJoyrideCallback = (data: { action: string; index: number; type: string }) => {
    console.log('Joyride:', data)
    if (data.action == 'skip' && data.type == 'tour:end') {
      console.log('跳过')
      localStorage.setItem(KEY, KEY_DATA)
    }
  }
  useEffect(() => {
    const guide = localStorage.getItem(KEY)
    if (!guide || (guide && guide != KEY_DATA)) {
      setRun(true)
    }
  }, [])
  return (
    <Joyride
      steps={steps} // 引导步骤
      run={run} // 是否运行引导
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
