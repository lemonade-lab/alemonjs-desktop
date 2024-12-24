import { useState } from 'react'

export default () => {
  const [records, setRecords] = useState<{ text: string }[]>([
    ...[
      '[AJS][2024-11-1] 修仙机器人启动',
      '[AJS][2024-11-1] gui server start at port 9603',
      '[AJS][2024-11-1] 数据库连接成功.',
      '[AJS][2024-11-1] 数据表同步完成.',
      '[AJS][2024-11-1] 数据载入完成.',
      '[AJS][2024-11-1] method post /user/login',
      '[AJS][2024-11-1] Server is running on http://localhost:8787',
      '[AJS][2024-11-1] Server is running on http://localhost:8787',
      '[AJS][2024-11-1] Server is running on http://localhost:8787',
      '[AJS][2024-11-1] Server is running on http://localhost:8787',
      '[AJS][2024-11-1] Server is running on http://localhost:8787'
    ].map(text => ({ text }))
  ])

  return (
    <div className="flex-1  bg-[#ffffff6b] shadow-content   p-2  rounded-3xl ">
      <div className="flex text-[--primary-color]">
        <div className="w-28">HEADER</div>
        <div className="flex gap-1 flex-row flex-1">
          <span className="cursor-pointer hover:underline">启动</span>
          <span className="cursor-pointer hover:underline">停止</span>
          <span className="cursor-pointer hover:underline">重启</span>
        </div>
      </div>
      <div className="vertical-line my-1" />
      <div className="col-span-2 flex flex-col gap-2 overflow-auto max-h-80 ">
        {records.map((record, index) => (
          <span key={index}>{record.text}</span>
        ))}
      </div>
    </div>
  )
}
