import { RobotIcon } from '@src/ui/MenuIcons'
import useGoNavigate from '@src/hook/useGoNavigate'
import BotController from './BotController'
import { BarDiv } from '@src/ui/BarDiv'
export default () => {
  const navigate = useGoNavigate()
  return (
    <section className="animate__animated animate__fadeIn flex-1 flex flex-col px-4 py-2">
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="text-xl pl-2">欢迎使用，AlemonJS 机器人。</div>
          <BarDiv
            onClick={() => {
              navigate('/application')
            }}
            className="px-4 py-1 border cursor-pointer  rounded-full flex items-center gap-4"
          >
            <RobotIcon width="20" height="20" />
            <span className="text-sm">扩展</span>
          </BarDiv>
        </div>
        <div className="flex flex-wrap items-center gap-2 py-2">
          <BotController />
        </div>
      </div>
    </section>
  )
}
