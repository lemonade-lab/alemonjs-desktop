import { useEffect, useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-typescript'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/ext-language_tools'
import Header from './Header'
import { useNavigate } from 'react-router-dom'

/**
 * 无法正常关闭 机器人
 */
export default () => {
  //
  const [status, setStatus] = useState<boolean>(false)
  const [nodeStatus, setNodeStatus] = useState(false)
  //
  const [configText, setConfigText] = useState({
    init: ``,
    value: ``
  })

  //
  useEffect(() => {
    // 询问机器人状态
    window.app.botIsRunning().then(res => {
      console.log('机器人是否在运行：', status, res)
      setStatus(res)
    })
    window.app.isTemplateExists().then(res => {
      console.log('模板是否存在：', status, res)
      setNodeStatus(res)
    })

    window.app.readResourcesFilesAlemonConfigJson().then(res =>
      setConfigText({
        init: res,
        value: res
      })
    )
  }, [])

  /**
   *
   */
  const onClickRun = () => {
    window.app.botRun()
    setTimeout(() => {
      window.app.botIsRunning().then(res => setStatus(res))
    }, 500)
  }

  /**
   *
   * @returns
   */
  const onClickStart = async () => {
    if (nodeStatus) {
      if (!status) onClickRun()
      return
    }
    // 开始加载
    const t = await window.app.yarnInstall()
    if (!t) {
      alert('依赖加载中')
    } else {
      // 定时询问
      alert('未加载依赖,开始加载依赖...')
      const func = () => {
        window.app.isTemplateExists().then(res => {
          if (res) {
            alert('依赖加载完成...')
            setNodeStatus(res)
          } else {
            setTimeout(func, 1000)
          }
        })
      }
      setTimeout(func, 1000)
    }
  }

  const navigate = useNavigate()

  return (
    <section className="h-full flex flex-col">
      <section className="h-full flex flex-col">
        <section className="flex-1 flex flex-col shadow-content rounded-3xl bg-[#ffffff6b]">
          {
            //
          }
          <div className="flex justify-between items-center min-h-10  px-4">
            <div className="flex">
              <div>运行配置</div>
            </div>
            <div className="flex  gap-4 items-center">
              {configText.init != configText.value && (
                <>
                  <button className="border py-1 px-2 rounded-md bg-red-500 hover:bg-red-400">
                    <span
                      className="text-white"
                      onClick={() => {
                        setConfigText(prev => ({
                          init: prev.init,
                          value: prev.init
                        }))
                      }}
                    >
                      放弃
                    </span>
                  </button>
                  <button className="border py-1 px-2 rounded-md bg-blue-500 hover:bg-blue-400">
                    <span
                      className="text-white"
                      onClick={() => {
                        window.app.writeResourcesAlemonConfigJson(configText.value).then(res => {
                          if (res) {
                            setConfigText(prev => ({
                              init: prev.value,
                              value: prev.value
                            }))
                          } else {
                            alert('保存失败')
                          }
                        })
                      }}
                    >
                      保存
                    </span>
                  </button>
                </>
              )}
              <button
                onClick={() => navigate('/config')}
                className="px-2 btn-code border py-1 rounded-md bg-blue-500 hover:bg-blue-400"
              >
                <span>界面</span>
              </button>
            </div>
          </div>
          {
            //
          }
          <div className="flex-1 flex w-full">
            <AceEditor
              mode="typescript"
              // theme="solarized_dark"
              style={{
                backgroundColor: '#ffffff6b',
                width: '100%',
                height: '100%'
              }}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              onChange={newValue => {
                setConfigText(prev => ({
                  ...prev,
                  value: newValue
                }))
              }}
              value={configText.value}
              name="typescript_editor"
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2
              }}
            />
          </div>
          <div className="flex justify-between items-center min-h-6"></div>
        </section>
      </section>
    </section>
  )
}
