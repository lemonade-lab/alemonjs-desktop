// Tab.tsx
import React from 'react'

interface TabProps {
  items: string[]
  activeTab: string
  onTabChange: (tab: string) => void
}

const Tab: React.FC<TabProps> = ({ items, activeTab, onTabChange }) => {
  return (
    <section className="w-28 h-full p-2 border-l">
      {items.map(item => (
        <div
          key={item}
          onClick={() => onTabChange(item)} // 点击标签时调用回调
          className={`px-2 py-1 text-sm rounded-md cursor-pointer ${
            activeTab === item ? 'bg-gray-100 font-semibold' : ''
          }`} // 条件样式
        >
          {item}
        </div>
      ))}
    </section>
  )
}

export default Tab
