import moment from 'moment'

/**
 * 格式化时间
 * @param time 时间
 * @param format 格式
 * @returns 格式化后的时间
 */
export function formatTime(
  time: string | number | Date,
  format: string = 'YYYY-MM-DD HH:mm:ss'
): string {
  return moment(time).format(format)
}

/**
 * 格式化数字千分位
 * @param num 数字
 * @returns 格式化后的数字
 */
export function formatThousand(num: number): string {
  return num.toLocaleString()
}

/**
 * 计算平均数
 * @param numbers 数字数组
 * @returns 平均数
 */
export function calculateAverage(numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length
}
