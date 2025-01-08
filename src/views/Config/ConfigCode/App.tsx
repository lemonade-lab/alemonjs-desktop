import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-typescript'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/ext-language_tools'
export default function ConfigCode() {
  const navigate = useNavigate()
  const [configText, setConfigText] = useState({
    initValue: ``,
    inputValue: ``
  })

  useEffect(() => {
    window.app.botConfigRead().then(data => {
      // console.log('data', data)
      setConfigText({
        initValue: data,
        inputValue: data
      })
    })
  }, [])

  return (
    <section className="h-full flex flex-col">
      <section className="h-full flex flex-col">
        <section className="flex-1 flex flex-col shadow-content rounded-xl bg-[#ffffff6b]">
          {
            //
          }
          <div className="flex justify-between items-center min-h-10  px-4">
            <div className="flex">
              <div>运行配置</div>
            </div>
            <div className="flex  gap-4 items-center">
              {configText.initValue != configText.inputValue && (
                <>
                  <button className="border py-1 px-2 rounded-md bg-red-500 hover:bg-red-400">
                    <span
                      className="text-white"
                      onClick={() => {
                        setConfigText(prev => ({
                          initValue: prev.initValue,
                          inputValue: prev.initValue
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
                        //
                      }}
                    >
                      保存
                    </span>
                  </button>
                </>
              )}
              {/* <button onClick={() => navigate('/config')}>
                <span>界面</span>
              </button> */}
            </div>
          </div>
          {
            //
          }
          <div className="flex-1 flex w-full">
            <AceEditor
              mode="typescript"
              style={{
                backgroundColor: '#ffffff6b',
                width: '100%',
                height: '100%'
              }}
              onChange={newValue => {
                setConfigText(prev => ({
                  ...prev,
                  value: newValue
                }))
              }}
              value={configText.inputValue}
              name="typescript_editor"
            />
          </div>
          <div className="flex justify-between items-center min-h-6"></div>
        </section>
      </section>
    </section>
  )
}
