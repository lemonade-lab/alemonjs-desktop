import logoURL from '@src/assets/logo.jpg'
import { PrimaryDiv } from '@src/ui/Div'
// import Dropdown from './Dropdown'
// import { SettingIcon } from '@src/common/Icons'

const ExpansionsCard = ({
  item,
  handlePackageClick
  // onChangeOption,
  // options
}: {
  item: any
  handlePackageClick: (name: string) => void
  // onChangeOption: (name: string) => void
  // options?: string[]
}) => {
  return (
    <PrimaryDiv
      hover={true}
      onClick={() => handlePackageClick(item.name)}
      className="cursor-pointer rounded-sm relative flex gap-1  p-1 flex-row h-14 justify-between items-center duration-700 transition-all  "
    >
      <div className="size-10 rounded-sm">
        <img
          src={logoURL}
          alt={`${item.name} logo`}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="">{item.name}</div>
        <div className="text-[0.6rem]">{item.description}</div>
      </div>
      <div className="absolute  bottom-1 right-1 text-[0.6rem]">
        {/* <Dropdown
          Icon={<SettingIcon width={18} height={18} />}
          options={options ?? []}
          onChangeOption={value => {
            onChangeOption(value)
          }}
        /> */}
      </div>
    </PrimaryDiv>
  )
}

export default ExpansionsCard
