import { PrimaryDiv } from '@src/ui/PrimaryDiv'
import type { CollapseProps, DescriptionsProps } from 'antd'
import { Collapse, Descriptions } from 'antd'
import { FolderAddOutlined } from '@ant-design/icons'
import { Input } from '@src/ui/Input'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'

const onChange = (key: string) => {
  console.log(key)
}

const itemsLogs: CollapseProps['items'] = [
  {
    key: '1',
    label: 'main'
  },
  {
    key: '2',
    label: 'dev'
  },
  {
    key: '3',
    label: 'build'
  }
]

const tagsItems: TabsProps['items'] = [
  {
    key: '1',
    label: 'Branches',
    children: (
      <div className="flex flex-col gap-2">
        <Collapse items={itemsLogs} defaultActiveKey={['1']} />
      </div>
    )
  },
  {
    key: '2',
    label: 'Tags',
    children: (
      <div className="flex flex-col gap-2">
        <Collapse items={itemsLogs} defaultActiveKey={['1']} />
      </div>
    )
  }
]

const LogsList = () => {
  return <div></div>
}

const Card = () => {
  return <Tabs defaultActiveKey="1" items={tagsItems} onChange={onChange} />
}

const itemsDescriptions: DescriptionsProps['items'] = [
  {
    key: '1',
    label: '作者',
    children: <p>Lemonaade-x</p>
  },
  {
    key: '2',
    label: 'license',
    children: <p>MIT</p>
  },
  {
    key: '3',
    label: 'URL',
    children: <p>alemonjs.com</p>
  },
  {
    key: '4',
    label: 'About',
    children: <p>阿柠檬机器人桌面版</p>
  }
]

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'https://github.com/lemonade-lab/alemonjs',
    children: (
      <>
        <Descriptions title="https://github.com/lemonade-lab/alemonjs" items={itemsDescriptions} />
        <Card />
      </>
    )
  },
  {
    key: '2',
    label: 'https://github.com/lemonade-lab/alemonjs-desktop',
    children: (
      <>
        <Descriptions
          title="https://github.com/lemonade-lab/alemonjs-desktop"
          items={itemsDescriptions}
        />
        <Card />
      </>
    )
  }
]

export default function GitList() {
  const onChange = (key: string | string[]) => {
    console.log(key)
  }

  return (
    <div className="flex flex-col gap-4 flex-1 p-3">
      <div className="flex  gap-2 justify-between">
        <Input
          placeholder="输入git地址，以添加到git仓库列表"
          className="flex-1 border rounded-md px-2 py-1"
        />
        <FolderAddOutlined />
      </div>
      <PrimaryDiv className=" rounded-lg  shadow-inner overflow-y-auto  h-[calc(100vh-7rem)]">
        <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
      </PrimaryDiv>
    </div>
  )
}
