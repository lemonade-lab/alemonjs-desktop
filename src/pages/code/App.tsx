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
  const [codeText, setCodeText] = useState({
    init: ``,
    value: ``
  })
  useEffect(() => {
    window.app.readResourcesTmSrcHelloResTs().then(res => setCodeText({ init: res, value: res }))
  }, [])
  return (
    <section className="h-full flex flex-col">
      {/* <Header>
        <div className="flex-1 drag-area flex justify-center items-center"></div>
      </Header> */}

      <section className="flex-1 flex flex-col overflow-y-auto webkit ">
        <div className="flex-1 flex">
          <section className="flex-1 flex flex-col ">
            <div className="flex justify-between items-center min-h-10 bg-slate-800 bg-opacity-80 text-white px-4">
              <div>{['src', 'apps', 'hello', 'res.ts'].join(' > ')}</div>
              <div className="">
                {codeText.init != codeText.value && (
                  <>
                    <button className="border py-1 px-2 rounded-md bg-red-500 hover:bg-red-400">
                      <span
                        className="text-white"
                        onClick={() => {
                          setCodeText(prev => ({
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
                          window.app.writeResourcesTmSrcHelloResTs(codeText.value).then(res => {
                            if (res) {
                              setCodeText(prev => ({
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
                mode="typescript"
                theme="solarized_dark"
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                width="100%"
                height="100%"
                onChange={newValue => {
                  setCodeText(prev => ({
                    ...prev,
                    value: newValue
                  }))
                }}
                value={codeText.value}
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

            <div className="flex justify-between items-center min-h-3 bg-slate-800 bg-opacity-80 text-white px-4 rounded-b-md"></div>
          </section>
        </div>
      </section>
    </section>
  )
}
