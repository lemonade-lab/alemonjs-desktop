import { useState, useEffect } from 'react'

// 定义网络速度类型
interface NetworkSpeed {
  downlink: number // 下载速度（MB/s）
  rtt: number // 往返时间（ms）
}

// 返回值类型
interface UseNetworkSpeedReturn {
  networkSpeed: NetworkSpeed | null
  connectionType: string | null
}

const useNetworkSpeed = (): UseNetworkSpeedReturn => {
  const [networkSpeed, setNetworkSpeed] = useState<NetworkSpeed | null>(null)
  const [connectionType, setConnectionType] = useState<string | null>(null)
  useEffect(() => {
    const nav = navigator as any
    if (!nav) return
    if (!nav?.connection) return
    const connection = nav.connection
    // 将 downlink 从 Mbps 转换为 MB/s
    const downlinkInMBps = connection.downlink / 8 // downlink 是 Mbps，转换为 MB/s
    // 设置初始的网络连接信息
    setConnectionType(connection.effectiveType)
    setNetworkSpeed({
      downlink: downlinkInMBps, // 下载速度（MB/s）
      rtt: connection.rtt // 延迟（ms）
    })
    // 监听网络连接变化
    const handleConnectionChange = () => {
      const updatedDownlinkInMBps = connection.downlink / 8
      setConnectionType(connection.effectiveType)
      setNetworkSpeed({
        downlink: updatedDownlinkInMBps,
        rtt: connection.rtt
      })
    }
    connection.addEventListener('change', handleConnectionChange)
    // 清理副作用
    return () => {
      connection.removeEventListener('change', handleConnectionChange)
    }
  }, [])
  return { networkSpeed, connectionType }
}

export default useNetworkSpeed
