import FloatingMenu from '@src/FloatingMenu'
import Header from '../Header'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
export default () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    Platform: '',
    GuildId: '',
    ChannelId: '',
    IsMaster: true,
    UserId: '',
    UserName: '',
    UserAvatar: '',
    MsgId: '',
    OpenID: '',
    CreateAt: 0,
    value: null
  })
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
    OpenID: '对话编号',
    CreateAt: '时间戳',
    value: '原型消息'
  }
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
        {Object.entries(data).map(([key], index) => (
          <div
            key={index}
            className="flex px-2 gap-2 py-1 bg-blue-300 w-full
           rounded-md"
          >
            <div className="w-72">
              <span>{namesMap[key]}</span> <span>{key}</span>
            </div>
            <input
              className="px-2 rounded-md outline-none w-full"
              onChange={e => {
                console.log(`${key}: ${e.target.value}`)
                // useState({
                //   ...data,
                //   [key]: e.target.value
                // })
              }}
            />
          </div>
        ))}
      </section>
    </section>
  )
}
