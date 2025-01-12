export default function WordBox() {
  return (
    <div className="flex-1 flex justify-between items-center">
      <div className="drag-area flex-1"></div>
      <div className="w-72 text-sm text-slate-400 hover:bg-slate-10 cursor-pointer border flex justify-center items-center border-slate-400 h-5 rounded-md bg-[var(--primary-bg-front)]">
        input command
      </div>
      <div className="drag-area flex-1"></div>
    </div>
  )
}
