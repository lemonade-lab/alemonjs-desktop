import { useEffect, useRef, useState } from 'react'
import Init from './Init'
import { SecondaryDiv } from '@alemonjs/react-ui'
import { SidebarDiv } from '@alemonjs/react-ui'
import { Input } from '@alemonjs/react-ui'
import { FolderAddOutlined } from '@ant-design/icons'
import Info from './GitInfo'
// import { RootState } from '@/store'
// import { useSelector } from 'react-redux'
import { useNotification } from '@/context/Notification'
import { extractRepoInfo, isGitRepositoryFormat } from '@/api'
import Markdown from '@/common/Markdown'
import { Tooltip } from '@alemonjs/react-ui'
import { Select } from '@alemonjs/react-ui'

export default function Expansions() {
  // const app = useSelector((state: RootState) => state.app)
  const [select, setSelect] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const notification = useNotification()
  const [data, setData] = useState<string[]>([])
  const [sub, setSub] = useState(false)

  const [readme, setReadme] = useState('')

  // const listRef = useRef<string[]>([])

  const initData = async () => {
    window.git.repos().then(res => {
      setData(res)
    })
  }

  /**
   *
   * @returns
   */
  const onAdd = async () => {
    const value = searchValue.trim()
    if (value === '') {
      notification('请输入仓库地址', 'warning')
      return
    }
    if (sub) {
      // 正在提交
      return
    }
    setSub(true)

    // const exists = data.some(existingItem => existingItem.path === searchValue)
    // if (exists) {
    //   notification('该仓库已存在', 'warning')
    //   setSub(false)
    //   return
    // }

    if (!isGitRepositoryFormat(value)) {
      notification('格式错误', 'warning')
      setSub(false)
      return
    }

    // 根据 url 解析成仓库地址
    const { username, repository, platform } = extractRepoInfo(value)

    if (data.find(name => name === repository)) {
      notification('该仓库已存在', 'warning')
      setSub(false)
      return
    }

    notification('正在添加仓库..')

    await window.git.clone(value).then(res => {
      setData([...data, repository])
      notification('添加成功')
    })

    setSub(false)
  }

  /**
   *
   */
  const onFetch = async (item: string) => {
    if (sub) {
      // 正在提交
      notification('操作锁定中，请稍等', 'warning')
      return
    }
    setSub(true)

    notification('开始拉取最新数据..')

    await window.git.fetch(item).then(res => {
      console.log(res)
      // const db = data.filter(v => v !== item)
      // setData(db)
      // notification('删除成功')
    })

    setSub(false)
  }

  /**
   *
   * @param item
   * @returns
   */
  const onDelete = async (item: string) => {
    if (sub) {
      // 正在提交
      notification('操作锁定中，请稍等', 'warning')
      return
    }
    setSub(true)

    notification('正在删除仓库..')

    await window.git.delete(item).then(() => {
      const db = data.filter(v => v !== item)
      setData(db)
      notification('删除成功')
    })

    setSub(false)
  }

  useEffect(() => {
    if (readme == '') {
      setSelect('')
    } else {
      setSelect('info')
    }
  }, [readme])

  const onShow = (item: { name: string; hash: string }) => {
    window.git.show(item.name, item.hash).then((res: any) => {
      setReadme(res)
    })
  }

  const [selectValue, setSelectValue] = useState('')

  useEffect(() => {
    initData()
  }, [])

  useEffect(() => {
    window.git.getWordSbaces().then(value => {
      setSelectValue(value)
    })
  }, [])

  return (
    <section className=" flex flex-row flex-1 h-full shadow-md">
      <SecondaryDiv className="animate__animated animate__fadeIn flex flex-col flex-1">
        {select == '' && <Init />}
        {select === 'info' && (
          <div className="select-text">
            <div className="overflow-auto scrollbar h-[calc(100vh-3rem)] max-w-[calc(100vw-21.5rem)]">
              <Markdown source={readme} />
            </div>
          </div>
        )}
      </SecondaryDiv>
      <SidebarDiv className="animate__animated animate__fadeInRight duration-500 flex flex-col  w-72 xl:w-80 border-l h-full">
        <div className="flex justify-between px-2 py-1">
          <div className=" cursor-pointer" onClick={() => setSelect('')}>
            仓库列表
          </div>
          <div className="text-[0.7rem] flex gap-2 items-center justify-center ">
            <Select
              className="rounded-md"
              onChange={(e: any) => {
                const value = e.target.value
                window.git.setWordSbaces(value).then(() => {
                  initData()
                })
              }}
            >
              {['packages', 'plugins'].map((item, index) => {
                if (item == selectValue) {
                  return (
                    <option key={index} value={item} selected>
                      {item}
                    </option>
                  )
                }
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                )
              })}
            </Select>
          </div>
        </div>
        <div className="flex items-center">
          <Input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="https://xxx.git或git@xxx.git"
            className="w-full px-2 py-1 rounded-sm"
          />
          <Tooltip text="安装仓库">
            <div className="px-2" onClick={onAdd}>
              <FolderAddOutlined />
            </div>
          </Tooltip>
        </div>
        <div className="flex-1 ">
          <SecondaryDiv className="flex flex-col gap-1  border-t py-2  overflow-auto  h-[calc(100vh-5.9rem)]">
            <Info data={data} onDelete={onDelete} onShow={onShow} onFetch={onFetch} />
          </SecondaryDiv>
        </div>
      </SidebarDiv>
    </section>
  )
}
