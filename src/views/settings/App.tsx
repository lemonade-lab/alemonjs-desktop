// SettingApp.tsx
import React, { useState } from 'react'
import Tab from './Tab' // 导入 Tab 组件
import Common from './Common' // 导入 Common 组件
import About from './About'

const SettingApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('通用') // 默认选中的标签

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <main className="flex-1 flex flex-col px-4 bg-[var(--secondary-bg-front)]">
      <section className="h-full flex flex-col bg-[var(--primary-bg-front)] shadow-content rounded-xl">
        <section className="flex-1 flex">
          <Tab
            items={['通用', '关于']} // 传递标签项
            activeTab={activeTab}
            onTabChange={handleTabChange} // 传递回调函数
          />
          {/* 根据选中的标签渲染相应的内容 */}
          <div className="flex-1 flex flex-col">
            {activeTab === '通用' && <Common />}
            {activeTab === '关于' && <About />}
          </div>
        </section>
      </section>
    </main>
  )
}

export default SettingApp
