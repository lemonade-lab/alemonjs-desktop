import { Collapse } from './Collapse'
import { Tabs } from './Tabs'

const itemsLogs = [
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

const BranchesLogs = [
  {
    key: '1',
    label: 'main',
    children: (
      <div className="flex flex-col gap-2">
        <div>v0.0.1</div>
        <div>v0.0.1</div>
        <div>v0.0.1</div>
      </div>
    )
  },
  {
    key: '2',
    label: 'dev',
    children: (
      <div className="flex flex-col gap-2">
        <div>v0.0.1</div>
        <div>v0.0.1</div>
        <div>v0.0.1</div>
      </div>
    )
  },
  {
    key: '3',
    label: 'build',
    children: (
      <div className="flex flex-col gap-2">
        <div>v0.0.1</div>
        <div>v0.0.1</div>
        <div>v0.0.1</div>
      </div>
    )
  }
]

const tagsItems = [
  {
    key: '1',
    label: 'Tags',
    children: (
      <div className="flex flex-col gap-2">
        {itemsLogs.map(item => (
          <div key={item.key} className="flex items-center gap-2">
            <div>{item.label}</div>
          </div>
        ))}
      </div>
    )
  },
  {
    key: '2',
    label: 'Branches',
    children: (
      <div className="flex flex-col gap-2">
        <Collapse items={BranchesLogs} />
      </div>
    )
  }
]

const items = [
  {
    key: '1',
    label: 'lemonade-lab/alemonjs',
    children: <Tabs items={tagsItems} />
  },
  {
    key: '2',
    label: 'lemonade-lab/alemonjs-desktop',
    children: <Tabs items={tagsItems} />
  }
]

export default function GitList() {
  return <Collapse items={items} />
}
