import { StartIcons } from '@src/pages/start/common/Icons'
const { RobotIcon } = StartIcons

export default () => {
  return (
    <main className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="text-xl pl-2">
            欢迎使用
            <br />
            跨时代的聊天平台开发框架
          </div>

          <button className="px-4 py-1 border border-[#de853c] text-[#de853c] rounded-full flex items-center gap-4">
            <RobotIcon width="20" height="20" />
            <span className="text-sm">快速继续机器人开发之旅</span>
          </button>
        </div>

        <div
          className="mt-8 grid grid-cols-4 gap-4 flex-1 alemonjs-container"
          style={{ '--max-row': '2' } as React.CSSProperties}
        >
          <div className="row-span-2 col-span-1 update-story rounded-2xl p-4 box-card">
            <span className="update-story-text relative z-2 font-500 card-title !text-white">
              更新事迹
            </span>
          </div>
          <div className="col-span-1 box-card p-4">
            <div className="card-title">访问人数</div>
          </div>
          <div className="col-span-1 box-card p-4">
            <div className="card-title">占用率</div>
          </div>
          <div className="col-span-1 box-card p-4">
            <div className="card-title">全局搜索</div>
          </div>
          <div className="col-span-2 box-card p-4">
            <div className="card-title">对话统计</div>
          </div>
          <div className="col-span-1 box-card p-4">
            <div className="card-title">运行时间</div>
          </div>
        </div>
      </div>
    </main>
  )
}
