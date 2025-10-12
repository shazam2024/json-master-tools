import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay } from 'react-icons/fi'
import Editor from '@/components/common/Editor'
import toast from 'react-hot-toast'

const JsonMinifier: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const minifyJson = () => {
    if (!input.trim()) {
      toast.error('Please enter JSON content to minify')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      toast.success('JSON minified successfully!')
    } catch (error) {
      toast.error('Invalid JSON format')
      setOutput('')
    }
  }

  return (
    <>
      <Helmet>
        <title>JSON Minifier - JSON Master Tools</title>
        <meta name="description" content="Minify JSON by removing unnecessary whitespace and formatting." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              JSON Minifier
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Minify JSON by removing unnecessary whitespace
            </p>
          </div>

          <button
            onClick={minifyJson}
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
                title="Input JSON"
                value={input}
                onChange={(value) => setInput(value || '')}
                language="json"
                placeholder='{\n  "name": "John",\n  "age": 30\n}'
              />

              <button
                onClick={() => setInput('{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}')}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Load Sample Data
              </button>
            </div>

            <div>
              <Editor
                title="Minified JSON"
                value={output}
                onChange={() => {}}
                language="json"
                readOnly={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JsonMinifier
