import { Collapse } from '@alemonjs/react-ui'
import { Tabs } from '@alemonjs/react-ui'
import { PropsWithChildren, useEffect, useState } from 'react'
import { PrimaryDiv, Tooltip } from '@alemonjs/react-ui'
import { useNotification } from '@/context/Notification'
import dayjs from 'dayjs'
import {
  ApartmentOutlined,
  BookOutlined,
  BranchesOutlined,
  CalendarOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  TagOutlined,
  TagsOutlined,
  PullRequestOutlined,
  CloudDownloadOutlined,
  SmallDashOutlined,
  AlignCenterOutlined
} from '@ant-design/icons'

type GitBranchesLogsData = {
  key: string
  label: string
  data: string
  hash: string
}

/**
 *
 * @param param0
 * @returns
 */
const GitBranchesLogs = ({
  name,
  branch,
  onShow
}: {
  name: string
  branch: string
  onShow: (item: { name: string; hash: string }) => void
}) => {
  const [data, setData] = useState<GitBranchesLogsData[]>([])
  useEffect(() => {
    window.git.log(name, branch).then((data: any) => {
      console.log('log', data)
      setData(
        data.all.map((item: any) => {
          return {
            key: item.hash,
            hash: item.hash,
            label: item.message,
            data: dayjs(item.date).format('YYYY-MM-DD HH:mm:ss')
          }
        })
      )
    })

    //
  }, [name, branch])
  return (
    <div className="flex flex-col py-2 rounded-md  scrollbar overflow-auto h-[calc(100vh-80vh)]">
      {/* {data.length === 0 && (
        <div className="flex justify-center text-sm text-gray-500">暂无数据</div>
      )} */}
      {data.map(item => (
        <PrimaryDiv
          key={item.key}
          hover={true}
          onClick={e => {
            e.stopPropagation()
            onShow &&
              onShow({
                name,
                hash: item.hash
              })
          }}
          className="text-sm flex flex-col justify-between cursor-pointer"
        >
          <div className="px-4 flex gap-2">
            <CalendarOutlined />
            {item.label}
          </div>
          <div className="px-4">{item.data}</div>
        </PrimaryDiv>
      ))}
    </div>
  )
}

type GitBranchesData = {
  key: string
  branch: string
  current: boolean
  commit: string
  label: string
}

type BranchData = {
  commit: string
  current: boolean
  label: string
  linkedWorkTree: boolean
  name: string
}

/**
 *
 * @param param0
 * @returns
 */
const GitBranches = ({
  name,
  onShowCodeDiff,
  onShowReadme
}: {
  name: string
  onShowCodeDiff: (item: { name: string; hash: string }) => void
  onShowReadme: (item: { name: string; hash: string }) => void
}) => {
  const [data, setData] = useState<GitBranchesData[]>([])
  const notification = useNotification()

  const update = () => {
    window.git.branch(name).then(data => {
      console.log('branches1', data)
      const db = Object.values(data.branches)
      console.log('branches2', db)
      setData(
        db.map((item: any) => {
          return {
            key: item.name,
            branch: item.name,
            current: item.current,
            commit: item.commit,
            label: item.label
          }
        })
      )
    })
  }

  useEffect(() => {
    update()
  }, [name])

  const handleCheckout = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, branch: string) => {
    window.git
      .checkout(name, branch)
      .then(data => {
        update()
      })
      .catch(err => {
        notification('切换失败！', 'error')
      })
  }

  const handlePull = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    origin: string,
    branch: string
  ) => {
    window.git
      .pull(name, origin, branch)
      .then(res => {
        console.log('pull', res)
      })
      .catch(err => {
        notification('拉取失败！', 'error')
      })
  }

  return (
    <div className="py-2">
      {data.map(item => {
        return (
          <PrimaryDiv className="px-1 flex  justify-between">
            <div className="flex gap-1">
              <BranchesOutlined />
              <div>{item.branch}</div>
            </div>
            <div className="flex gap-1">
              <div>{item.current && '(current)'}</div>
              <div
                onClick={e => {
                  e.stopPropagation()
                  console.log('pull', item.branch)
                  // 切割
                  // const names = item.branch.split('/')
                  // const [remotes, origin, branch] = names
                  handlePull(e, '', item.branch)
                }}
              >
                <Tooltip text="拉取最新">
                  <CloudDownloadOutlined />
                </Tooltip>
              </div>
              <div
                onClick={e => {
                  e.stopPropagation()
                  handleCheckout(e, item.branch)
                }}
              >
                <Tooltip text="切换到此分支">
                  <PullRequestOutlined />
                </Tooltip>
              </div>
            </div>
          </PrimaryDiv>
        )
      })}

      <Collapse
        items={[
          {
            key: '0',
            branch: 'master'
          }
        ].map(item => {
          return {
            key: item.key,
            label: (
              <PrimaryDiv
                hover={true}
                className="cursor-pointer px-1 text-opacity-60  gap-2 items-center  justify-center flex  "
              >
                <AlignCenterOutlined /> log-list
              </PrimaryDiv>
            ),
            children: <GitBranchesLogs onShow={onShowReadme} name={name} branch={item.branch} />
          }
        })}
      />
    </div>
  )
}

type GitTagsData = {
  key: string
  label: string
  // date: string
  hash: string
}

const GitTags = ({
  name,
  onShow
}: {
  name: string
  onShow: (item: { name: string; hash: string }) => void
}) => {
  const [data, setData] = useState<GitTagsData[]>([])
  useEffect(() => {
    window.git.tags(name).then((data: any) => {
      console.log('tags', data)
      setData(
        data.all.map((item: any) => {
          return {
            key: item,
            label: item,
            hash: item
            // date: ''
          }
        })
      )
    })
  }, [name])
  return (
    <div className="flex flex-col py-2 scrollbar overflow-auto h-[calc(100vh-80vh)]">
      {/* {data.length === 0 && (
        <div className="flex justify-center text-sm text-gray-500">暂无数据</div>
      )} */}
      {data.map(item => (
        <PrimaryDiv
          hover={true}
          key={item.key}
          onClick={() => {
            onShow &&
              onShow({
                name,
                hash: item.hash
              })
          }}
          className="flex items-center text-sm justify-between px-1 cursor-pointer "
        >
          <div className="flex gap-2">
            <BookOutlined />
            {item.label}
          </div>
          {/* <div className="">{item.date}</div> */}
        </PrimaryDiv>
      ))}
    </div>
  )
}

const Title = ({
  children,
  onDelete,
  onFetch
}: {
  onFetch: (e: React.MouseEvent) => void
  onDelete: (e: React.MouseEvent) => void
} & PropsWithChildren) => {
  return (
    <div className="flex justify-between items-center cursor-pointer px-2">
      <div className="flex gap-2">{children}</div>
      <div className="flex gap-4">
        <Tooltip text="同步远程仓库">
          <div
            className=""
            onClick={e => {
              e.stopPropagation()
              onFetch && onFetch(e)
            }}
          >
            <SyncOutlined />
          </div>
        </Tooltip>
        <Tooltip text="删除仓库">
          <div
            className=""
            onClick={e => {
              e.stopPropagation()
              onDelete && onDelete(e)
            }}
          >
            <CloseCircleOutlined />
          </div>
        </Tooltip>
      </div>
    </div>
  )
}

export default function GitInfo({
  data,
  onDelete,
  onFetch,
  onShowReadme,
  onShowCodeDiff
}: {
  data: string[]
  onDelete: (item: string) => void
  onFetch: (item: string) => void
  onShowReadme: (item: { name: string; hash: string }) => void
  onShowCodeDiff: (item: { name: string; hash: string }) => void
}) {
  return (
    <Collapse
      items={data.map((item, index) => ({
        key: index,
        label: (
          <PrimaryDiv hover={true} className="px-1 rounded-sm">
            <Title key={index} onDelete={() => onDelete(item)} onFetch={() => onFetch(item)}>
              <ApartmentOutlined />
              {item}
            </Title>
          </PrimaryDiv>
        ),
        children: (
          <Tabs
            key={index}
            items={[
              {
                key: '1',
                label: (
                  <div className="flex gap-2">
                    <TagsOutlined /> <div>Branches</div>
                  </div>
                ),
                children: (
                  <GitBranches
                    name={item}
                    onShowCodeDiff={onShowCodeDiff}
                    onShowReadme={onShowReadme}
                  />
                )
              },
              {
                key: '2',
                label: (
                  <div className="flex gap-2">
                    <TagOutlined /> <div>tags</div>
                  </div>
                ),
                children: <GitTags name={item} onShow={onShowReadme} />
              }
            ]}
          />
        )
      }))}
    />
  )
}
