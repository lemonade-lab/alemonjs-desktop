import classNames from 'classnames'
import { useState } from 'react'
export const Tabs = ({
  items
}: {
  items: {
    key: string
    label: string
    children: React.ReactNode
  }[]
}) => {
  const [activeTab, setActiveTab] = useState(items[0].key)

  return (
    <div>
      <div className="flex border-b">
        {items.map(item => (
          <button
            key={item.key}
            className={classNames(`px-2 py-1 border-b-2`, {
              'border-blue-500': activeTab === item.key
            })}
            onClick={() => setActiveTab(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="px-2 py-1">{items.find(item => item.key === activeTab)?.children}</div>
    </div>
  )
}
