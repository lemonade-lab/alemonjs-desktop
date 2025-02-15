import { Collapse } from 'antd'
import { Tabs } from 'antd'
import type { TabsProps, CollapseProps } from 'antd'

const onChange = (key: string) => {
  console.log(key)
}

const BranchesLogs: CollapseProps['items'] = [
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

const itemsLogs: CollapseProps['items'] = [
  {
    key: '1',
    label: 'v0.0.1'
  },
  {
    key: '2',
    label: 'v0.0.2'
  },
  {
    key: '3',
    label: 'v0.0.2'
  }
]

const tagsItems: TabsProps['items'] = [
  {
    key: '1',
    label: 'Branches',
    children: (
      <div className="flex flex-col gap-2">
        <Collapse items={BranchesLogs} defaultActiveKey={['1']} />
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

const Card = () => {
  return <Tabs defaultActiveKey="1" items={tagsItems} onChange={onChange} />
}

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'lemonade-lab/alemonjs',
    children: <Card />
  },
  {
    key: '2',
    // https://github.com/
    label: 'lemonade-lab/alemonjs-desktop',
    children: <Card />
  }
]

export default function GitList() {
  const onChange = (key: string | string[]) => {
    console.log(key)
  }
  return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
}
