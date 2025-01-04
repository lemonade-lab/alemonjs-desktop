import { StartIcons } from '@src/common/Icons'
import { VisitChart, OccupancyRate, DialogStatistics, RunningTime } from '../components/VisitChart'
import { useNavigate } from 'react-router-dom'
import BotController from './BotController'
import dayjs from 'dayjs'
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
                navigate('/config')
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
          {/* 访问人数 */}
          <div className="col-span-1  bg-[#ffffff6b] rounded-xl shadow-content p-2">
            <h3 className="card-title">访问人数</h3>
            <div className="flex justify-between items-center flex-1 gap-8">
              <div className="flex flex-col gap-3">
                <span className="text-2xl font-bold">
                  {((num: number) => num.toLocaleString())(8530)}
                </span>
                <span className="text-xs opacity-70">
                  截止至
                  {dayjs().format('YYYY-MM-DD')}
                  访问人数
                </span>
              </div>
              <VisitChart className="ml-auto" data={[]} />
            </div>
          </div>
          {/* 占用率 */}
          <div className="col-span-1  bg-[#ffffff6b] rounded-xl shadow-content p-2">
            <h3 className="card-title">占用率</h3>
            <div className="flex justify-between items-center flex-1 gap-8 px-4">
              <div className="flex flex-col gap-3">
                <span className="text-2xl font-bold">
                  86<sup className="text-sm ml-2">%</sup>
                </span>
                <span className="text-xs opacity-70">某某占用率</span>
              </div>
              <OccupancyRate className="ml-auto w-[168px]" data={[]} />
            </div>
          </div>
          {/* 其他 */}
          <div className="col-span-1  bg-[#ffffff6b] rounded-xl shadow-content p-2"></div>
          {/* 对话统计 */}
          <div className="col-span-2  bg-[#ffffff6b] rounded-xl shadow-content p-2">
            <h3 className="card-title">对话统计</h3>
            <DialogStatistics className="flex-1" data={[]} />
          </div>
          {/* 运行时间 */}
          <div className="col-span-1  bg-[#ffffff6b] rounded-xl shadow-content p-2">
            <h3 className="card-title">运行时间</h3>
            <div className="flex justify-between items-center flex-1 gap-8 px-4">
              <div className="flex flex-col gap-3">
                <span className="text-2xl font-bold">
                  2.7 <sup className="text-xs ml-2">h</sup>
                </span>
                <span className="text-xs opacity-70">平均运行时间</span>
              </div>
              <RunningTime className="ml-auto" data={[]} />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
