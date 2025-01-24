import { lazy, useEffect, useRef, useState } from 'react'
import Dropdown from './Dropdown'
import { debounce } from 'lodash'
import { useSelector } from 'react-redux'
import { RootState } from '@src/store'
import { useNotification } from '@src/context/Notification'
import { PackageInfoType } from './PackageInfo'
import { Init } from './Component'
import { MenuMoreIcon, RefreshIcon } from '@src/common/Icons'
import { fetchPackageInfo, getPackages } from './api'
import ExpansionsCard from './ExpansionsCard'
import { SecondaryDiv, SidebarDiv } from '@src/ui/Div'
import { Input } from '@src/ui/Interactive'

// 懒加载
const PackageInfo = lazy(() => import('./PackageInfo'))
const LinkFrom = lazy(() => import('./FromLink'))
const AddFrom = lazy(() => import('./FromAdd'))
const GithubFrom = lazy(() => import('./FromGit'))

export default function Expansions() {
  const app = useSelector((state: RootState) => state.app)
  const [packageInfo, setPackageInfo] = useState<PackageInfoType | null>(null)
  const packageInfoRef = useRef<PackageInfoType | null>(null)
  const { notification } = useNotification()
  const [select, setSelect] = useState('')
  const expansions = useSelector((state: RootState) => state.expansions)
  const [npms, setNpms] = useState<typeof expansions.package>([])
  const [packages, setPackages] = useState<typeof expansions.package>([])
  const [searchValue, setSearchValue] = useState('')

  // 查看扩展信息
  const handlePackageClick = debounce(async (packageName: string) => {
    const info = expansions.package.find(v => v.name === packageName)
    if (!info) {
      notification(`本地没有找到 ${packageName} 的数据。`, 'error')
      return
    }
    const dir = app.userDataNodeModulesPath + '/' + packageName + '/README.md'
    let __logo = null
    if (info?.alemonjs?.desktop?.logo) {
      const __dir = info.alemonjs.desktop.logo.replace(/^\./, '').replace(/^\//, '')
      __logo = app.userDataNodeModulesPath + '/' + packageName + '/' + __dir
    }
    const data = {
      'name': info?.name || '',
      'description': info?.description || '',
      'author': info?.author || null,
      'dist-tags': { latest: info?.version || '' },
      'version': info?.version || '',
      'readme': '',
      'isLink': info?.isLink || false,
      'isGit': info?.isGit || false,
      '__logo': __logo
    }
    try {
      const readme = await window.app.readFiles(dir)
      data.readme = readme
    } catch (err) {
      console.error(err)
    }
    setPackageInfo(data)
  }, 500)

  // 查看扩展信息
  const handleNpmJSPackageClick = debounce(async (packageName: string) => {
    try {
      const info = await fetchPackageInfo(packageName)
      const data = {
        'name': info?.name || '',
        'description': info?.description || '',
        'author': info?.author || null,
        'dist-tags': info['dist-tags'],
        'version': info['dist-tags'].latest,
        'readme': info.readme || '',
        '__logo_url': info?.__logo_url || null
      }
      setPackageInfo(data)
    } catch (err) {
      console.error(err)
    }
  }, 500)

  useEffect(() => {
    if (packageInfo) packageInfoRef.current = packageInfo
    if (packageInfo) setSelect('shoping')
  }, [packageInfo])

  const onChangeOption = (value: string) => {
    setSelect(value)
  }

  const onClickRefresh = () => {
    window.expansions.postMessage({ type: 'get-expansions' })
  }

  useEffect(() => {
    if (searchValue === '') {
      setPackages([])
      return
    }
    const reg = new RegExp(searchValue, 'i')
    const data = npms.filter(v => reg.test(v.name))
    setPackages(data)
  }, [searchValue])

  // 控制提交
  useEffect(() => {
    // 获取alemonjs相关包
    getPackages().then(data => {
      if (data.objects) {
        console.log('data.objects', data.objects)
        setNpms(data.objects.map((v: any) => v.package))
      }
    })
  }, [])

  return (
    <section className=" flex flex-row flex-1 h-full">
      <SecondaryDiv className="animate__animated animate__fadeIn flex flex-col flex-1">
        {select == '' && <Init />}
        {select == 'shoping' && packageInfo && <PackageInfo packageInfo={packageInfo} />}
        {select == '管理' && <LinkFrom />}
        {select == '模块' && <AddFrom />}
        {select == '仓库' && <GithubFrom />}
      </SecondaryDiv>
      <SidebarDiv className="animate__animated animate__fadeInRight duration-500 flex flex-col  w-72 xl:w-80 border-l  gap-1 h-full p-2">
        <div className="flex justify-between">
          <div className="text-xl">扩展列表</div>
          <div className="text-[0.7rem] flex gap-2 items-center justify-center ">
            <div onClick={onClickRefresh} className=" cursor-pointer">
              <RefreshIcon width={18} height={18} />
            </div>
            <Dropdown
              Icon={<MenuMoreIcon width={18} height={18} />}
              options={['仓库', '模块', '管理']}
              onChangeOption={onChangeOption}
            />
          </div>
        </div>
        <div className="">
          <Input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="在应用商店中搜索扩展"
            className="w-full px-2 py-1 rounded-sm"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-1 scrollbar overflow-auto h-[calc(100vh-8rem)]">
            {packages.length > 0
              ? packages.map(item => (
                  <ExpansionsCard
                    item={item}
                    key={item.name}
                    handlePackageClick={name => handleNpmJSPackageClick(name)}
                  />
                ))
              : expansions.package.map(item => (
                  <ExpansionsCard
                    item={item}
                    key={item.name}
                    handlePackageClick={name => handlePackageClick(name)}
                  />
                ))}
          </div>
        </div>
      </SidebarDiv>
    </section>
  )
}
