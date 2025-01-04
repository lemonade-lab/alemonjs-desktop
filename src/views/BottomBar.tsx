import classNames from 'classnames'
export const BottomBar = ({
  data,
  onClickIcon,
  active
}: {
  data: { Icon: any; path: string }[]
  onClickIcon: (path: string) => void
  active: string
}) => {
  return (
    <section className="grid grid-cols-3 items-center py-2">
      <div className="col-span-1 flex items-center">
        {/* {activeIndex === '/config' && <Tool />} */}
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <div className="px-2 py-1 bg-white text-[#de853c] rounded-full flex gap-4">
          {data.map((item, index) => (
            <span
              key={index}
              className={classNames(
                'w-10 h-10 rounded-full flex items-center justify-center cursor-pointer',
                item.path == active ? ' bg-[#de853c] text-white' : ' text-[#de853c]'
              )}
              onClick={() => onClickIcon(item.path)}
            >
              {item.Icon}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 row-span-1"></div>
    </section>
  )
}
