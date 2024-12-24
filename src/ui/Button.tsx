import React from 'react'
export const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button className="bg-[#67c23a] text-white px-4 py-2 rounded-lg shadow-lg" {...props} />
}
