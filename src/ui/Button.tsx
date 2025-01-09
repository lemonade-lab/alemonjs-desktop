import React from 'react'
export const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      className="bg-[var(--secondary-text)] text-white px-4 py-2 rounded-lg shadow-lg"
      {...props}
    />
  )
}
