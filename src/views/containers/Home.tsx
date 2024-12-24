import { StartIcons } from '@src/pages/start/common/Icons'
import { formatThousand, formatTime } from '@src/utils'
import {
  VisitChart,
  OccupancyRate,
  GlobalSearch,
  DialogStatistics,
  RunningTime
} from '../components/VisitChart'
import { useNavigate } from 'react-router-dom'
import ControlText from './ControlText'
const { RobotIcon } = StartIcons

export default () => {
  // 开发之旅 跳转到 code 源码
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
                navigate('/code')
              }}
            >
              快速继续机器人开发之旅
            </span>
          </button>
        </div>

        <section
          className="grid grid-cols-4 gap-2 flex-1 alemonjs-container text-secondary wrap py-2"
          style={{ '--max-row': '2' } as React.CSSProperties}
        >
          {/* 控制面板 */}
          <div className="row-span-2 col-span-1 control-container">
            <ControlText />
          </div>

          {/* 访问人数 */}
          <div className="col-span-1 box-card">
            <h3 className="card-title">访问人数</h3>
            <div className="flex justify-between items-center flex-1 gap-8">
              <div className="flex flex-col gap-3">
                <span className="text-2xl font-bold">{formatThousand(8530)}</span>
                <span className="text-xs opacity-70">
                  截止至{formatTime(new Date(), 'MM/DD')}访问人数
                </span>
              </div>

              <VisitChart className="ml-auto" data={[]} />
            </div>
          </div>

          {/* 占用率 */}
          <div className="col-span-1 box-card">
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
          <div className="col-span-1 box-card"></div>

          {/* 对话统计 */}
          <div className="col-span-2 box-card">
            <h3 className="card-title">对话统计</h3>
            <DialogStatistics className="flex-1" data={[]} />
          </div>

          {/* 运行时间 */}
          <div className="col-span-1 box-card">
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
