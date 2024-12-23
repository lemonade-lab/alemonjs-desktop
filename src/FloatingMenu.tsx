type FloatingMenuProps = {
  list: {
    title: string
    onClick?: React.MouseEventHandler<HTMLDivElement>
  }[]
}
export default ({ list }: FloatingMenuProps) => {
  return (
    <div className=" absolute right-0 px-2 py-1  top-12 bg-slate-400  rounded-l-md">
      {list.map((item, index) => (
        <div
          key={index}
          className=" hover:bg-gray-50 hover:bg-opacity-20 flex  items-center rounded-md cursor-pointer "
          onClick={item.onClick}
        >
          <div className="text-white px-2">{item.title}</div>
        </div>
      ))}
    </div>
  )
}
