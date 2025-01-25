import { ArrowsDown } from '@src/ui/Icons'

// 定义树形数据结构
export type TreeDataType = {
  id: string
  name: string
  children?: TreeDataType[]
  isExpanded?: boolean
}

/**
 *
 * @param param0
 * @returns
 */
export const TreeItem = ({
  item,
  handleContextMenu,
  handleToggleExpand,
  handleNodeNameChange
}: {
  item: TreeDataType
  handleContextMenu: (e: React.MouseEvent, item: TreeDataType) => void
  handleToggleExpand: (id: string, item: TreeDataType) => void
  handleNodeNameChange: (id: string, item: TreeDataType) => void
}) => {
  return (
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
            <ArrowsDown
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
          <div className="overflow-hidden">
            {item.children.map(item => (
              <TreeItem
                key={item.id}
                item={item}
                handleContextMenu={handleContextMenu}
                handleToggleExpand={handleToggleExpand}
                handleNodeNameChange={handleNodeNameChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
