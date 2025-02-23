import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
//
import useGoNavigate from '@/hook/useGoNavigate'
//
import { setBotStatus } from '@/store/bot'
import { setCommand } from '@/store/command'
import { setModulesStatus } from '@/store/modules'
import { initPackage, setExpansionsStatus } from '@/store/expansions'
import { RootState } from '@/store'
import { setPath } from '@/store/app'
import { postMessage } from '@/store/log'
//
import { usePop } from '@/context/Pop'
import { useNotification } from '@/context/Notification'
//
import { PrimaryDiv } from '@alemonjs/react-ui'
//
import Menu from '@/views/Menu'
import WordBox from '@/views/WordBox'
import GuideMain from '@/views/Guide/Main'
//
import Header from '@/common/Header'

export default (function App() {
  const navigate = useGoNavigate()
  const dispatch = useDispatch()
  const notification = useNotification()
  const modules = useSelector((state: RootState) => state.modules)
  const expansions = useSelector((state: RootState) => state.expansions)
  const { setPopValue, closePop } = usePop()
  const modulesRef = useRef(modules)

  const [step, setStep] = useState(-1)

  // watch
  useEffect(() => {
    // 加载css变量
    window.theme.variables()
    // 监听 css 变量
    window.theme.on(cssVariables => {
      try {
        Object.keys(cssVariables).forEach(key => {
          document.documentElement.style.setProperty(`--${key}`, cssVariables[key])
        })
      } catch (e) {
        console.error(e)
      }
    })

    // 加载主题
    window.theme.mode().then(res => {
      if (res === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    })

    // 获取配置
    window.app.getConfig(['APP_PATH', 'AUTO_INSTALL', 'AUTO_RUN_EXTENSION']).then(res => {
      const paths = res[0]
      dispatch(setPath(paths))
      if (res[1] | res[2]) {
        setStep(2)
        // 自定加载依赖
        window.yarn.cmds({
          type: 'install',
          value: ['install', '--ignore-warnings']
        })
      } else {
        setStep(1)
      }
    })

    // 监听依赖安装状态 0 失败 1 成功
    window.yarn.on(data => {
      const value = data.value
      if (data.type == 'install') {
        if (value == 0) {
          notification('依赖初始化失败', 'error')
        }
        dispatch(
          setModulesStatus({
            nodeModulesStatus: value == 0 ? false : true
          })
        )
      }
    })

    // 监听 bot 状态
    window.bot.onStatus((value: number) => {
      dispatch(
        setBotStatus({
          runStatus: value == 0 ? false : true
        })
      )
    })

    // 监听 通知消息
    window.controller.onNotification((value: any) => {
      notification(value)
    })

    // 监听 expansions消息
    window.expansions.onMessage(data => {
      try {
        if (/^action:/.test(data.type)) {
          const actions = data.type.split(':')
          const db = data.data
          if (actions[1] === 'application' && actions[2] === 'sidebar' && actions[3] === 'load') {
            navigate('/application', {
              state: {
                view: db
              }
            })
          } else if (actions[1] === 'expansions') {
            navigate('/expansions')
          } else if (actions[1] === 'bot-log') {
            navigate('/bot-log')
          }
        } else if (data.type === 'notification') {
          const db = data.data
          notification(db.value, db.typing)
          return
        } else if (data.type === 'command') {
          dispatch(setCommand(data.data))
          return
        } else if (data.type === 'get-expansions') {
          const db = data.data
          console.log('get-expansions', db)
          dispatch(initPackage(db))
        }
      } catch {
        console.error('HomeApp 解析消息失败')
      }
    })

    // 监听 expansions状态
    window.expansions.onStatus((value: number) => {
      if (value == 0) {
        notification('扩展器已停止', 'warning')
      } else {
        notification('扩展器已启动')
      }
      dispatch(
        setExpansionsStatus({
          runStatus: value == 0 ? false : true
        })
      )
    })

    // 监听 log
    window.terminal.on((message: string) => {
      dispatch(postMessage(message))
    })

    // 监听  modal
    window.controller.onModal((data: any) => {
      if (data.open) {
        setPopValue({
          open: true,
          title: data.title,
          description: data.description,
          buttonText: data.buttonText,
          data: data.data,
          code: data.code
        })
        return
      } else {
        closePop()
      }
    })
  }, [])

  useEffect(() => {
    modulesRef.current = modules

    // 依赖安装完成后，启动扩展器
    if (modules.nodeModulesStatus) {
      notification('依赖加载完成')

      // 已经启动了
      if (expansions.runStatus) {
        return
      }

      // 得到配置，判断是否自动启动
      window.app.getConfig('AUTO_RUN_EXTENSION').then(T => {
        if (!T) {
          return
        }
        // 启动扩展器
        window.expansions.run([])
      })
    }
  }, [modules.nodeModulesStatus])

  useEffect(() => {
    if (expansions.runStatus) {
      // 获取扩展器列表
      window.expansions.postMessage({ type: 'get-expansions' })
    }
  }, [expansions.runStatus])

  // 监听 command
  const command = useSelector((state: RootState) => state.command)
  useEffect(() => {
    if (command.name) {
      window.expansions.postMessage({ type: 'command', data: command.name })
    }
  }, [command.name])

  return (
    <>
      <div className=" flex flex-col flex-1 h-screen relative ">
        <Header>
          <WordBox />
        </Header>
        <PrimaryDiv className="steps-0 flex flex-1 z-40">
          <Menu />
          <div className="flex flex-1">
            <Outlet />
          </div>
        </PrimaryDiv>
      </div>
      <GuideMain stepIndex={step} />
    </>
  )
})
