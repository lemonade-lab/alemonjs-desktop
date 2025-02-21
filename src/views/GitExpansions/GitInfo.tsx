import { Close } from '@src/component/Icons'
import { Collapse } from '@src/component/Collapse'
import { Tabs } from '@src/component/Tabs'
import { PropsWithChildren, useEffect, useState } from 'react'
import { PrimaryDiv } from '@src/component/PrimaryDiv'
import dayjs from 'dayjs'
import {
  ApartmentOutlined,
  BookOutlined,
  BranchesOutlined,
  CalendarOutlined,
  TagOutlined,
  TagsOutlined
} from '@ant-design/icons'
import { Tooltip } from '@src/component/Tooltip'

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
    // 获取 branches

    console.log('GitBranchesLogs mounted', branch)

    window.git.log(name, branch).then((data: any) => {
      console.log('纪录', data)
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
          onClick={() =>
            onShow &&
            onShow({
              name,
              hash: item.hash
            })
          }
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
}

/**
 *
 * @param param0
 * @returns
 */
const GitBranches = ({
  name,
  onShow
}: {
  name: string
  onShow: (item: { name: string; hash: string }) => void
}) => {
  const [data, setData] = useState<GitBranchesData[]>([])
  useEffect(() => {
    window.git.branch(name).then((data: any) => {
      setData(
        data.all.map((item: any) => {
          return {
            key: item,
            branch: item
          }
        })
      )
    })
  }, [name])
  return (
    <div className="py-2">
      {/* {data.length === 0 && (
        <div className="flex justify-center text-sm text-gray-500">暂无数据</div>
      )} */}
      <Collapse
        items={data.map(item => {
          return {
            key: item.key,
            label: (
              <PrimaryDiv hover={true} className="cursor-pointer px-1">
                <BranchesOutlined /> {item.branch}
              </PrimaryDiv>
            ),
            children: <GitBranchesLogs onShow={onShow} name={name} branch={item.branch} />
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
  onDelete
}: {
  onDelete: (e: React.MouseEvent) => void
} & PropsWithChildren) => {
  return (
    <div className="flex  justify-between items-center cursor-pointer">
      <div className="flex gap-2">{children}</div>
      <Tooltip text="删除仓库">
        <div
          className=""
          onClick={e => {
            e.stopPropagation()
            onDelete(e)
          }}
        >
          <Close></Close>
        </div>
      </Tooltip>
    </div>
  )
}

export default function GitInfo({
  data,
  onDelete,
  onShow
}: {
  data: string[]
  onDelete: (item: string) => void
  onShow: (item: { name: string; hash: string }) => void
}) {
  const onClickDelete = (item: string) => {
    onDelete(item)
  }
  return (
    <Collapse
      items={data.map((item, index) => ({
        key: index,
        label: (
          <PrimaryDiv hover={true} className="px-1 rounded-sm">
            <Title key={index} onDelete={e => onClickDelete(item)}>
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
                children: <GitBranches name={item} onShow={onShow} />
              },
              {
                key: '2',
                label: (
                  <div className="flex gap-2">
                    <TagOutlined /> <div>tags</div>
                  </div>
                ),
                children: <GitTags name={item} onShow={onShow} />
              }
            ]}
          />
        )
      }))}
    />
  )
}
