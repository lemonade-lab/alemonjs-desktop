import { useEffect, useState } from 'react'

import { UnControlled as CodeMirror } from 'react-codemirror2'

import 'codemirror/lib/codemirror.css'
import 'codemirror/lib/codemirror.js'
import 'codemirror/mode/yaml/yaml'

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
          <CodeMirror
            value={value}
            className="w-full h-full"
            options={{
              mode: 'text/x-yaml',
              lineNumbers: true
            }}
            onBeforeChange={(editor, data, value) => {
              console.log('onBeforeChange fresh')
              console.log(JSON.stringify(data))
            }}
            onChange={(editor, data, value) => {
              setValue(value)
            }}
          />
        </div>
        <div className="flex justify-between items-center min-h-6"></div>
      </section>
    </main>
  )
}
