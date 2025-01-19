import { RobotIcon } from '@src/common/MenuIcons'
import useGoNavigate from '@src/hook/navigate'
import BotController from './BotController'
export default () => {
  const navigate = useGoNavigate()
  return (
    <section className="animate__animated animate__fadeIn flex-1 flex flex-col px-4 py-2">
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="text-xl pl-2">欢迎使用，AlemonJS 机器人。</div>
          <button
            type="button"
            onClick={() => {
              navigate('/application')
            }}
            className="px-4 py-1 border border-[var(--alemonjs-menu-bg)] text-[var(--alemonjs-menu-text)] rounded-full flex items-center gap-4"
          >
            <RobotIcon width="20" height="20" />
            <span className="text-sm">扩展</span>
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 py-2">
          <BotController />
        </div>
      </div>
    </section>
  )
}
