import { Fragment, useEffect, useRef, useState } from 'react'
import { SendIcon } from '../Icons'
import moment from 'moment'
import img_logo from '@src/assets/logo.jpg'
import JSON5 from 'json5'
import { useNavigate } from 'react-router-dom'
import Header from '../Header'
import FloatingMenu from '@src/FloatingMenu'
/**
 * 聊天测试窗口
 */
export default () => {
  const navigate = useNavigate()

  const [status, setStatus] = useState<'open' | 'close'>('close')
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [message, setMessage] = useState<
    {
      bot: boolean
      value: {
        t: string
        d: any
      }
      createAt: string
    }[]
  >([])
  const [config, setConfig] = useState({
    wsUri: '',
    httpUri: ''
  })

  const [event, setEvent] = useState({
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

  const [value, setValue] = useState('')
  // static
  const map = {
    open: '已连接',
    close: '已断开'
  }
  const BOT_URI = img_logo

  const USER_URI = 'https://q1.qlogo.cn/g?b=qq&s=0&nk=1715713638'

  /**
   * 刷新状态
   * @returns
   */
  const update = () => {
    // 创建 WebSocket 连接
    const socket = new WebSocket(config.wsUri)
    // 监听连接打开事件
    socket.onopen = () => {
      console.log('WebSocket 连接已建立')
      setStatus('open')
    }
    // 监听消息事件
    socket.onmessage = db => {
      const event = JSON.parse(db.data)
      console.log('event', event)
      if (event.t == 'send_message') {
        const txt = event.d.MsgBody.find((item: any) => item.t == 'text')
        if (txt) {
          // 使用函数式更新
          setMessage(prevMessages =>
            prevMessages.concat([
              {
                bot: true,
                value: {
                  t: 'text',
                  d: txt.d
                },
                createAt: moment().format('YYYY-MM-DD HH:mm:ss')
              }
            ])
          )
        }
        const img = event.d.MsgBody.find((item: any) => item.t == 'image')
        if (img) {
          console.log('img.d', img.d)
          setMessage(prevMessages =>
            prevMessages.concat([
              {
                bot: true,
                value: {
                  t: 'image',
                  d: img.d.url
                },
                createAt: moment().format('YYYY-MM-DD HH:mm:ss')
              }
            ])
          )
        }
      }
    }
    // 监听连接关闭事件
    socket.onclose = () => {
      setStatus('close')
      console.log('WebSocket 连接已关闭')
      alert('连接关闭')
    }
    return socket
  }

  const onClickConnect = () => {
    const socket = update()
    // 设置 socket 状态
    setSocket(socket)
  }

  const onClickclose = () => {
    setSocket(null)
    socket && socket.close()
  }

  useEffect(() => {
    window.app.readResourcesFilesTestMessageJson().then(res => {
      const data = JSON5.parse(res)
      setMessage(data)
    })

    window.app.readResourcesFilesEventJson().then(res => {
      const data = JSON5.parse(res)
      console.log('data', data)
      setEvent(data['message.create'])
    })

    window.app.readResourcesFilesGuiConfigJson().then(res => {
      const data = JSON5.parse(res)
      setConfig(data)
    })

    // 清理函数，关闭 WebSocket 连接
    return () => {
      socket && socket.close()
    }
  }, [])

  const MessageWindowRef = useRef<HTMLElement>(null)

  // 变动时自动清理
  useEffect(() => {
    // 清空
    setValue('')
    // save
    window.app.writeResourcesFilesTestMessageJson(JSON5.stringify(message))

    if (MessageWindowRef.current) {
      // 滚动到底部
      MessageWindowRef.current.scrollTo(0, MessageWindowRef.current.scrollHeight)
    }
  }, [message])

  /**
   *
   * @param msg
   */
  const sendMessage = (msg: string) => {
    if (status == 'close') return

    if (socket && msg != '') {
      setMessage(prevMessages =>
        prevMessages.concat([
          {
            bot: false,
            value: {
              t: 'text',
              d: msg
            },
            createAt: moment().format('YYYY-MM-DD HH:mm:ss')
          }
        ])
      )
      socket.send(
        JSON.stringify({
          t: 'send_message',
          d: {
            ...event,
            MsgBody: [
              {
                t: 'text',
                d: msg
              }
            ]
          }
        })
      )
    }
  }

  return (
    <section className="relative h-full flex flex-col   bg-[#ffffff6b] shadow-content rounded-3xl">
      <FloatingMenu
        list={[
          { title: '连接', onClick: onClickConnect },
          { title: '断开', onClick: onClickclose },
          { title: '配置', onClick: () => navigate('/chat-config') },
          { title: '消息', onClick: () => navigate('/chat-message-config') }
        ]}
      />

      <section
        ref={MessageWindowRef}
        className="flex-1  px-3 py-2 overflow-y-auto flex gap-1 flex-col webkit  bg-opacity-50"
      >
        {message.map((item, index) => (
          <div key={index} className="flex  gap-4 bg-opacity-70 mr-auto ">
            <img
              className="size-[3rem] rounded-full border"
              src={item.bot ? BOT_URI : USER_URI}
              alt="Avatar"
            />

            <div className="rounded-md relative p-1 m-auto bg-slate-100">
              {item.value.t == 'text' &&
                item.value.d.split('\n').map((line: string, index: number) => (
                  <Fragment key={index}>
                    {line}
                    {index < item.value.d.split('\n').length - 1 && <br />}
                  </Fragment>
                ))}
              {item.value.t == 'image' && (
                <img
                  className="max-w-[20rem] xl:max-w-[25rem]"
                  src={
                    /^\/file/.test(item.value.d) ? `${config.httpUri}${item.value.d}` : item.value.d
                  }
                ></img>
              )}

              <span className="absolute bottom-0 text-[0.5rem] whitespace-nowrap">
                {item.createAt}
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="w-full flex flex-row justify-center p-1 ">
        <input
          type="text"
          className="rounded-md w-full h-8 px-2 outline-none"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="输入内容..."
          onKeyDown={event => event.key === 'Enter' && sendMessage(value)}
        />

        <div
          className="shadow-content mx-2 px-2 cursor-pointer rounded-md text-white flex items-center justify-center"
          onClick={() => sendMessage(value)}
        >
          <SendIcon />
        </div>
      </section>
    </section>
  )
}
