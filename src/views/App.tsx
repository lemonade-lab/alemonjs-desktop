import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '@src/context/Notification'
import useGoNavigate from '@src/hook/useGoNavigate'
import { setBotStatus } from '@src/store/bot'
import { setCommand } from '@src/store/command'
import Header from '@src/common/Header'
import Menu from '@src/views/Menu'
import WordBox from './WordBox'
import { setModulesStatus } from '@src/store/modules'
import { initPackage, setExpansionsStatus } from '@src/store/expansions'
import { RootState } from '@src/store'
import { setPath } from '@src/store/app'
import { postMessage } from '@src/store/log'
import { PrimaryDiv } from '@src/component/PrimaryDiv'
import { usePop } from '@src/context/Pop'

export default (function App() {
  const navigate = useGoNavigate()
  const dispatch = useDispatch()
  const { notification } = useNotification()
  const modules = useSelector((state: RootState) => state.modules)
  const expansions = useSelector((state: RootState) => state.expansions)
  const { setPopValue, closePop } = usePop()

  const modulesRef = useRef(modules)

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

    window.app.getConfig(['APP_PATH', 'AUTO_INSTALL', 'AUTO_RUN_EXTENSION']).then(res => {
      const paths = res[0]
      dispatch(setPath(paths))
      if (res[1] | res[2]) {
        window.yarn.cmds({
          type: 'install',
          value: ['install', '--ignore-warnings']
        })
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

    // 监听expansions消息
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

    // 监听expansions状态
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

    // 监听log
    window.terminal.on((message: string) => {
      dispatch(postMessage(message))
    })

    // 坚挺modal
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
      // 得到配置，判断是否自动启动
      window.app.getConfig('AUTO_RUN_EXTENSION').then(T => {
        if (T) {
          // 启动扩展器
          window.expansions.run([])
        }
      })
    }
  }, [modules.nodeModulesStatus])

  useEffect(() => {
    if (expansions.runStatus) {
      // 获取扩展器列表
      window.expansions.postMessage({ type: 'get-expansions' })
    }
  }, [expansions.runStatus])

  return (
    <div className="flex flex-col flex-1 h-screen relative ">
      <Header>
        <WordBox />
      </Header>
      <PrimaryDiv className="flex flex-1 z-40">
        <Menu />
        <div className="flex flex-1">
          <Outlet />
        </div>
      </PrimaryDiv>
    </div>
  )
})
