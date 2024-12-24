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
    <div className="flex-1 text-[--primary-color] border p-2 rounded-md">
      <div className="flex">
        <div className="w-20">HEADER</div>
        <div className="flex gap-2 flex-row flex-1">
          <span className="cursor-pointer hover:underline">启动</span>
          <span className="cursor-pointer hover:underline">停止</span>
          <span className="cursor-pointer hover:underline">重启</span>
        </div>
      </div>
      <div className="flex text-sm mt-4">
        <div className="w-20">BODY</div>
        <div className="col-span-2 flex flex-col gap-2">
          <span>控制台记录</span>
          <span className="vertical-line"></span>
          {records.map((record, index) => (
            <span key={index}>{record.text}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
