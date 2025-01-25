import { useNotification } from '@src/context/Notification'
import { Button } from '@src/ui/Button'
import { Input } from '@src/ui/Input'
import { PrimaryDiv } from '@src/ui/PrimaryDiv'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
// import { extractRepoInfo, fetchGitHubBranches } from './api'

export default function GithubFrom() {
  const { notification } = useNotification()
  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fromNameValue, setFromNameValue] = useState('')
  const fromNameRef = useRef('')

  /**
   *
   * @param e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromNameValue(e.target.value)
  }

  /**
   *
   * @param e
   * @returns
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 防止重复提交
    if (submit || !fromNameValue) return
    setLoading(true) // 开始加载状态
    notification(`开始克隆 ${fromNameValue}`)
    window.expansions.postMessage({ type: 'git-clone', data: fromNameValue })
  }

  useEffect(() => {
    fromNameRef.current = fromNameValue
  }, [fromNameValue])

  useEffect(() => {
    window.expansions.onMessage((data: { type: string; data: any }) => {
      if (!data.type || data.type !== 'git-clone') return
      // 结束加载状态
      setSubmit(false)
      // 结束加载状态
      if (data.data == 1) {
        notification('git clone 完成')
        // 推送加载。
        window.yarn.cmds({
          type: 'install',
          value: ['install', '--ignore-warnings']
        })
      } else {
        notification('git clone 失败', 'warning')
      }
    })
  }, [])

  return (
    <div className="flex flex-1 items-center justify-center">
      <PrimaryDiv className="p-8 rounded-lg  ] shadow-inner w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Git</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm py-1 font-medium text-secondary-text">
              需安装git,
              <a href="https://git-scm.com/" target="_blank">
                "点击下载"
              </a>
              ，且仓库满足npmjs规范。
            </label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                name="name"
                placeholder="请输入[@URL].git"
                value={fromNameValue}
                onChange={handleChange}
                className="mt-1 block w-full px-2 py-1 border b  rounded-md focus:outline-none focus:ring "
              />
            </div>
          </div>
          <Button
            type="submit"
            className={classNames('w-full p-2 rounded-md transition-all duration-700')}
            disabled={loading}
          >
            {loading ? '加载中...' : '克隆仓库'}
          </Button>
        </form>
      </PrimaryDiv>
    </div>
  )
}
