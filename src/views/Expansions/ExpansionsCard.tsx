import { FileTextOutlined } from '@ant-design/icons'
import { PrimaryDiv } from '@alemonjs/react-ui'

const ExpansionsCard = ({
  item,
  handlePackageClick
}: {
  item: any
  handlePackageClick: (name: string) => void
}) => {
  return (
    <PrimaryDiv
      hover={true}
      onClick={() => handlePackageClick(item.name)}
      className="cursor-pointer rounded-sm relative flex gap-1  p-1 flex-row h-14 justify-between items-center duration-700 transition-all  "
    >
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between items-center">
          <div className="text-md flex gap-1">
            <FileTextOutlined />
            {item.name}
          </div>
          <div className="text-sm">{item.version}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm">{item.description}</div>
        </div>
      </div>
    </PrimaryDiv>
  )
}

export default ExpansionsCard
