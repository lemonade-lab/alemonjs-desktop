import { useState } from 'react'
import Markdown from '../Markdown'
import { fetchPackageInfo } from './api'
import logoURL from '@src/assets/logo.jpg'

export default function Expansions() {
  const [packageInfo, setPackageInfo] = useState<{
    'name': string
    'description': string
    'license': string
    'dist-tags': { latest: string }
    'downloads': string
    'time': { modified: string }
    'readme': string
  } | null>(null)
  const [readme, setReadme] = useState('')

  const extensions = [
    {
      name: '@alemonjs/gui',
      description: '测试机器人'
    }
  ]

  const handlePackageClick = async (packageName: string) => {
    try {
      const response = await fetchPackageInfo(packageName)
      setPackageInfo(response)
      setReadme(response.readme || '没有可用的 README 信息。')
    } catch (error) {
      console.error('Error fetching package information:', error)
    }
  }

  return (
    <section className="flex flex-col flex-1 shadow-md">
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 bg-[var(--primary-bg-front)]">
          {packageInfo ? (
            <div>
              <div className="p-2 bg-white flex gap-4 items-start">
                <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src={logoURL}
                    alt={`${packageInfo.name} logo`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="text-2xl font-bold text-gray-800">{packageInfo.name}</div>
                  <div className="text-gray-700">{packageInfo.description}</div>
                  <div className="text-sm">
                    <span className="text-gray-600">版本:</span> {packageInfo['dist-tags'].latest}
                  </div>
                </div>
              </div>
              <div className="bg-white overflow-auto scrollbar h-[calc(100vh-9.2rem)]">
                <Markdown source={readme} />
              </div>
            </div>
          ) : (
            <div className="select-none flex-1 flex-col flex justify-center items-center">
              <div className="flex-col flex-1 flex justify-center ">
                <div className="flex-col flex justify-center items-center">选择查看扩展信息</div>
              </div>
            </div>
          )}
        </div>
        <nav className="min-w-60 border-l flex gap-1 flex-col p-2">
          <div className="">
            <input
              placeholder="在应用商店中搜索扩展"
              className="w-full px-2 py-1 text-sm rounded-sm"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            {extensions.map((item, index) => (
              <div
                key={index}
                onClick={() => handlePackageClick(item.name)}
                className="cursor-pointer flex gap-1 border p-1 flex-row h-14 justify-between items-center hover:bg-slate-200"
              >
                <div className="size-10 rounded-sm">
                  <img
                    src={logoURL}
                    alt={`${item.name} logo`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div>{item.name}</div>
                  <div>{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </section>
  )
}
