import FloatingMenu from '@src/FloatingMenu'
import Header from '../Header'
import { useNavigate } from 'react-router-dom'
export default () => {
  const navigate = useNavigate()
  const data = {
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
  }
  return (
    <section className="bg-white h-full flex flex-col">
      <Header>
        <div className="flex-1  drag-area flex justify-center items-center"></div>
      </Header>
      <section className="flex-1 relative px-2 flex flex-col items-center bg-zinc-50">
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
        {Object.entries(data).map(([key, value], index) => (
          <div key={index} className="flex px-2 gap-2 py-1 bg-blue-300 rounded-md">
            <div>{key}</div>
            <input
              className="px-2 rounded-md outline-none"
              onChange={e => {
                // Handle change for each input, if needed
                console.log(`${key}: ${e.target.value}`)
              }}
            />
          </div>
        ))}
      </section>
    </section>
  )
}
