import { useBotController } from '@src/hook/bot'
import useGoNavigate from '@src/hook/navigate'
/**
 * @description 机器人控制器
 */
export default (function BotController() {
  const navigate = useGoNavigate()
  const {
    // 事件
    onClickStart,
    onClickClose,
    onClickYarnInstall,
    // 状态
    bot,
    modules,
    state,
    platforms
  } = useBotController()
  const [platform, setPlatform] = state
  return (
    <section className=" bg-[var(--alemonjs-secondary-bg)] w-[17rem] rounded-xl shadow-content p-2 ">
      <div className="flex gap-4 items-center ">
        <div className="flex-1 flex gap-2 items-center rounded-md">
          <div>
            <select
              defaultValue={platform.name}
              onChange={e =>
                setPlatform({
                  name: e.target.value,
                  value: platforms.find(item => item.name === e.target.value)?.value || ''
                })
              }
              className="bg-transparent"
            >
              {platforms.map((item, index) => (
                <option key={index}>{item.name}</option>
              ))}
            </select>
          </div>
          <div>{bot.runStatus ? '已启动' : '未启动'}</div>
        </div>
        <div className="">
          {modules.nodeModulesStatus ? (
            bot.runStatus ? (
              <button
                type="button"
                className="border px-2 rounded-md  duration-700 transition-all  hover:bg-blue-200"
                onClick={onClickClose}
              >
                <span>关闭</span>
              </button>
            ) : (
              <button
                type="button"
                className="border px-2 rounded-md  duration-700 transition-all  hover:bg-blue-200"
                onClick={() => {
                  onClickStart()
                  // 跳转到控制台
                  navigate('/bot-log')
                }}
              >
                <span>启动</span>
              </button>
            )
          ) : (
            <button
              type="button"
              className="border px-2 rounded-md  duration-700 transition-all  hover:bg-blue-200"
              onClick={onClickYarnInstall}
            >
              <span>加载</span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
})
