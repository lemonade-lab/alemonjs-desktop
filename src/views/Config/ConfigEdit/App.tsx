import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
//
import { showNotification } from '@src/store/notificationSlice'
import { RootState } from '@src/store/index'
//
import { CirclePlusIcon } from '@src/common/Icons'
import Notification from '@src/common/Notification'
//
import ContextMenu from '@src/views/Home/ContextMenu'
import { TreeDataType, TreeItem } from '@src/views/Config/ConfigEdit/TreeItem'

import YAML from 'js-yaml'

const getTreeData = (yamlString: string): TreeDataType[] => {
  const result = YAML.load(yamlString) as { [key: string]: any }
  let id = 0
  const traverse = (node: any): TreeDataType[] => {
    const data: TreeDataType[] = [] // 每次递归调用时创建新的数组
    for (const key in node) {
      const newId = `${key}-${id++}` // 生成唯一ID
      const newNode: TreeDataType = {
        id: newId,
        name: key,
        isExpanded: false,
        children: []
      }
      // 如果当前节点是对象，则继续遍历其子节点
      if (typeof node[key] === 'object' && node[key] !== null) {
        newNode.children = traverse(node[key]) // 递归调用并赋值
      }
      data.push(newNode) // 将新节点添加到当前数组
    }
    return data // 返回当前节点的数组
  }
  const treeData = traverse(result) // 开始遍历
  console.log('data', treeData) // 输出最终的树数据
  return treeData // 返回最终的树结构
}
/**
 *
 * @returns
 */
export default function ConfigTree() {
  const navigate = useNavigate()

  const [treeData, setTreeData] = useState<TreeDataType[]>([])
  useEffect(() => {
    window.app.botConfigRead().then(data => {
      setTreeData(getTreeData(data))
    })
  }, [])

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

  return (
    <div className="col-span-1  px-4 box-card flex flex-col gap-2 relative bg-[#ffffff6b] rounded-xl shadow-content p-2">
      <div className="card-title flex justify-between items-center">
        <div className="text-xl">配置树</div>
        <div className="flex gap-2 justify-center items-center">
          <div
            className="  cursor-pointer "
            onClick={() => {
              navigate('/config-code')
            }}
          >
            Code
          </div>
          <div>
            <span
              className="cursor-pointer hover:text-[--primary-color] text-[#B2B2B2]"
              onClick={handleAddNode}
            >
              <CirclePlusIcon width="20" height="20" />
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {treeData.map(item => (
          <TreeItem
            key={item.id}
            item={item}
            handleContextMenu={handleContextMenu}
            handleToggleExpand={handleToggleExpand}
            handleNodeNameChange={handleNodeNameChange}
          />
        ))}
      </div>

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
