import { useEffect, useState } from 'react'

// 扩展 window
type API = {
  postMessage: (data: any) => void
  onMessage: (callback: (data: any) => void) => void
}

declare global {
  interface Window {
    createDesktopAPI: () => API
    API: API
  }
}

export default function GithubFrom() {
  const [formData, setFormData] = useState({
    name: ''
  })
  useEffect(() => {}, [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <div className="flex flex-1 items-center justify-center ">
      <div className=" p-8 rounded-lg bg-[var(--secondary-bg-front)] shadow-inner w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Github</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">地址</label>
            <input
              type="text"
              id="host"
              name="host"
              placeholder="https://github.com/lemonade-lab/alemonjs.git"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-400 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            下载仓库
          </button>
        </form>
      </div>
    </div>
  )
}
