import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.js'
import 'codemirror/mode/properties/properties.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/xq-light.css'
import '@/assets/css/CodeMirror.css'
import { useEffect, useState } from 'react'

type CodeMirrorProps = {
  value: string
  onChange: (editor: any, data: string, value: string) => void
  theme?: string
}

/**
 *
 * @param props
 * @returns
 */
export default function Code(props: CodeMirrorProps) {
  const [theme, setTheme] = useState('xq-light')
  useEffect(() => {
    window.theme.mode().then(res => {
      if (res === 'dark') {
        setTheme('solarized')
      } else {
        setTheme('xq-light')
      }
    })
    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const hasDarkClass = document.documentElement.classList.contains('dark')
          if (hasDarkClass) {
            setTheme('solarized')
          } else {
            setTheme('xq-light')
          }
        }
      }
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    return () => {
      observer.disconnect()
    }
  }, [])
  return (
    <CodeMirror
      className="flex-1 size-full"
      options={{
        mode: 'text/x-properties',
        theme: theme,
        lineNumbers: true
      }}
      {...props}
    />
  )
}
