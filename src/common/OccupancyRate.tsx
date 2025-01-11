import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'

/* 占用率 */
const OccupancyRate = ({ className, data = [] }: { className?: string; data?: any[] }) => {
  // 创建一个 ref 来保存图表容器
  const chartRef = useRef<HTMLDivElement | null>(null)
  // 为了让图表自适应宽度，我们需要监听容器的宽度变化
  const [width, setWidth] = useState(0)

  // 监听容器宽度变化
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        setWidth(chartRef.current.offsetWidth)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current as HTMLElement)
    chartInstance.setOption({
      series: [
        {
          type: 'pie',
          radius: ['65%', '100%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          data: data.length
            ? data
            : Array.from({ length: 20 }, (_, i) => ({
                value: 5,
                itemStyle: { color: `rgba(253, 140, 47, ${1 - i / 20})` }, // 颜色为 FD8C2F，透明度逐渐从 100% 变成 0%
                offsetCenter: [0, `-${i * 2}%`] // 给每个数据之间加上一些间隔空隙
              }))
        }
      ]
    })
    chartInstance.resize({ width: width })
  }, [width])

  return (
    <div className={className}>
      <div ref={chartRef} id="occupancy-rate" style={{ height: '100%' }} />
    </div>
  )
}

export default OccupancyRate
