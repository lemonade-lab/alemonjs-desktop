import _ from 'lodash'
import { useEffect, useState } from 'react'
import { RootState } from '@src/store'
import { useSelector } from 'react-redux'
import { useTerminal } from '@src/hook/terminal'
const RenderResize = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const [windowSize, setWindowSize] = useState(Date.now())
  useEffect(() => {
    const handleResize = _.debounce(() => {
      setWindowSize(Date.now())
    }, 300) // 300ms 防抖

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return <div {...props} key={`render-${windowSize}`} />
}

function Terminal() {
  const log = useSelector((state: RootState) => state.log)
  const [terminalRef, terminalInstance] = useTerminal()
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
  return (
    <section className=" flex flex-col  bg-[var(--alemonjs-secondary-bg)] ">
      <div className="duration-3000 animate__animated animate__fadeIn flex-1 flex flex-col overflow-x-auto overflow-y-hidden max-w-screen">
        <div ref={terminalRef} className="flex p-4 flex-col bg-[#002b36] h-[calc(100vh-1.6rem)]" />
      </div>
    </section>
  )
}

/**
 * @description 机器人控制器
 */
export default function BotLog() {
  return (
    <RenderResize className="flex-1">
      <Terminal />
    </RenderResize>
  )
}
