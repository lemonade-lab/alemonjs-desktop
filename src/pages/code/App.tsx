import { useEffect, useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-typescript'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/ext-language_tools'
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
      <section className="flex-1 flex flex-col shadow-content rounded-xl bg-[#ffffff6b]">
        {
          //
        }
        <div className="flex justify-between items-center min-h-10   px-4">
          <div>{['src', 'apps', 'hello', 'res.ts'].join(' > ')}</div>
          <div className="">
            {codeText.init != codeText.value && (
              <>
                <button className="border py-1 px-2 rounded-md bg-red-300 hover:bg-red-400">
                  <span
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
                <button className="border py-1 px-2 rounded-md bg-blue-300 hover:bg-blue-400">
                  <span
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
            style={{
              backgroundColor: '#ffffff6b',
              width: '100%',
              height: '100%'
            }}
            onChange={newValue => {
              setCodeText(prev => ({
                ...prev,
                value: newValue
              }))
            }}
            value={codeText.value}
            name="typescript_editor"
          />
        </div>
        <div className="flex justify-between items-center min-h-6"></div>
      </section>
    </section>
  )
}
