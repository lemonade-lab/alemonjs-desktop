import { StartIcons } from '@src/common/Icons'
import { useNavigate } from 'react-router-dom'
import BotController from './BotController'
const { RobotIcon } = StartIcons
export default () => {
  const navigate = useNavigate()
  return (
    <main className="flex-1 flex flex-col ">
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="text-xl pl-2">
            欢迎使用
            <br />
            聊天平台开发框架
          </div>
          <button className="px-4 py-1 border border-[#de853c] text-[#de853c] rounded-full flex items-center gap-4">
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
        <section
          className="grid grid-cols-4 gap-2 flex-1 alemonjs-container text-secondary wrap py-2"
          style={{ '--max-row': '2' } as React.CSSProperties}
        >
          {/* 控制面板 */}
          <div className="row-span-2 col-span-1 control-container">
            <BotController />
          </div>
        </section>
      </div>
    </main>
  )
}
