import { ArrowsDownIcon, CirclePlusIcon } from '@src/pages/Icons'
import { useState } from 'react'

// 定义树形数据结构
type TreeDataType = {
  id: string
  name: string
  children?: TreeDataType[]
  isExpanded?: boolean
}

export default () => {
  // 初始化树形数据
  const [treeData, setTreeData] = useState<TreeDataType[]>([
    {
      id: '1',
      name: '一级预留位置',
      isExpanded: true,
      children: [
        {
          id: '1-1',
          name: '二级预留位置',
          isExpanded: false,
          children: [
            {
              id: '1-1-1',
              name: '三级预留位置',
              isExpanded: true,
              children: []
            }
          ]
        },
        {
          id: '1-2',
          name: '二级预留位置',
          isExpanded: true,
          children: [
            {
              id: '1-2-1',
              name: '三级预留位置',
              isExpanded: false,
              children: []
            }
          ]
        }
      ]
    }
  ])

  // 添加节点的处理函数
  const handleAddNode = (
    id: string,
    children: TreeDataType[],
    item: TreeDataType = {} as TreeDataType
  ) => {
    children.push({
      id: `${[id, children.length + 1].filter(Boolean).join('-')}`,
      name: `预留位置-${children.length + 1}`,
      children: []
    })

    item.isExpanded = true

    setTreeData([...treeData])
  }

  // 节点名称更改的处理函数
  const handleNodeNameChange = (id: string, item: TreeDataType) => {
    // const newName = simulateUserInput(data.find(item => item.id === id)?.name)
    setTreeData([...treeData])
  }

  // 切换节点展开状态的处理函数
  const handleToggleExpand = (id: string, item: TreeDataType) => {
    item.isExpanded = !item.isExpanded
    setTreeData([...treeData])
  }

  // 渲染树形结构的函数
  const renderTree = (data: any[]) => {
    return data.map(item => (
      <div
        key={item.id}
        className={`overflow-hidden mt-3 ${item.id.split('-').length > 1 ? 'ml-4' : ''}`}
      >
        <div className={`flex items-center gap-2}`}>
          {Array.isArray(item.children) && item.children.length > 0 && (
            <span
              className={`text-[--font-primary] cursor-pointer ${item.isExpanded ? '' : 'rotate-[-90deg]'} transition-all duration-300`}
              onClick={() => handleToggleExpand(item.id, item)}
            >
              <ArrowsDownIcon
                width="12"
                height="12"
                color={item.isExpanded ? 'var(--primary-color)' : '#575B66'}
              />
            </span>
          )}

          {/* 节点名称 */}
          <span
            className={`ml-3 ${item.isExpanded ? 'text-[--primary-color]' : ''}`}
            onDoubleClick={() => handleNodeNameChange(item.id, item)}
          >
            {item.name}
          </span>

          {/* 添加子节点 */}
          {/* {item.id.split('-').length < 3 && (
            <span
              className="ml-auto cursor-pointer"
              onClick={() => handleAddNode(item.id, item.children, item)}
            >
              <CirclePlusIcon width="20" height="20" color="#B2B2B2" />
            </span>
          )} */}
        </div>

        {Array.isArray(item.children) && item.children.length > 0 && (
          <div
            className="overflow-hidden grid"
            style={{
              transition: 'all 0.5s ease-in-out',
              gridTemplateRows: item.isExpanded ? '1fr' : '0fr'
            }}
          >
            <div className="overflow-hidden">{renderTree(item.children)}</div>
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="col-span-1 p-6 px-4 box-card flex flex-col gap-2">
      <div className="card-title flex justify-between items-center">
        <span>配置树</span>
        <span
          className="cursor-pointer hover:text-[--primary-color] text-[#B2B2B2]"
          onClick={() => handleAddNode('', treeData)}
        >
          <CirclePlusIcon width="20" height="20" />
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">{renderTree(treeData)}</div>
    </div>
  )
}
