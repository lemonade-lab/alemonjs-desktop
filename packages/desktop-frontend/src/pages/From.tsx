import { useEffect, useState } from 'react'

export default function Form() {
  const [formData, setFormData] = useState({
    apps: ''
  })

  useEffect(() => {
    if (!window.createDesktopAPI) return
    const API = window.createDesktopAPI()
    window.API = API
    // 获取消息
    API.postMessage({
      type: 'desktop.init'
    })
    // 监听消息
    API.onMessage(data => {
      if (data.type === 'desktop.init') {
        if (!data.data) return
        if (!data.data.apps) return
        setFormData({
          apps: data.data.apps.join('.')
        })
      }
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      apps: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    window.API.postMessage({
      type: 'desktop.form.save',
      data: formData
    })
  }

  return (
    <form id="qqBotForm" onSubmit={handleSubmit} className="py-4 space-y-4">
      <div>
        <label htmlFor="app_id" className="block text-sm font-medium text-gray-700">
          Apps
        </label>
        <textarea
          id="apps"
          name="apps"
          defaultValue=""
          value={formData.apps}
          onChange={e => handleChange(e)}
          className="mt-1  min-h-36 block w-full p-2 resize-none border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        保存
      </button>
      <div>输入扩展名,可识别出对应的应用程序,多个用.分割</div>
      <div>(如: alemonjs-xiuxian.alemonjs-ollama)</div>
      <div>并非所有的扩展都具有应用功能，具体请阅读扩展文档</div>
      <div>保存后，重启机器人可生效。</div>
    </form>
  )
}
