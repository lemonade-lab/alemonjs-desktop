import Header from '@/common/Header'
import { PrimaryDiv } from '@alemonjs/react-ui'
/**
 * 过度页
 * 在蓝加载中，切换时的国度页
 * 仅显示主题色，无其他内容
 * @returns
 */
export default function Transition() {
  return (
    <div className="flex flex-col h-screen">
      <Header>
        <div></div>
      </Header>
      <div className="flex flex-1">
        <PrimaryDiv className="flex flex-1">
          <div className="flex-1 flex-col flex justify-center items-center">
            <div className="flex-col flex">
              <div className="flex-col flex justify-center items-center"></div>
            </div>
          </div>
        </PrimaryDiv>
      </div>
    </div>
  )
}
