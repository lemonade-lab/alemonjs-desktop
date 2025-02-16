import { useEffect, useState } from 'react'
import { Init } from './Component'
import { SecondaryDiv } from '@src/ui/SecondaryDiv'
import { SidebarDiv } from '@src/ui/SidebarDiv'
import { Input } from '@src/ui/Input'
// import { Refresh } from '@src/ui/Icons'
import { FolderAddOutlined } from '@ant-design/icons'
import Info, { GitInfoProps } from './GitInfo'
import { RootState } from '@src/store'
import { useSelector } from 'react-redux'
import { useNotification } from '@src/context/Notification'
import { extractRepoInfo, isGitRepositoryFormat } from '@src/api'

export default function Expansions() {
  const app = useSelector((state: RootState) => state.app)
  const [select, setSelect] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const { notification } = useNotification()
  const name = '/.gitdata.json'
  const [data, setData] = useState<GitInfoProps[]>([])
  const [sub, setSub] = useState(false)

  /**
   *
   */
  const initData = async () => {
    if (!(await window.app.exists(app.userDataTemplatePath + name))) {
      await window.app.writeFiles(app.userDataTemplatePath + name, JSON.stringify([]))
    }
    const data = await window.app.readFiles(app.userDataTemplatePath + name)
    try {
      const json = JSON.parse(data)
      if (!Array.isArray(json)) {
        await window.app.writeFiles(app.userDataTemplatePath + name, JSON.stringify([]))
      } else {
        setData(json)
      }
    } catch (e) {
      console.log(e)
    }
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

    const exists = data.some(existingItem => existingItem.path === searchValue)
    if (exists) {
      notification('该仓库已存在', 'warning')
      setSub(false)
      return
    }

    if (!isGitRepositoryFormat(value)) {
      notification('格式错误', 'warning')
      setSub(false)
      return
    }

    // 根据 url 解析成仓库地址
    const { username, repository, platform } = extractRepoInfo(value)
    const url = `https://${platform}/${username}/${repository}`

    try {
      const res = await window.app.fetch(url, { method: 'HEAD', mode: 'no-cors' })
      if (!res.ok) {
        notification('该远程仓库不存在', 'warning')
        setSub(false)
        return
      }
    } catch (e) {
      notification('该远程仓库连接超时', 'warning')
      setSub(false)
      return
    }

    const item = {
      name: `${username}/${repository}`,
      path: value,
      username,
      repository,
      platform
    }

    const db = [...data, item]

    // 添加数据
    await window.app
      .writeFiles(app.userDataTemplatePath + name, JSON.stringify(db))
      .then(() => {
        setData(db)
        notification('添加成功')
      })
      .catch(() => {
        notification('添加失败', 'error')
      })

    setSub(false)
  }

  /**
   *
   * @param item
   * @returns
   */
  const onDelete = async (item: GitInfoProps) => {
    if (sub) {
      // 正在提交
      notification('操作锁定中，请稍等', 'warning')
      return
    }
    setSub(true)
    const db = data.filter(v => v.path !== item.path)
    await window.app
      .writeFiles(app.userDataTemplatePath + name, JSON.stringify(db))
      .then(() => {
        setData(db)
        notification('删除成功')
      })
      .catch(() => {
        notification('删除失败', 'error')
      })
    setSub(false)
  }

  useEffect(() => {
    initData()
  }, [])
  return (
    <section className=" flex flex-row flex-1 h-full shadow-md">
      <SecondaryDiv className="animate__animated animate__fadeIn flex flex-col flex-1">
        {select == '' && <Init />}
        {/* {select === 'info' && <Info />} */}
      </SecondaryDiv>
      <SidebarDiv className="animate__animated animate__fadeInRight duration-500 flex flex-col  w-72 xl:w-80 border-l h-full">
        <div className="flex justify-between px-2 py-1">
          <div className="text-xl">仓库列表</div>
          <div className="text-[0.7rem] flex gap-2 items-center justify-center "></div>
        </div>
        <div className="flex items-center">
          <Input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="https://xxx.git或git@xxx.git"
            className="w-full px-2 py-1 rounded-sm"
          />
          <div className="cursor-pointer px-2" onClick={onAdd}>
            <FolderAddOutlined />
          </div>
        </div>
        <div className="flex-1 ">
          <SecondaryDiv className="flex flex-col gap-1  border-t py-2 overflow-auto  h-[calc(100vh-5.9rem)]">
            <Info data={data} onDelete={onDelete} />
          </SecondaryDiv>
        </div>
      </SidebarDiv>
    </section>
  )
}
