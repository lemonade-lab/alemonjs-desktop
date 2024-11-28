import { ArrowsDownIcon, CirclePlusIcon } from '@src/pages/Icons'
import { useState, useEffect, useRef } from 'react'
import ContextMenu from './ContextMenu'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '@src/store/notificationSlice' // 导入显示通知的 action
import { RootState } from '@src/store/index' // Import the RootState type
import Notification from '@src/common/Notification' // 导入 Notification 组件

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
              isExpanded: false,
              children: [
                {
                  id: '1-1-1-1',
                  name: '四级预留位置',
                  isExpanded: false,
                  children: []
                }
              ]
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

  const [menuVisible, setMenuVisible] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const [currentItem, setCurrentItem] = useState<TreeDataType | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const notification = useSelector((state: RootState) => state.notification)

  // 右键菜单的处理函数
  const handleContextMenu = (e: React.MouseEvent, item: TreeDataType) => {
    e.stopPropagation()
    e.preventDefault()
    setCurrentItem(item)
    const menuX = e.nativeEvent.layerX + 10
    const menuY = e.nativeEvent.layerY
    setMenuPosition({ x: menuX, y: menuY })
    setMenuVisible(true)
  }

  // 隐藏菜单
  const hideMenu = () => {
    setMenuVisible(false)
    setCurrentItem(null)
  }

  // 点击菜单外部时隐藏菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        hideMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // 添加节点的处理函数
  const handleAddNode = () => {
    if (currentItem) {
      const children = currentItem.children || []
      children.push({
        id: `${currentItem.id}-${children.length + 1}`,
        name: `预留位置-${children.length + 1}`,
        children: []
      })
      currentItem.isExpanded = true
      setTreeData([...treeData])
    } else {
      const newRootNode: TreeDataType = {
        id: `${treeData.length + 1}`,
        name: `根节点-${treeData.length + 1}`,
        children: []
      }
      setTreeData([...treeData, newRootNode])
    }
    hideMenu()
  }

  // 删除节点的处理函数
  const handleDeleteNode = () => {
    if (currentItem) {
      const deleteNode = (nodes: TreeDataType[], id: string): TreeDataType[] => {
        return nodes.reduce((acc: TreeDataType[], node: TreeDataType) => {
          if (node.id === id) {
            return acc // 不添加要删除的节点
          }
          if (node.children) {
            node.children = deleteNode(node.children, id) // 递归删除
          }
          acc.push(node) // 添加其他节点
          return acc
        }, [])
      }

      const newTreeData = deleteNode(treeData, currentItem.id)
      setTreeData(newTreeData)
      dispatch(showNotification('节点删除成功！')) // 显示通知
      hideMenu()
    }
  }

  // 修改节点的处理函数
  const handleEditNode = () => {
    if (currentItem) {
      const newName = prompt('请输入新的节点名称', currentItem.name)
      if (newName) {
        currentItem.name = newName
        setTreeData([...treeData])
        hideMenu()
      }
    }
  }

  // 节点名称更改的处理函数
  const handleNodeNameChange = (id: string, item: TreeDataType) => {
    // const newName = simulateUserInput(data.find(item => item.id === id)?.name)
    setTreeData([...treeData])
  }

  // 切换节点展开状态的处理函数
  const handleToggleExpand = (id: string, item: TreeDataType) => {
    // 隐藏所有子节点
    const collapseExpand = (item: TreeDataType) => {
      item.isExpanded && (item.isExpanded = !item.isExpanded)
      if (!item.isExpanded && item.children?.length) {
        item.children.forEach(collapseExpand)
      }
    }

    item.isExpanded ? collapseExpand(item) : (item.isExpanded = !item.isExpanded)
    setTreeData([...treeData])
  }

  // 渲染树形结构的函数
  const renderTree = (data: any[]) => {
    return data.map(item => (
      <div
        key={item.id}
        className={`overflow-hidden mt-3 ${item.id.split('-').length > 1 ? 'ml-4' : ''}`}
        onContextMenu={e => handleContextMenu(e, item)}
      >
        <div className={`flex items-center gap-2}`}>
          {/* 左侧图标 */}
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
    <div className="col-span-1 p-6 px-4 box-card flex flex-col gap-2 relative">
      <div className="card-title flex justify-between items-center">
        <span>配置树</span>
        <span
          className="cursor-pointer hover:text-[--primary-color] text-[#B2B2B2]"
          onClick={handleAddNode}
        >
          <CirclePlusIcon width="20" height="20" />
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">{renderTree(treeData)}</div>

      {/* 自定义右键菜单 */}
      <ContextMenu
        items={[
          { label: '添加节点', onClick: handleAddNode },
          { label: '修改节点', onClick: handleEditNode },
          { label: '删除节点', onClick: handleDeleteNode }
        ]}
        position={menuPosition}
        visible={menuVisible}
        onClose={hideMenu}
      />

      {/* 通知组件 */}
      <Notification
        message={notification.message}
        visible={notification.visible}
        onClose={() => dispatch(showNotification(''))}
      />
    </div>
  )
}
