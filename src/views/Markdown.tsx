import MarkdownPreview from '@uiw/react-markdown-preview'
import rehypeHighlight from 'rehype-highlight'
import rehypeSanitize from 'rehype-sanitize'
import rehypePrism from 'rehype-prism'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeAttr from 'rehype-attr'

/**
 *
 * @param param0
 * @returns
 */
const Markdown = ({ source }: { source: string }) => {
  return (
    <MarkdownPreview
      style={{ padding: '0.5rem', borderRadius: '0.5rem' }}
      source={source}
      components={{
        a: ({ node, ...props }) => (
          <span
            {...props}
            onClick={e => e.preventDefault()}
            title="链接已禁用"
            style={{ cursor: 'not-allowed' }}
          >
            {props.children}
          </span>
        )
      }}
      rehypePlugins={[
        rehypeSanitize, // 清理不安全的 HTML
        rehypeHighlight, // 代码高亮
        rehypePrism, // Prism.js 高亮
        rehypeSlug, // 为标题生成锚点
        rehypeRaw, // 允许处理原始 HTML
        [rehypeAutolinkHeadings, { behavior: 'wrap' }], // 自动为标题添加链接
        [
          rehypeAttr,
          {
            // 示例：为所有链接添加 target="_blank"
            properties: {
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }
        ]
      ]}
    />
  )
}

export default Markdown
