import { useEffect, useRef } from 'react'
import { html } from 'diff2html'
// import 'diff2html/bundles/css/diff2html.min.css';
import '@/assets/css/diff2html.css'

const CodeDiff = ({ content }: { content: string }) => {
  const diffHtml = html(content)

  const diffElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const links = diffElement.current?.querySelectorAll('a')

    const handleLinkClick = (e: MouseEvent) => {
      e.preventDefault()
      const href = (e.target as HTMLAnchorElement).getAttribute('href')
      if (href?.startsWith('#')) {
        const anchor = (diffElement.current as unknown as HTMLElement).querySelector(
          href
        ) as HTMLDivElement
        if (anchor) {
          // anchor.scrollIntoView({behavior:'smooth'})
          diffElement.current?.scroll({
            top: anchor.offsetTop - 30,
            behavior: 'smooth',
            left: 0
          })
        }
      }
    }

    links &&
      links.forEach(link => {
        link.addEventListener('click', handleLinkClick)
      })

    return () => {
      links &&
        links.forEach(link => {
          link.removeEventListener('click', handleLinkClick)
        })
    }
  }, [content])

  return (
    <div
      className="overflow-auto scrollbar h-[calc(100vh-3rem)] max-w-[calc(100vw-21.5rem)]"
      id={'diff-container'}
      ref={diffElement}
    >
      <div dangerouslySetInnerHTML={{ __html: diffHtml }} />
    </div>
  )
}

export default CodeDiff
