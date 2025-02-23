import _ from 'lodash'
import { useBotController } from '@/hook/useBotController'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { Button } from '@alemonjs/react-ui'
import { Select } from '@alemonjs/react-ui'
import { Tooltip } from '@alemonjs/react-ui'
import { FullscreenOutlined } from '@ant-design/icons'
import BotTerminal from '../../common/BotTerminal'

function Terminal() {
  const { onClickStart, onClickClose, bot, state, platforms } = useBotController()
  const modules = useSelector((state: RootState) => state.modules)
  const [platform, setPlatform] = state
  return (
    <BotTerminal
      headerLeft={
        <>
          <div>
            <Select
              defaultValue={platform.name}
              className="rounded-md"
              onChange={(e: any) => {
                const value = e.target.value
                setPlatform({
                  name: value,
                  value: platforms.find(item => item.name === e.target.value)?.value || ''
                })
              }}
            >
              {platforms.length === 0 && <option>gui</option>}
              {platforms.map((item, index) => (
                <option key={index}>{item.name}</option>
              ))}
            </Select>
          </div>
          <div>{bot.runStatus ? '已启动' : '未启动'}</div>
        </>
      }
      headerRight={
        <>
          <Tooltip text="新建记录台">
            <div
              onClick={() => {
                window.page.openWindowTerminal()
              }}
            >
              <FullscreenOutlined />
            </div>
          </Tooltip>
          {modules.nodeModulesStatus &&
            (bot.runStatus ? (
              <Button
                type="button"
                className="border  px-2 rounded-md  duration-700 transition-all  "
                onClick={onClickClose}
              >
                <span>关闭</span>
              </Button>
            ) : (
              <Button
                type="button"
                className="border  px-2 rounded-md  duration-700 transition-all  "
                onClick={onClickStart}
              >
                <span>启动</span>
              </Button>
            ))}
        </>
      }
    />
  )
}

export default Terminal
