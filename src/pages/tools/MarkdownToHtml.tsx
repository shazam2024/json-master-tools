import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay } from 'react-icons/fi'
import Editor from '@/components/common/Editor'
import toast from 'react-hot-toast'

const MarkdownToHtml: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const convertMarkdown = () => {
    if (!input.trim()) {
      toast.error('Please enter Markdown content')
      return
    }

    try {
      // Basic Markdown to HTML conversion (simplified)
      let html = input
        .replace(/^### (.*$)/gim, '<h3>$1</h3>') // Headers
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>') // Bold
        .replace(/\*(.*)\*/gim, '<em>$1</em>') // Italic
        .replace(/`(.*)`/gim, '<code>$1</code>') // Inline code
        .replace(/\n\n/gim, '</p><p>') // Paragraphs
        .replace(/^- (.*$)/gim, '<li>$1</li>') // List items
        .replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>') // Wrap lists

      // Wrap in paragraph tags if not already wrapped
      if (!html.startsWith('<h') && !html.startsWith('<p')) {
        html = '<p>' + html + '</p>'
      }

      setOutput(html)
      toast.success('Markdown converted to HTML!')
    } catch (error) {
      toast.error('Failed to convert Markdown')
      setOutput('')
    }
  }

  return (
    <>
      <Helmet>
        <title>Markdown to HTML - JSON Master Tools</title>
        <meta name="description" content="Convert Markdown to HTML." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Markdown to HTML
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Convert Markdown to HTML
            </p>
          </div>

          <button
            onClick={convertMarkdown}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <FiPlay size={16} />
            <span>Convert</span>
          </button>
        </div>

        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="space-y-4">
              <Editor
                title="Markdown Input"
                value={input}
                onChange={(value) => setInput(value || '')}
                language="markdown"
                placeholder="# Hello World\n\nThis is **bold** and this is *italic*.\n\n- List item 1\n- List item 2"
              />

              <button
                onClick={() => setInput("# Hello World\n\nThis is **bold** and this is *italic*.\n\n- List item 1\n- List item 2")}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Load Sample Markdown
              </button>
            </div>

            <div>
              <Editor
                title="HTML Output"
                value={output}
                onChange={() => {}}
                language="html"
                readOnly={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MarkdownToHtml
