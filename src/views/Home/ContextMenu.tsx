import { useEffect } from 'react'

type MenuItem = {
  label: string
  onClick: () => void
}

export default function ContextMenu({
  items,
  position,
  visible,
  onClose
}: {
  items: MenuItem[]
  position: { x: number; y: number }
  visible: boolean
  onClose: () => void
}) {
  if (!visible) return null
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (!document.querySelector('.context-menu')?.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [onClose])
  return (
    <div
      className="context-menu absolute bg-white  border-gray-300 rounded shadow-lg"
      style={{ top: position.y, left: position.x }}
      onMouseLeave={onClose} // 鼠标离开时隐藏菜单
    >
      <ul className="p-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-gray-200"
            onClick={() => {
              item.onClick()
              onClose() // 点击后隐藏菜单
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
