import { useEffect, useRef, useState } from 'react'
import FloatingMenu from '@src/FloatingMenu'
import Header from '../Header'
import JSON5 from 'json5'
import { useNavigate } from 'react-router-dom'
export default () => {
  //
  const navigate = useNavigate()
  //
  const namesMap: {
    [key: string]: string
  } = {
    httpUri: 'HTTP 地址',
    wsUri: 'WS 地址'
  }
  //
  const [config, setConfig] = useState<{
    [key: string]: string
  }>({
    httpUri: '',
    wsUri: ''
  })
  //
  const configRef = useRef(config)
  //
  const save = () => {
    window.app.readResourcesFilesGuiConfigJson().then(res => {
      const data = JSON5.parse(res)
      data.httpUri = configRef.current.httpUri
      data.wsUri = configRef.current.wsUri
      if (data.httpUri != '' && data.wsUri != '') {
        window.app.writeResourcesFilesGuiConfigJson(JSON5.stringify(data))
      }
    })
  }
  //
  const init = () => {
    window.app.readResourcesFilesGuiConfigJson().then(res => {
      const data = JSON5.parse(res)
      const config = {
        httpUri: data.httpUri,
        wsUri: data.wsUri
      }
      configRef.current = config
      setConfig(config)
    })
  }
  //
  useEffect(() => {
    init()
    return () => {
      save()
    }
  }, [])
  useEffect(() => {
    configRef.current = config
  }, [config])
  return (
    <section className=" relative h-full flex flex-col bg-[#ffffff6b] shadow-content rounded-xl">
      <FloatingMenu
        list={[
          {
            title: '返回',
            onClick: () => {
              navigate('/chat')
            }
          }
        ]}
      />
      <section className="flex-1  p-2 flex flex-col items-center  gap-1">
        {Object.entries(configRef.current).map(([key], index) => (
          <div
            key={index}
            className="flex px-2 gap-2 py-1  w-full
           rounded-md"
          >
            <div className="w-72">
              <span>{namesMap[key]}</span>
            </div>
            <input
              value={config[key]}
              className="px-2 rounded-md border outline-none w-full"
              onChange={e => {
                setConfig({
                  ...config,
                  [key]: e.target.value
                })
              }}
            />
          </div>
        ))}
      </section>
    </section>
  )
}
