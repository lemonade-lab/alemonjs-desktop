import { useEffect, useRef, useState } from 'react'
import { SecondaryDiv, Select } from '@alemonjs/react-ui'
import { SidebarDiv } from '@alemonjs/react-ui'
import { Input } from '@alemonjs/react-ui'
import { useNotification } from '@/context/Notification'
import { Tooltip } from '@alemonjs/react-ui'
import { SyncOutlined } from '@ant-design/icons'
import Init from './Init'
import EditFile from './EditFile'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function Template() {
  const notification = useNotification()
  const [inputValue, setIputValue] = useState('')
  const [submit, setSubmit] = useState(false)
  const [select, setSelect] = useState('')
  const fromNameRef = useRef('')
  const noValueSelect = ['install', 'list']
  const selects = ['add', 'remove', 'link', 'unlink', ...noValueSelect]
  const [value, setValue] = useState(selects[0])
  const app = useSelector((state: RootState) => state.app)

  /**
   * @param e
   * @returns
   */
  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 选择版本,立即切换到该版本
    const value = e.target.value
    setValue(value)
  }

  /**
   *
   * @param e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIputValue(e.target.value)
  }

  /**
   *
   * @param e
   * @returns
   */
  const onClickSync = () => {
    //
    if (submit) {
      notification('正在执行中，请稍后', 'warning')
      return
    }

    if (!value) return

    if (noValueSelect.includes(value)) {
      setSubmit(true)
      window.yarn.cmds({
        type: `cmd`,
        value: [value]
      })
      return
    }

    if (!inputValue || inputValue == '') return

    const inputValues = inputValue.split(' ')

    setSubmit(true)

    if (value == 'add') {
      // 没有参数的时候，自动添加 -W
      if (!inputValues.includes('-W')) {
        inputValues.push('-W')
      }
    }

    const cmd = [value].concat(inputValues)

    window.yarn.cmds({
      type: `cmd`,
      value: cmd
    })
  }

  useEffect(() => {
    fromNameRef.current = `${value} ${inputValue}`
  }, [value, inputValue])

  useEffect(() => {
    // 监听 yarn 命令
    window.yarn.on(data => {
      if (!data || !data.type || data.type != 'cmd') return

      //  结束加载状态
      setSubmit(false)

      const value = data.value
      if (value == 0) {
        notification(`yarn ${fromNameRef.current} 失败`, 'warning')
        return
      }

      // 成功
      notification(`yarn ${fromNameRef.current} 完成`)

      // 匹配到有关更改包的都重新获取扩展列表。
      if (!fromNameRef.current.match(/(add|remove|link|unlink)/)) {
        return
      }

      // 重新获取扩展列表
      window.expansions.postMessage({
        type: 'get-expansions',
        data: {}
      })
    })
  }, [])

  return (
    <section className=" flex flex-row flex-1 h-full shadow-md">
      <SecondaryDiv className="animate__animated animate__fadeIn flex flex-col flex-1">
        {select == '' && <Init />}
        {[
          {
            title: 'npmrc',
            value: 'npmrc',
            mode: null,
            dir: app.userDataTemplatePath + '/.npmrc'
          },
          {
            title: 'package.json',
            value: 'package',
            mode: 'application/json',
            dir: app.userDataTemplatePath + '/package.json'
          },
          {
            title: 'alemon.config.yaml',
            value: 'config',
            mode: 'yaml',
            dir: app.userDataTemplatePath + '/alemon.config.yaml'
          },
          {
            title: '.puppeteerrc.cjs',
            value: 'puppeteerrc',
            mode: 'javascript',
            dir: app.userDataTemplatePath + '/.puppeteerrc.cjs'
          },
          {
            title: 'index.js',
            value: 'index',
            mode: 'javascript',
            dir: app.userDataTemplatePath + '/alemonjs/index.js'
          },
          {
            title: 'desktop.js',
            value: 'desktop',
            mode: 'javascript',
            dir: app.userDataTemplatePath + '/alemonjs/desktop.js'
          }
        ].map((item, index) => {
          if (select === item.value) {
            return <EditFile key={index} title={item.title} mode={item.mode} dir={item.dir} />
          }
          return null
        })}
      </SecondaryDiv>
      <SidebarDiv className="animate__animated animate__fadeInRight duration-500 flex flex-col  w-72 xl:w-80 border-l h-full">
        <div className="flex justify-between px-2 py-1">
          <div className=" cursor-pointer" onClick={() => setSelect('')}>
            包管理器
          </div>
          <div className="text-[0.7rem] flex gap-2 items-center justify-center ">
            <Select onChange={onSelect} className="rounded-md px-2">
              {selects.map((v, i) => (
                <option key={i} value={v}>
                  {v}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex items-center">
          <Input
            type="text"
            name="name"
            placeholder="alemonjs"
            value={inputValue}
            onChange={handleChange}
            className="w-full px-2 py-1 rounded-sm"
          />
          <Tooltip text="同步执行">
            <div className="px-2" onClick={onClickSync}>
              <SyncOutlined />
            </div>
          </Tooltip>
        </div>
        <div className="flex-1 ">
          <SecondaryDiv className="flex flex-col gap-1  border-t py-2  overflow-auto  h-[calc(100vh-5.9rem)]">
            {[
              {
                name: 'package.json',
                value: 'package'
              },
              {
                name: '.npmrc',
                value: 'npmrc'
              },
              {
                name: '.puppeteerrc.cjs',
                value: 'puppeteerrc'
              },
              {
                name: 'alemon.config.yaml',
                value: 'config'
              },
              {
                name: 'alemonjs/index.js',
                value: 'index'
              },
              {
                name: 'alemonjs/desktop.js',
                value: 'desktop'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 px-2 cursor-pointer"
                onClick={() => setSelect(item.value)}
              >
                {item.name}
              </div>
            ))}
          </SecondaryDiv>
        </div>
      </SidebarDiv>
    </section>
  )
}
