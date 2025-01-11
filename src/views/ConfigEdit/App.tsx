import { set } from 'lodash'
import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

import logoURL from '@src/assets/logo.jpg'

const createDataURL = (html: string) => {
  return `data:text/html;charset=utf-8,${encodeURIComponent(html)}`
}

const data = [
  {
    name: 'GUI',
    event: 'open.gui',
    url: createDataURL(`
            <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>QQ Bot</title>
      </head>
      <body>
        <h1>Welcome to QQ Bot</h1>
        <p>This is dynamically loaded HTML.</p>
      </body>
      </html>
      `)
  },
  {
    name: 'QQ Bot',
    event: 'open.qq-bot',
    url: createDataURL(`
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QQ Bot</title>
</head>
<body>
  <h1>Welcome to QQ Bot</h1>
  <p>This is dynamically loaded HTML.</p>
</body>
</html>
`)
  },
  {
    name: 'Discord',
    event: 'open.discord',
    url: createDataURL(`
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QQ Bot</title>
</head>
<body>
  <h1>Welcome to QQ Bot</h1>
  <p>This is dynamically loaded HTML.</p>
</body>
</html>
`)
  }
]

export default function ConfigEdit() {
  // const navigate = useNavigate()
  const [event, setEvent] = useState('')
  const [webviews, setWebviews] = useState(data)
  useEffect(() => {
    // 获取依赖信息
    setWebviews(data)
  }, [])

  useEffect(() => {}, [event])

  return (
    <section className="flex flex-col flex-1 bg-[var(--primary-bg-front)] shadow-md">
      {/* 主内容区 */}
      <div className="flex flex-1">
        {/* Webview 显示区 */}
        <div className="flex flex-col flex-1 h-[calc(100vh-6rem)]">
          {event != '' && webviews.find(item => item.event == event) ? (
            <webview
              src={webviews.find(item => item.event == event)?.url}
              className="w-full h-full"
            />
          ) : (
            <div className="select-none flex-1 flex-col flex justify-center items-center">
              <div className="flex-col flex">
                <img src={logoURL} alt="logo" className="w-96" />
                <div className="flex-col flex justify-center items-center">
                  可选择左侧导航栏中的选项进行查看
                </div>
              </div>
            </div>
          )}
        </div>
        {/* 右侧导航栏 */}
        <nav className="w-20 border-l ">
          {webviews.map((view, index) => (
            <div
              key={index}
              className={`p-2 cursor-pointer text-center hover:bg-slate-200 ${
                view.event === event ? 'bg-slate-300 font-bold' : ''
              }`}
              onClick={() => setEvent(view.event)}
            >
              {view.name}
            </div>
          ))}
        </nav>
      </div>
    </section>
  )
}
