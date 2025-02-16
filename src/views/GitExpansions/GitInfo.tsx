import { Close } from '@src/ui/Icons'
import { Collapse } from '../../ui/Collapse'
import { Tabs } from '../../ui/Tabs'
import { PropsWithChildren, useEffect, useState } from 'react'
import { PrimaryDiv } from '@src/ui/PrimaryDiv'

type GitBranchesLogsData = {
  key: string
  label: string
  data: string
}

/**
 *
 * @param param0
 * @returns
 */
const GitBranchesLogs = ({ url, branch }: { url: string; branch: string }) => {
  const [data, setData] = useState<GitBranchesLogsData[]>([])
  useEffect(() => {
    // 获取 branches
  }, [url, branch])
  return (
    <div className="flex flex-col py-2 rounded-md">
      {data.length === 0 && (
        <div className="flex justify-center text-sm text-gray-500">暂无数据</div>
      )}
      {data.map(item => (
        <PrimaryDiv
          key={item.key}
          hover={true}
          className="text-sm flex  justify-between cursor-pointer"
        >
          <div className="px-4">{item.label}</div>
          <div className="">{item.data}</div>
        </PrimaryDiv>
      ))}
    </div>
  )
}

type GitBranchesData = {
  key: string
  url: string
  branch: string
}

/**
 *
 * @param param0
 * @returns
 */
const GitBranches = ({ url }: { url: string }) => {
  const [data, setData] = useState<GitBranchesData[]>([])
  useEffect(() => {
    //
  }, [url])
  return (
    <div className="py-2">
      {data.length === 0 && (
        <div className="flex justify-center text-sm text-gray-500">暂无数据</div>
      )}
      <Collapse
        items={data.map(item => {
          return {
            key: item.key,
            label: (
              <PrimaryDiv hover={true} className=" cursor-pointer px-1">
                {item.branch}
              </PrimaryDiv>
            ),
            children: <GitBranchesLogs url={item.url} branch={item.branch} />
          }
        })}
      />
    </div>
  )
}

type GitTagsData = {
  key: string
  label: string
  data: string
}

const GitTags = ({ url }: { url: string }) => {
  const [data, setData] = useState<GitTagsData[]>([])
  useEffect(() => {
    // 获取 tags
  }, [url])
  return (
    <div className="flex flex-col py-2">
      {data.length === 0 && (
        <div className="flex justify-center text-sm text-gray-500">暂无数据</div>
      )}
      {data.map(item => (
        <PrimaryDiv
          hover={true}
          key={item.key}
          className="flex items-center text-sm justify-between px-1 cursor-pointer"
        >
          <div className="">{item.label}</div>
          <div className="">{item.data}</div>
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
    <div className="flex justify-between items-center cursor-pointer">
      <div>{children}</div>
      <div
        className=""
        onClick={e => {
          e.stopPropagation()
          onDelete(e)
        }}
      >
        <Close></Close>
      </div>
    </div>
  )
}

export type GitInfoProps = {
  name: string
  path: string
  username: string
  repository: string
  platform: string
}

export default function GitInfo({
  data,
  onDelete
}: {
  data: GitInfoProps[]
  onDelete: (item: GitInfoProps) => void
}) {
  useEffect(() => {
    console.log('GitList mounted')
    // 本地存储，维护一个列表。
    return () => {
      console.log('GitList unmounted')
    }
  }, [])

  const onClickDelete = (item: GitInfoProps) => {
    onDelete(item)
  }

  return (
    <Collapse
      items={data.map(item => ({
        key: item.name,
        label: (
          <PrimaryDiv hover={true} className="px-1 rounded-sm">
            <Title key={item.name} onDelete={e => onClickDelete(item)}>
              {item.name}
            </Title>
          </PrimaryDiv>
        ),
        children: (
          <Tabs
            key={item.name}
            items={[
              {
                key: '1',
                label: 'Tags',
                children: <GitTags url={item.path} />
              },
              {
                key: '2',
                label: 'Branches',
                children: <GitBranches url={item.path} />
              }
            ]}
          />
        )
      }))}
    />
  )
}
