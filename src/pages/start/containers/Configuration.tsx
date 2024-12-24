import { CircleArrowsDownIcon, CircleArrowsUpIcon, CirclePlusIcon } from '@src/pages/Icons'
// import EditConfirm from '@src/pages/components/EditConfirm'
// import { simulateUserInput } from '@src/pages/components/EditPrompt'
import { useState } from 'react'

// 定义树形数据结构
type TreeData = {
  id: string
  name: string
  children?: TreeData[]
  isExpanded?: boolean
}

export default () => {
  // 初始化树形数据
  const [treeData, setTreeData] = useState<TreeData[]>([
    {
      id: '1',
      name: '根节点-1',
      isExpanded: true,
      children: [
        {
          id: '1-1',
          name: '子节点-1',
          isExpanded: true,
          children: [
            { id: '1-1-1', name: '新节点-1' },
            { id: '1-1-2', name: '新节点-2' }
          ]
        },
        {
          id: '1-2',
          name: '子节点-2',
          children: [
            { id: '1-2-1', name: '新节点-3' },
            { id: '1-2-2', name: '新节点-4' }
          ]
        }
      ]
    }
  ])

  // 添加节点的处理函数
  const handleAddNode = (id: string, children: TreeData[], item: TreeData = {} as TreeData) => {
    children.push({
      id: `${[id, children.length + 1].filter(Boolean).join('-')}`,
      name: `新节点-${children.length + 1}`,
      children: []
    })

    item.isExpanded = true

    setTreeData([...treeData])
  }

  // 节点名称更改的处理函数
  const handleNodeNameChange = (id: string, data: TreeData[]) => {
    // const newName = simulateUserInput(data.find(item => item.id === id)?.name)
    setTreeData([...treeData])
  }

  // 切换节点展开状态的处理函数
  const handleToggleExpand = (id: string, item: TreeData) => {
    item.isExpanded = !item.isExpanded
    setTreeData([...treeData])
  }

  /**
   * 渲染树形结构的函数
   * @param data
   * @returns
   */
  const renderTree = (data: any[]) => {
    return data.map(item => (
      <div
        key={item.id}
        className={`overflow-hidden ${['mb-3', 'mb-2', 'mb-1'][item.id.split('-').length - 1]}`}
      >
        <div
          className={`flex items-center gap-2 ${['tree-node p-3 py-2', 'tree-node-children p-3 py-2', 'tree-node-grandchildren pr-3'][item.id.split('-').length - 1]}`}
        >
          {Array.isArray(item.children) && item.children.length > 0 && (
            <span
              className="text-[#B2B2B2] cursor-pointer"
              onClick={() => handleToggleExpand(item.id, item)}
            >
              {item.isExpanded ? (
                <CircleArrowsDownIcon width="16" height="16" color="#575B66" />
              ) : (
                <CircleArrowsUpIcon width="16" height="16" color="#575B66" />
              )}
            </span>
          )}
          <span onDoubleClick={() => handleNodeNameChange(item.id, data)}>{item.name}</span>
          {/* 添加子节点 */}
          {item.id.split('-').length < 3 && (
            <span
              className="ml-auto cursor-pointer"
              onClick={() => handleAddNode(item.id, item.children, item)}
            >
              <CirclePlusIcon width="20" height="20" color="#B2B2B2" />
            </span>
          )}
        </div>
        {Array.isArray(item.children) && item.children.length > 0 && (
          <div
            className="overflow-hidden grid"
            style={{
              marginLeft: '12px',
              marginTop: '8px',
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
    <main className="flex-1 grid grid-cols-4 gap-4">
      <div className="col-span-1 px-4 box-card   shadow-content   flex flex-col gap-4 bg-[#ffffff6b] rounded-xl shadow-content p-2">
        <div className="card-title flex justify-between items-center">
          <span>配置树</span>
          <span className="cursor-pointer" onClick={() => handleAddNode('', treeData)}>
            <CirclePlusIcon width="20" height="20" color="#B2B2B2" />
          </span>
        </div>
        <div className="tree-card flex-1 overflow-y-auto">{renderTree(treeData)}</div>
      </div>
      <div className="col-span-3 p-6 px-8 box-card">
        <div className="card-title">预设标题</div>
        <div className="box-card-content flex-1 bg-[#f9f9f9]"></div>
      </div>
    </main>
  )
}
