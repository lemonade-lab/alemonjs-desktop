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
    <section className="flex flex-1 flex-col bg-[var(--primary-bg-front)] shadow-content rounded-md">
      <div className="flex-1 flex">
        {/* 根据选中的标签渲染相应的内容 */}
        <div className="flex-1 flex flex-col">
          {activeTab === '通用' && <Common />}
          {activeTab === '关于' && <About />}
        </div>
        <Tab
          items={['通用', '关于']} // 传递标签项
          activeTab={activeTab}
          onTabChange={handleTabChange} // 传递回调函数
        />
      </div>
    </section>
  )
}

export default SettingApp
