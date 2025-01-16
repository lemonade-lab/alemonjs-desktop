import { useNotification } from '@src/context/Notification'
import { useEffect, useRef, useState } from 'react'
import { extractRepoInfo, fetchGitHubBranches } from './api'

export default function GithubFrom() {
  const [fromNameValue, setFromNameValue] = useState('')
  const fromNameRef = useRef('')

  useEffect(() => {
    fromNameRef.current = fromNameValue
  }, [fromNameValue])

  const { notification } = useNotification()
  const [submit, setSubmit] = useState(false)
  const [select, setSelect] = useState('main')
  const [platforms, setPlatforms] = useState(['main', 'master'])
  const [branches, setBranches] = useState<
    {
      name: string
      commit: {
        sha: string
        url: string
      }
      protected: boolean
    }[]
  >([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleMessage = (data: { type: string; data: any }) => {
      if (data.type === 'git-clone') {
        setSubmit(false)
        if (data.data === 1) {
          notification('git clone 完成')
          window.yarn.install()
        } else {
          notification('git clone 失败', 'warning')
        }
      }
    }

    window.expansions.onMessage(handleMessage)
  }, [notification])

  const handleChange = e => {
    setFromNameValue(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (submit || !fromNameValue) return
    window.expansions.postMessage({ type: 'git-clone', data: fromNameValue })
    setSubmit(true)
  }

  const onClickSelect = async () => {
    if (!/github/.test(fromNameValue)) return
    setLoading(true) // 开始加载状态
    const { username, repository } = extractRepoInfo(fromNameValue)
    try {
      const data = await fetchGitHubBranches(username, repository)
      if (!data) return
      setBranches(data)
    } catch (e) {
      console.error(e)
      notification('获取分支失败', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="p-8 rounded-lg bg-[var(--secondary-bg-front)] shadow-inner w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Git</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm py-1 font-medium text-gray-700">
              需安装git,
              <span
                className="cursor-pointer text-blue-600"
                onClick={() => window.open('https://git-scm.com/')}
              >
                点击下载
              </span>
              。当前仅支持 GitHub 仓库选择分支。
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="name"
                placeholder="请输入[@URL].git"
                value={fromNameValue}
                onChange={handleChange}
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
              <div>
                <select onClick={onClickSelect} value={select} className="bg-transparent">
                  {platforms.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full p-2 rounded-md transition-all duration-700 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? '加载中...' : '克隆仓库'}
          </button>
        </form>
      </div>
    </div>
  )
}
