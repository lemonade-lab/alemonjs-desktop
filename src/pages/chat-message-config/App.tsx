import FloatingMenu from '@src/FloatingMenu'
import Header from '../Header'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import JSON5 from 'json5'

type EventType = {
  [key: string]: any
  Platform: string
  GuildId: string
  ChannelId: string
  IsMaster: number
  UserId: string
  UserName: string
  UserAvatar: string
  MsgId: string
  OpenID: string
}

export default () => {
  const navigate = useNavigate()
  //
  const [event, setEvent] = useState<EventType>({
    Platform: '',
    GuildId: '',
    ChannelId: '',
    IsMaster: 0,
    UserId: '',
    UserName: '',
    UserAvatar: '',
    MsgId: '',
    OpenID: ''
  })
  //
  const namesMap: {
    [key: string]: any
  } = {
    Platform: '平台',
    GuildId: '频道编号',
    ChannelId: '子频道编号',
    IsMaster: '是否是主人',
    UserId: '用户编号',
    UserName: '用户名',
    UserAvatar: '用户头像',
    MsgId: '消息编号',
    OpenID: '对话编号'
  }

  const configRef = useRef<EventType>(event)

  // 保存
  const save = () => {
    window.app.readResourcesFilesEventJson().then(res => {
      const data = JSON5.parse(res)
      const NewData = {
        ...data,
        'message.create': configRef.current
      }
      console.log('NewData', NewData)
      window.app.writeResourcesFilesEventJson(JSON5.stringify(NewData))
    })
  }

  // 初始化
  const init = () => {
    window.app.readResourcesFilesEventJson().then(res => {
      const data = JSON5.parse(res)
      const config = data['message.create']
      configRef.current = config
      setEvent(config)
    })
  }

  //
  useEffect(() => {
    init()
    return () => {
      save()
    }
  }, [])

  //
  useEffect(() => {
    configRef.current = event
  }, [event])

  return (
    <section className="bg-white relative h-full flex flex-col">
      <Header>
        <div className="flex-1  drag-area flex justify-center items-center"></div>
      </Header>
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
      <section className="flex-1  p-2 flex flex-col items-center bg-zinc-50 gap-1">
        {Object.entries(configRef.current).map(([key], index) => (
          <div
            key={index}
            className="flex px-2 gap-2 py-1 bg-blue-300 w-full
           rounded-md"
          >
            <div className="w-72">
              <span>{namesMap[key]}</span> <span>{key}</span>
            </div>
            <input
              value={event[key]}
              className="px-2 rounded-md outline-none w-full"
              onChange={e => {
                console.log('e.target.value', e.target.value)
                setEvent({
                  ...event,
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
