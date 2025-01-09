import { useEffect, useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-typescript'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/ext-language_tools'
export default function ConfigCode() {
  const [value, setValue] = useState('')
  const [initValue, setInitValue] = useState('')

  useEffect(() => {
    window.app.botConfigRead().then(data => {
      setInitValue(data)
      setValue(data)
    })
  }, [])

  return (
    <main className="flex-1 flex flex-col px-4 bg-[var(--secondary-bg-front)] ">
      <section className="flex-1 flex flex-col shadow-content rounded-xl bg-[var(--primary-bg-front)]">
        {
          //
        }
        <div className="flex justify-between items-center min-h-10  px-4">
          <div className="flex">
            <div>运行配置</div>
          </div>
          <div className="flex  gap-4 items-center">
            {value != initValue && (
              <>
                <button className="border py-1 px-2 rounded-md bg-red-500 hover:bg-red-400">
                  <span
                    className="text-white"
                    onClick={() => {
                      setValue(initValue)
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
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <AceEditor
            mode="typescript"
            style={{
              backgroundColor: 'var(--primary-bg-front)',
              width: '100%',
              height: '100%'
            }}
            onChange={newValue => {
              setValue(newValue)
            }}
            value={value}
            name="typescript_editor"
          />
        </div>
        <div className="flex justify-between items-center min-h-6"></div>
      </section>
    </main>
  )
}
