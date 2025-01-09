import { SettingIcon } from '@src/common/Icons'
import { PetalIcon } from '@src/common/MenuIcons'

/**
 * @param param0
 * @returns
 */
export const Title = ({
  onClickTitle,
  onclickIcon
}: {
  onClickTitle: () => void
  onclickIcon: () => void
}) => {
  return (
    <nav className="flex px-4 justify-between items-center  bg-[var(--secondary-bg-front)]">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onClickTitle()}>
        <PetalIcon width="28" />
        <span className="text-2xl font-bold ">AlemonJS</span>
      </div>
      <div
        className="text-base flex items-center gap-2 cursor-pointer"
        onClick={() => onclickIcon()}
      >
        <span className="font-[AlibabaPuHuiTi2.0]">设置</span>
        <div className="">
          <SettingIcon width="28" height="28" />
        </div>
      </div>
    </nav>
  )
}
