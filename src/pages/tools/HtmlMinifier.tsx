
import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay } from 'react-icons/fi'
import Editor from '@/components/common/Editor'
import toast from 'react-hot-toast'

const HtmlMinifier: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const minifyHtml = () => {
    if (!input.trim()) {
      toast.error('Please enter HTML/CSS/JS to minify')
      return
    }

    try {
      // Basic minification (simplified)
      let minified = input
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/>\s+</g, '><') // Remove spaces between tags
        .replace(/\s*{\s*/g, '{') // Remove spaces in CSS
        .replace(/\s*}\s*/g, '}') // Remove spaces in CSS
        .replace(/\s*;\s*/g, ';') // Remove spaces in CSS
        .replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, '') // Remove CSS comments
        .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
        .trim()

      setOutput(minified)
      toast.success('Content minified successfully!')
    } catch (error) {
      toast.error('Failed to minify content')
      setOutput('')
    }
  }

  return (
    <>
      <Helmet>
        <title>HTML/CSS/JS Minifier - JSON Master Tools</title>
        <meta name="description" content="Minify HTML, CSS, and JavaScript code." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              HTML/CSS/JS Minifier
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Minify HTML, CSS, and JavaScript code
            </p>
          </div>

          <button
            onClick={minifyHtml}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <FiPlay size={16} />
            <span>Minify</span>
          </button>
        </div>

        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="space-y-4">
              <Editor
                title="Input Code"
                value={input}
                onChange={(value) => setInput(value || '')}
                language="html"
                placeholder={'<div class="container">\n  <h1>Hello World</h1>\n  <p>This is a test</p>\n</div>'}
              />

              <button
                onClick={() => setInput('<div class="container">\n  <h1>Hello World</h1>\n  <p>This is a test</p>\n</div>')}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Load Sample HTML
              </button>
            </div>

            <div>
              <Editor
                title="Minified Code"
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

export default HtmlMinifier
