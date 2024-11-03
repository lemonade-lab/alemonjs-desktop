import { useEffect, useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-typescript'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/ext-language_tools'
import Header from '../Header'

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

  return (
    <section className="bg-white h-full flex flex-col">
      <Header>
        <div className="flex-1  drag-area flex justify-center items-center"></div>
      </Header>

      <section className="flex-1 gap-4 flex flex-col px-2 overflow-y-auto webkit py-2 ">
        <section className="px-2 border rounded-md">
          <div className="m-auto flex gap-4 py-1 items-center">
            <div className=" py-1 px-4 rounded-md">机器状态 : {status ? '已启动' : '未启动'}</div>
            {status ? (
              <button
                className="border py-1 px-2 rounded-md bg-blue-500 hover:bg-blue-400"
                onClick={() => {
                  // 点击关闭
                  window.app.botClose()
                  setStatus(false)
                }}
              >
                <span className="text-white">关闭</span>
              </button>
            ) : (
              <button
                className="border py-1 px-2 rounded-md bg-blue-500 hover:bg-blue-400"
                onClick={onClickStart}
              >
                <span className="text-white">启动</span>
              </button>
            )}
            {!nodeStatus && <div>依赖未加载。。。</div>}
          </div>
        </section>
        <div className="flex-1 flex gap-2">
          <section className="flex-1 flex flex-col ">
            <div className="flex justify-between items-center min-h-10 bg-slate-300 px-4 rounded-t-md">
              <div>alemon.config.json</div>
              <div className="">
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
              </div>
            </div>
            <div className="flex-1 flex w-full">
              <AceEditor
                mode="json"
                theme="solarized_dark"
                fontSize={14}
                width="100%"
                height="100%"
                lineHeight={24}
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
                name="json_editor"
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
          </section>
        </div>
      </section>
    </section>
  )
}
