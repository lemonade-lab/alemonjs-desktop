import { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useNotification } from '@/context/Notification'
import { SecondaryDiv } from '@alemonjs/react-ui'
import { SidebarDiv } from '@alemonjs/react-ui'
import { Input } from '@alemonjs/react-ui'
import { fetchPackageInfo, getPackages } from '@/api'
import PackageInfo, { PackageInfoType } from './PackageInfo'
import ExpansionsCard from './ExpansionsCard'
import { Init } from './Component'
import { SyncOutlined } from '@ant-design/icons'

export default function Expansions() {
  const app = useSelector((state: RootState) => state.app)
  const [packageInfo, setPackageInfo] = useState<PackageInfoType | null>(null)
  const packageInfoRef = useRef<PackageInfoType | null>(null)
  const notification = useNotification()
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
    let __icon = null
    if (info?.alemonjs?.desktop?.logo) {
      if (info.alemonjs.desktop.logo.startsWith('antd.')) {
        __icon = info.alemonjs.desktop.logo
      } else {
        const __dir = info.alemonjs.desktop.logo.replace(/^\./, '').replace(/^\//, '')
        __logo = app.userDataNodeModulesPath + '/' + packageName + '/' + __dir
      }
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
      '__logo': __logo,
      '__icon': __icon
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
        '__logo_url': info?.__logo_url || null,
        '__icon': info?.__icon || null
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
    <section className=" flex flex-row flex-1 h-full shadow-md">
      <SecondaryDiv className="animate__animated animate__fadeIn flex flex-col flex-1">
        {select == '' && <Init />}
        {select == 'shoping' && packageInfo && <PackageInfo packageInfo={packageInfo} />}
      </SecondaryDiv>
      <SidebarDiv className="animate__animated animate__fadeInRight duration-500 flex flex-col  w-72 xl:w-80 border-l h-full">
        <div className="flex justify-between px-2 py-1">
          <div className="">扩展列表</div>
          <div className="text-[0.7rem] flex gap-2 items-center justify-center ">
            <div onClick={onClickRefresh} className=" cursor-pointer">
              <SyncOutlined />
            </div>
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
        <div className="flex-1 ">
          <SecondaryDiv className="flex flex-col gap-1  border-t py-2 overflow-auto  h-[calc(100vh-5.9rem)]">
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
          </SecondaryDiv>
        </div>
      </SidebarDiv>
    </section>
  )
}
