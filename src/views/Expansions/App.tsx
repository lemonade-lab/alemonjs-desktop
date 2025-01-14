import { lazy, useEffect, useState } from 'react'
import logoURL from '@src/assets/logo.jpg'
import Dropdown from './Dropdown'
import { debounce } from 'lodash'
import { useSelector } from 'react-redux'
import { RootState } from '@src/store'
import { useNotification } from '@src/context/Notification'
import { PackageInfoType } from './PackageInfo'
import { Init } from './Component'

// 懒加载
const PackageInfo = lazy(() => import('./PackageInfo'))
const From = lazy(() => import('./From'))
const AddFrom = lazy(() => import('./AddFrom'))
const GithubFrom = lazy(() => import('./GithubFrom'))

export default function Expansions() {
  const app = useSelector((state: RootState) => state.app)
  const [packageInfo, setPackageInfo] = useState<PackageInfoType>(null)
  const { showNotification } = useNotification()
  const [select, setSelect] = useState('')
  const expansions = useSelector((state: RootState) => state.expansions)
  const handlePackageClick = debounce(async (packageName: string) => {
    const pkg = expansions.package.find(v => v.name === packageName)
    if (!pkg) {
      showNotification(`没有找到 ${packageName} 的数据。`)
      return
    }
    const dir = app.nodeModulesPath + '/' + packageName + '/README.md'
    const data = {
      'name': pkg?.name || '',
      'description': pkg?.description || '',
      'dist-tags': { latest: pkg?.version || '' },
      'readme': ''
    }
    try {
      const readme = await window.app.readFiles(dir)
      data.readme = readme
    } catch (err) {
      console.error(err)
    }
    setPackageInfo(data)
  }, 500)
  useEffect(() => {
    if (packageInfo) setSelect('shoping')
  }, [packageInfo])
  const onChangeOption = (value: string) => {
    setSelect(value)
  }
  return (
    <section className="flex flex-col flex-1 shadow-md">
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 bg-[var(--primary-bg-front)]">
          {select == '' && <Init />}
          {select == 'shoping' && packageInfo && <PackageInfo packageInfo={packageInfo} />}
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
