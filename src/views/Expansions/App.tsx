import { lazy, useEffect, useState } from 'react'
import logoURL from '@src/assets/logo.jpg'
import Dropdown from './Dropdown'
import { debounce } from 'lodash'
import { useSelector } from 'react-redux'
import { RootState } from '@src/store'
import { useNotification } from '@src/context/Notification'
import { PackageInfoType } from './PackageInfo'
import { Init } from './Component'
import { MenuMoreIcon, RefreshIcon, SettingIcon } from '@src/common/Icons'

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

  //
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
      'author': pkg?.author || null,
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

  //
  const onChangeOption = (value: string) => {
    setSelect(value)
  }

  const onClickRefresh = () => {
    // 刷新列表
    window.expansions.postMessage({ type: 'get-expansions' })
  }

  return (
    <section className="flex flex-col flex-1 shadow-md">
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 bg-[var(--primary-bg-front)]">
          {select == '' && <Init />}
          {select == 'shoping' && packageInfo && <PackageInfo packageInfo={packageInfo} />}
          {select == '关联' && <From />}
          {select == '添加' && <AddFrom />}
          {select == '仓库' && <GithubFrom />}
        </div>
        <nav className="w-72 xl:w-80 border-l flex gap-1 flex-col p-2">
          <div className=" flex justify-between">
            <div className="">扩展列表</div>
            <div className="text-[0.7rem] flex gap-2 items-center justify-center ">
              <div onClick={onClickRefresh} className=" cursor-pointer">
                <RefreshIcon width={18} height={18} />
              </div>
              <Dropdown
                Icon={<MenuMoreIcon width={18} height={18} />}
                options={['仓库', '关联', '添加']}
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
            {expansions.package.map(item => (
              <div
                key={item.name}
                onClick={() => handlePackageClick(item.name)}
                className="cursor-pointer rounded-sm relative flex gap-1  p-1 flex-row h-14 justify-between items-center hover:bg-gray-100"
              >
                <div className="size-10 rounded-sm">
                  <img
                    src={logoURL}
                    alt={`${item.name} logo`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="">{item.name}</div>
                  <div className="text-[0.6rem]">{item.description}</div>
                </div>
                <div className="absolute  bottom-1 right-1 text-[0.6rem]">
                  <Dropdown
                    Icon={<SettingIcon width={18} height={18} />}
                    options={['卸载']}
                    onChangeOption={value => {
                      //
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </section>
  )
}
