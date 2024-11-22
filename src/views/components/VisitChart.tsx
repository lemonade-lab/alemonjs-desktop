import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import moment from 'moment'

/* 访问人数 echarts 图表 */
export const VisitChart = ({ className, data = [] }: { className?: string; data?: any[] }) => {
  return <div className="text-sm"> 访问人群图标 </div>
}

/* 占用率 */
export const OccupancyRate = ({ className, data = [] }: { className?: string; data?: any[] }) => {
  const chartRef = useRef<HTMLElement | null>(null)
  const [width, setWidth] = useState(0)

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

    const option = {
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
    }

    chartInstance.setOption(option)
    chartInstance.resize({ width: width })
  }, [width])

  return (
    <div className={className}>
      <section
        ref={chartRef}
        id="occupancy-rate"
        style={{ width: '100%', height: '100%' }}
      ></section>
    </div>
  )
}

/* 全局搜索 */
export const GlobalSearch = ({ className, data = [] }: { className?: string; data?: any[] }) => {
  return <div className="text-sm"> 全局搜索 </div>
}

/* 对话统计 */
export const DialogStatistics = ({
  className,
  data = []
}: {
  className?: string
  data?: any[]
}) => {
  const chartRef = useRef<HTMLElement | null>(null)
  const [width, setWidth] = useState(0)

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

    // 生成当前周 7天, 从周一开始
    const days = Array.from({ length: 7 }, (_, i) =>
      moment().isoWeekday(1).subtract(i, 'days').format('MM/DD')
    )

    const option = {
      grid: {
        top: '10%',
        bottom: '10%',
        left: '0%',
        right: '2%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: days,
        axisLine: {
          show: false, // 隐藏横线
          lineStyle: {
            color: 'rgba(0, 0, 0, 0.52)' // 设置x轴线的颜色为rgba(0,0,0,0.52)
          }
        },
        axisTick: {
          show: false // 不展示每个数据点的竖线
        }
      },
      yAxis: {
        type: 'value',
        min: 0, // 设置y轴最小值为0
        interval: 1000, // 每次增加为1000
        splitLine: {
          show: false, // 隐藏y轴分割线
          lineStyle: {
            color: 'rgba(0, 0, 0, 0.52)' // 设置y轴分割线的颜色为rgba(0,0,0,0.52)
          }
        }
      },
      series: [
        {
          data: data.length ? data : [820, 1802, 2410, 1652, 2765, 2232, 2452],
          type: 'line',
          smooth: true,
          itemStyle: {
            color: '#F36D00' // 设置折线的颜色为F36D00
          }
        }
      ]
    }

    chartInstance.setOption(option)
    chartInstance.resize({ width: width })
  }, [width])

  return (
    <div className={className}>
      <section
        ref={chartRef}
        id="dialog-statistics"
        style={{ width: '100%', height: '100%' }}
      ></section>
    </div>
  )
}

/* 运行时间 */
export const RunningTime = ({ className, data = [] }: { className?: string; data?: any[] }) => {
  return <div className="text-sm"> 运行时间 </div>
}
