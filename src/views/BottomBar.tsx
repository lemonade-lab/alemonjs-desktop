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
    <footer className="flex justify-center items-center py-2 bg-[var(--secondary-bg-front)]">
      <div className="px-2 py-1 bg-white text-[var(--secondary-bg)] rounded-full flex gap-4">
        {data.map((item, index) => (
          <span
            key={index}
            className={classNames(
              'w-10 h-10 rounded-full flex items-center justify-center cursor-pointer',
              item.path == active
                ? ' bg-[var(--secondary-bg)] text-white'
                : ' text-[var(--secondary-bg)]'
            )}
            onClick={() => onClickIcon(item.path)}
          >
            {item.Icon}
          </span>
        ))}
      </div>
    </footer>
  )
}
