import { useState } from 'react'

export default () => {
  const [records, setRecords] = useState<{ text: string }[]>([
    ...[
      'onfig.yaml',
      '修仙机器人启动',
      'gui server start at port 9603',
      '数据库连接成功.',
      '数据表同步完成.',
      '数据载入完成.',
      'method post /user/login',
      'Server is running on http://localhost:8787'
    ].map(text => ({ text }))
  ])

  return (
    <>
      <h3 className="card-title">控制板</h3>
      <div className="flex-1 control-container_body text-[--primary-color]">
        <div className="control-text grid grid-cols-3 text-sm">
          <div className="col-span-1">HEADER</div>
          <div className="col-span-2">
            <span className="cursor-pointer hover:underline">启动</span>
            <span>、</span>
            <span className="cursor-pointer hover:underline">停止</span>
            <span>、</span>
            <span className="cursor-pointer hover:underline">重启</span>
          </div>
        </div>

        {/* 控制台记录 */}
        <div className="control-description grid grid-cols-3 text-sm mt-4">
          <div className="col-span-1">BODY</div>
          <div className="col-span-2 flex flex-col gap-2">
            <span>控制台记录</span>
            <span className="vertical-line"></span>
            {records.map((record, index) => (
              <span key={index}>{record.text}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
