import { useNavigate } from 'react-router-dom'
import BotController from './BotController'
import { RobotIcon } from '@src/common/MenuIcons'
export default () => {
  const navigate = useNavigate()
  return (
    <section className="flex-1 flex flex-col px-4 bg-[var(--secondary-bg-front)]">
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="text-xl pl-2">欢迎使用，通用聊天平台开发框架。</div>
          <button
            type="button"
            className="px-4 py-1 border border-[var(--secondary-bg)] text-[var(--secondary-bg)] rounded-full flex items-center gap-4"
          >
            <RobotIcon width="20" height="20" />
            <span
              className="text-sm"
              onClick={() => {
                navigate('/config-code')
              }}
            >
              编辑配置
            </span>
          </button>
        </div>
        <div
          className="flex-1 alemonjs-container text-secondary wrap py-2"
          style={{ '--max-row': '2' } as React.CSSProperties}
        >
          {/* 控制面板 */}
          <div className="row-span-2 col-span-1 control-container">
            <BotController />
          </div>
        </div>
      </div>
    </section>
  )
}
