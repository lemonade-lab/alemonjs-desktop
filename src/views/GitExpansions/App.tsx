import { lazy, useEffect, useRef, useState } from 'react'
import { Init } from './Component'
import { SecondaryDiv } from '@src/ui/SecondaryDiv'
import { SidebarDiv } from '@src/ui/SidebarDiv'
import { Input } from '@src/ui/Input'
import { MenuMore, Refresh } from '@src/ui/Icons'
import { FolderAddOutlined } from '@ant-design/icons'
import Info from './Info'
export default function Expansions() {
  const [select, setSelect] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const onClickRefresh = () => {
    // window.expansions.postMessage({ type: 'get-expansions' })
  }

  // useEffect(() => {
  //   if (searchValue === '') {
  //     setPackages([])
  //     return
  //   }
  //   const reg = new RegExp(searchValue, 'i')
  //   const data = npms.filter(v => reg.test(v.name))
  //   setPackages(data)
  // }, [searchValue])

  return (
    <section className=" flex flex-row flex-1 h-full">
      <SecondaryDiv className="animate__animated animate__fadeIn flex flex-col flex-1">
        {select == '' && <Init />}
        {/* {select === 'info' && <Info />} */}
      </SecondaryDiv>
      <SidebarDiv className="animate__animated animate__fadeInRight duration-500 flex flex-col  w-72 xl:w-80 border-l  gap-1 h-full p-2">
        <div className="flex justify-between">
          <div className="text-xl">仓库列表</div>
          <div className="text-[0.7rem] flex gap-2 items-center justify-center ">
            <div onClick={onClickRefresh} className=" cursor-pointer">
              <Refresh width={18} height={18} />
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="输入新仓库地址以添加"
            className="w-full px-2 py-1 rounded-sm"
          />
          <div className="cursor-pointer">
            <FolderAddOutlined />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-1  overflow-auto h-[calc(100vh-8rem)]">
            <Info />
          </div>
        </div>
      </SidebarDiv>
    </section>
  )
}
