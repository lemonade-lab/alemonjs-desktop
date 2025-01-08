import { useBotController } from '@src/hook/bot'
import { useNavigate } from 'react-router-dom'
/**
 * @description 机器人控制器
 */
export default function BotController() {
  // 路由跳转
  const navigate = useNavigate()
  const { onClickStart, onClickClose, onClickYarnInstall, bot, state, platforms } =
    useBotController()
  const [platform, setPlatform] = state
  return (
    <section className="bg-[#ffffff6b] rounded-xl shadow-content p-2 ">
      <div className="flex gap-4 py-1 items-center ">
        <div className="flex-1 flex gap-2 items-center rounded-md">
          <div>
            <select
              defaultValue={platform}
              onChange={e => setPlatform(e.target.value as any)}
              className="bg-transparent"
            >
              {platforms.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
          </div>
          <div>{bot.runStatus ? '已启动' : '未启动'}</div>
        </div>
        <div className="">
          {bot.nodeModulesStatus ? (
            bot.runStatus ? (
              <button className="border px-2 rounded-md  hover:bg-blue-200" onClick={onClickClose}>
                <span>关闭</span>
              </button>
            ) : (
              <button
                className="border px-2 rounded-md  hover:bg-blue-200"
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
              className="border px-2 rounded-md  hover:bg-blue-200"
              onClick={onClickYarnInstall}
            >
              <span>加载</span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
