import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useBotController } from '@src/hook/useBotController'
import { RootState } from '@src/store'
import { useDispatch, useSelector } from 'react-redux'
import { useTerminal } from '@src/hook/useTerminal'
import { delMessate } from '@src/store/log'
import { useNotification } from '@src/context/Notification'
import { Button } from '@src/component/Button'
import { NavDiv } from '@src/component/NavDiv'
import { Select } from '@src/component/Select'
import { ChevronDown } from '@src/component/Icons'
import { Tooltip } from '@src/component/Tooltip'
import { SecondaryDiv } from '@src/component/SecondaryDiv'

function Terminal() {
  // const navigate = useNavigate()
  const { onClickStart, onClickClose, bot, state, platforms } = useBotController()
  const log = useSelector((state: RootState) => state.log)
  const modules = useSelector((state: RootState) => state.modules)
  const dispatch = useDispatch()
  const [platform, setPlatform] = state
  const [terminalRef, terminalInstance] = useTerminal()
  const notification = useNotification()

  useEffect(() => {
    for (let i = 0; i < log.message.length - 1; i++) {
      terminalInstance.current?.write(log.message[i])
    }
  }, [])

  useEffect(() => {
    if (log.rolu == 'del') return
    const value = log.message[log.message.length - 1]
    if (value) {
      terminalInstance.current?.write(value)
    }
  }, [log.message])

  const deleteLines = (numLines: number) => {
    if (!terminalInstance.current) return
    for (let i = 0; i < numLines; i++) {
      // 向上移动一行
      terminalInstance.current.write('\x1b[1A') // 向上移动一行
      // 清除当前行
      terminalInstance.current.write('\x1b[2K') // 清除当前行
    }
  }

  // 删除日志
  const onClickDeleteLog = (size = 10) => {
    if (log.message.length > 0) {
      const count = log.message.length > size || size == 99 ? size : log.message.length
      dispatch(delMessate(count))
      deleteLines(count)
    } else {
      notification('没有日志可删除', 'warning')
    }
  }

  return (
    <div className="flex-1 flex flex-col shadow-md">
      <NavDiv className="z-50  flex flex-col border-b ">
        <div className="flex gap-4  justify-between items-center px-2 py-1">
          <div className=" flex gap-2 items-center ">
            <div>
              <Select
                defaultValue={platform.name}
                className="rounded-md"
                onChange={e => {
                  setPlatform({
                    name: e.target.value,
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
          </div>

          <div className="flex gap-4 ">
            <div>Terminal</div>
            {[10, 20, 50, 99].map((item, index) => (
              <div
                key={index}
                className=" cursor-pointer"
                onClick={() => {
                  onClickDeleteLog(item)
                }}
              >
                -{item}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Tooltip text="新建记录台">
              <div
                onClick={() => {
                  window.page.openWindowTerminal()
                }}
              >
                <ChevronDown width={16} height={16} />
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
          </div>
        </div>
      </NavDiv>
      <SecondaryDiv className="flex-1 flex p-2  overflow-x-auto overflow-y-hidden">
        <div ref={terminalRef} className="flex-1  h-[calc(100vh-5rem)] w-[calc(100vw-5rem)]" />
      </SecondaryDiv>
    </div>
  )
}

/**
 * @description 机器人控制器
 */
export default Terminal
