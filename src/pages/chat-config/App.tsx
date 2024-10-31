import { useEffect, useRef, useState } from 'react'
import FloatingMenu from '@src/FloatingMenu'
import Header from '../Header'
import JSON5 from 'json5'
import { useNavigate } from 'react-router-dom'
export default () => {
  //
  const navigate = useNavigate()
  //
  const [config, setConfig] = useState({
    httpUri: '',
    wsUri: ''
  })
  //
  const save = () => {
    window.app.readResourcesFilesGuiConfigJson().then(res => {
      const data = JSON5.parse(res)
      data.httpUri = configRef.current.httpUri
      data.wsUri = configRef.current.wsUri
      window.app.writeResourcesFilesGuiConfigJson(JSON5.stringify(data))
    })
  }
  //
  const init = () => {
    window.app.readResourcesFilesGuiConfigJson().then(res => {
      const data = JSON5.parse(res)
      setConfig({
        httpUri: data.httpUri,
        wsUri: data.wsUri
      })
    })
  }
  useEffect(() => {
    init()
    return () => {
      save()
    }
  }, [])
  const configRef = useRef(config)
  useEffect(() => {
    configRef.current = config
  }, [config])
  return (
    <section className="bg-white h-full flex flex-col">
      <Header>
        <div className="flex-1  drag-area flex justify-center items-center"></div>
      </Header>
      <section className="flex-1  relative px-2 py-1 flex flex-col   bg-zinc-50">
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

        <div className="bg-slate-200 flex flex-col px-2 py-4 rounded-md gap-2">
          <div className="flex px-2 gap-2  py-1 bg-blue-300  rounded-md">
            <div className=" ">HTTP地址</div>
            <input
              className="px-2 rounded-md outline-none"
              value={config.httpUri}
              onChange={e => {
                setConfig({
                  ...config,
                  httpUri: e.target.value
                })
              }}
              placeholder="请输入请求地址"
            />
          </div>
          <div className="flex  gap-2 px-2 py-1 bg-blue-300 rounded-md">
            <div className="">WS地址</div>
            <input
              className="px-2 rounded-md outline-none "
              value={config.wsUri}
              onChange={e => {
                setConfig({
                  ...config,
                  wsUri: e.target.value
                })
              }}
              placeholder="请输入链接地址"
            />
          </div>
        </div>
      </section>
    </section>
  )
}
