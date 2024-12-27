import { useState } from 'react'
import { RobotStartIcon, RobotStopIcon } from '@src/views/common/Icons'

export default () => {
  const [isStarted, setIsStarted] = useState(false)

  /* 启动: robot-tool-active */
  return (
    <div
      className={`robot-tool flex items-center gap-2 ${isStarted ? 'robot-tool-active' : ''}`}
      onClick={() => setIsStarted(!isStarted)}
    >
      {isStarted ? (
        <RobotStopIcon width="18" height="18" />
      ) : (
        <RobotStartIcon width="18" height="18" />
      )}

      <span className="robot-tool-text">机器人{isStarted ? '已启动' : '待启动'}</span>

      <div className="robot-tool-switch ml-2"></div>
    </div>
  )
}
