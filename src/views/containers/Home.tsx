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
const { RobotIcon } = StartIcons

export default () => {
  // 开发之旅 跳转到 code 源码
  const navigate = useNavigate()
  return (
    <main className="flex-1 flex flex-col">
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
          className="mt-8 grid grid-cols-4 gap-4 flex-1 alemonjs-container text-secondary wrap"
          style={{ '--max-row': '2' } as React.CSSProperties}
        >
          {/* 更新事迹 */}
          <div className="flex flex-col row-span-2 col-span-1 bg-white rounded-3xl ">
            <div className="flex gap-4 px-6 py-4">
              <div className="p-1 bg-yellow-500 rounded-md text-white">未启动</div>
              <div className="flex text-white">
                <div className="bg-blue-400 p-1 rounded-l-md cursor-pointer">启动</div>
                <div className="bg-blue-400 p-1 cursor-pointer">重启</div>
                <div className="bg-blue-400 p-1 rounded-r-md cursor-pointer">停止</div>
              </div>
            </div>
            <div className="bg-slate-400 flex-1 text-white p-2 rounded-b-3xl">
              <div>{'[JSDEV] 连接成功'}</div>
            </div>
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
