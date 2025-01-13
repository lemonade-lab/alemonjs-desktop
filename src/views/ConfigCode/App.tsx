import { useState } from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'

import 'codemirror/lib/codemirror.css'
import 'codemirror/lib/codemirror.js'
import 'codemirror/mode/yaml/yaml'
import { useNotification } from '@src/context/Notification'
import useGoNavigate from '@src/hook/navigate'
export default function ConfigCode() {
  const navigate = useGoNavigate()
  const [value, setValue] = useState('')

  const { showNotification } = useNotification()

  const [initValue, setInitValue] = useState('')

  const onClickSave = () => {
    //
  }
  return (
    <section className="flex-1 flex flex-col bg-[var(--secondary-bg-front)] ">
      <div className="flex-1 flex flex-col shadow-md rounded-md bg-[var(--primary-bg-front)]">
        <div className="flex justify-between items-center min-h-10 px-2">
          <div className="flex gap-2">
            <div className="px-1">运行配置</div>
            <div
              className="px-1 bg-slate-50 rounded-full border cursor-pointer"
              onClick={() => {
                navigate('/config-edit')
              }}
            >
              CODE
            </div>
          </div>
          <div className="flex  gap-4 items-center">
            {value != initValue && (
              <>
                <button
                  type="button"
                  className="border py-1 px-2 rounded-md bg-red-500 hover:bg-red-400"
                >
                  <span
                    className="text-white"
                    onClick={() => {
                      setValue(initValue)
                    }}
                  >
                    放弃
                  </span>
                </button>
                <button
                  type="button"
                  className="border py-1 px-2 rounded-md bg-blue-500 hover:bg-blue-400"
                >
                  <span className="text-white" onClick={onClickSave}>
                    保存
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col h-[calc(100vh-7rem)] overflow-y-auto scrollbar">
          <CodeMirror
            value={value}
            className="flex-1 flex flex-col"
            options={{
              mode: 'text/x-yaml',
              lineNumbers: true
            }}
            onChange={(editor, data, value) => {
              setValue(value)
            }}
          />
        </div>
        <div className="flex justify-between items-center min-h-6"></div>
      </div>
    </section>
  )
}
