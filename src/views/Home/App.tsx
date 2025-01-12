import BotController from './BotController'
import { RobotIcon } from '@src/common/MenuIcons'
import OccupancyRate from '@src/common/OccupancyRate'
import useGoNavigate from '@src/hook/navigate'
export default () => {
  const navigate = useGoNavigate()
  return (
    <section className="flex-1 flex flex-col px-4 py-2">
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="text-xl pl-2">欢迎使用，AlemonJS 机器人。</div>
          <button
            type="button"
            className="px-4 py-1 border border-[var(--secondary-bg)] text-[var(--secondary-bg)] rounded-full flex items-center gap-4"
          >
            <RobotIcon width="20" height="20" />
            <span
              className="text-sm"
              onClick={() => {
                navigate('/config-edit')
              }}
            >
              扩展
            </span>
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 py-2">
          <BotController />
          <section className="w-40 flex flex-col gap-2 bg-[var(--primary-bg-front)] rounded-xl shadow-content p-2 ">
            <div>系统占用</div>
            <OccupancyRate data={[100, 20, 20]} />
          </section>
        </div>
      </div>
    </section>
  )
}
