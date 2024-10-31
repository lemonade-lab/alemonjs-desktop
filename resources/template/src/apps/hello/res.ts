// 引入模块
import { Text, useSend } from 'alemonjs'
// 导出响应
export default OnResponse(
  event => {
    // 构造消息
    const msg = Text('hello word')
    // 创建接口
    const Send = useSend(event)
    // 发送消息
    Send(msg)
  },
  'message.create',
  /^(#|\/)?hello$/
)
