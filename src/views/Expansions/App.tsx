import { useEffect, useState } from 'react'
import Markdown from '../Markdown'
import { fetchPackageInfo } from './api'
import logoURL from '@src/assets/logo.jpg'
import Dropdown from './Dropdown'
import { debounce } from 'lodash'
import From from './From'
import AddFrom from './AddFrom'
import GithubFrom from './GithubFrom'
import { useSelector } from 'react-redux'
import { RootState } from '@src/store'
import { useNotification } from '@src/context/Notification'

export default function Expansions() {
  //
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

  const { showNotification } = useNotification()

  const expansions = useSelector((state: RootState) => state.expansions)

  const handlePackageClick = debounce(async (packageName: string) => {
    showNotification(`开始获取 ${packageName} 的数据。`)
    try {
      const response = await fetchPackageInfo(packageName)
      setPackageInfo(response)
      setReadme(response.readme || '没有可用的 README 信息。')

      showNotification(`获取 ${packageName} 的完成。`)
    } catch (error) {
      console.error('Error fetching package information:', error)
      showNotification(`从 npmjs 中 ${packageName} 获取失败`)
    }
  }, 500)

  const [select, setSelect] = useState('')

  useEffect(() => {
    // 默认选中商店
    if (packageInfo) setSelect('shoping')
  }, [packageInfo])

  const onChangeOption = (value: string) => {
    setSelect(value)
  }

  return (
    <section className="flex flex-col flex-1 shadow-md">
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 bg-[var(--primary-bg-front)]">
          {select == '' && (
            <div className="select-none flex-1 flex-col flex justify-center items-center">
              <div className="flex-col flex-1 flex justify-center ">
                <div className="flex-col flex justify-center items-center">选择查看扩展信息</div>
              </div>
            </div>
          )}
          {select == 'shoping' && packageInfo && (
            <div>
              <div className="p-2 bg-white flex items-center justify-center gap-4 border-b">
                <div className="bg-gray-100 flex items-center justify-center">
                  <img
                    src={logoURL}
                    alt={`${packageInfo.name} logo`}
                    className="size-20 rounded-md"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="text-xl font-bold text-gray-800">{packageInfo.name}</div>
                  <div className="text-gray-700">{packageInfo.description}</div>
                  <div className="text-sm">
                    <span className="text-gray-600">版本:</span> {packageInfo['dist-tags'].latest}
                  </div>
                </div>
              </div>
              <div className="bg-white overflow-auto scrollbar h-[calc(100vh-8.2rem)]">
                <Markdown source={readme} />
              </div>
            </div>
          )}
          {select == 'yarn link' && <From />}
          {select == 'yarn add' && <AddFrom />}
          {select == 'github' && <GithubFrom />}
        </div>
        <nav className="w-64 xl:w-72 border-l flex gap-1 flex-col p-2">
          <div className=" flex justify-between">
            {/* <div className="text-[0.7rem]">扩展商城</div> */}
            <div className="text-[0.7rem]">扩展列表</div>
            <div className="text-[0.7rem] flex items-center justify-center ">
              <Dropdown
                options={['github', 'yarn link', 'yarn add']}
                onChangeOption={onChangeOption}
              />
            </div>
          </div>
          {/* <div className="">
            <input
              placeholder="在应用商店中搜索扩展"
              className="w-full px-2 py-1 text-[0.7rem] rounded-sm"
            />
          </div> */}
          <div className="flex-1 flex flex-col gap-1">
            {expansions.package.map((item, index) => (
              <div
                key={index}
                onClick={() => handlePackageClick(item.name)}
                className="cursor-pointer rounded-sm relative flex gap-1  p-1 flex-row h-14 justify-between items-center hover:bg-slate-200"
              >
                <div className="size-10 rounded-sm">
                  <img
                    src={logoURL}
                    alt={`${item.name} logo`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="text-[0.9rem]">{item.name}</div>
                  <div className="text-[0.6rem]">{item.description}</div>
                </div>
                <div className="absolute  bottom-1 right-1 text-[0.6rem]">设置</div>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </section>
  )
}
