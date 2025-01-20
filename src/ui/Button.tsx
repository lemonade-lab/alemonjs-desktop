import classNames from 'classnames'
export default function Button(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    typing?: 'error' | 'success' | 'warning' | 'no-border'
  }
) {
  const { typing = 'none', className, ...prop } = props
  return (
    <button
      type="button"
      className={classNames(className, 'text-sm  px-1 md:px-2 py-1 rounded', {
        'text-white  bg-red-500': typing == 'error',
        'text-white  bg-blue-500 ': typing == 'success',
        'text-white  bg-yellow-500 ': typing == 'warning',
        'text-slate-800 border  dark:bg-white ': typing == 'none',
        '  bg-slate-100 dark:bg-slate-700 ': typing == 'no-border'
      })}
      {...prop}
    />
  )
}
