import { RobotStart, RobotStop } from '@src/ui/Icons'
import { useState } from 'react'
export default () => {
  const [isStarted, setIsStarted] = useState(false)
  return (
    <div
      className={`robot-tool flex items-center gap-2 ${isStarted ? 'robot-tool-active' : ''}`}
      onClick={() => setIsStarted(!isStarted)}
    >
      {isStarted ? <RobotStop width="18" height="18" /> : <RobotStart width="18" height="18" />}
      <span className="robot-tool-text">机器人{isStarted ? '已启动' : '待启动'}</span>
      <div className="robot-tool-switch ml-2"></div>
    </div>
  )
}
