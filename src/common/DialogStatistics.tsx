import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import dayjs from 'dayjs'

/* 对话统计 */
const DialogStatistics = ({ className, data = [] }: { className?: string; data?: any[] }) => {
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
      dayjs().isoWeekday(1).subtract(i, 'days').format('MM/DD')
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

export default DialogStatistics
