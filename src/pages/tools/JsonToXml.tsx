import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay } from 'react-icons/fi'
import Editor from '@/components/common/Editor'
import toast from 'react-hot-toast'

const JsonToXml: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [rootElement, setRootElement] = useState('root')

  const convertToXml = () => {
    if (!input.trim()) {
      toast.error('Please enter JSON content to convert')
      return
    }

    try {
      const data = JSON.parse(input)

      const jsonToXml = (obj: any, elementName: string = rootElement): string => {
        if (obj === null || obj === undefined) {
          return `<${elementName}></${elementName}>`
        }

        if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
          return `<${elementName}>${obj}</${elementName}>`
        }

        if (Array.isArray(obj)) {
          return obj.map((item, index) =>
            jsonToXml(item, 'item')
          ).join('\n')
        }

        if (typeof obj === 'object') {
          const elements = Object.entries(obj).map(([key, value]) =>
            jsonToXml(value, key)
          ).join('\n')

          return `<${elementName}>\n${elements}\n</${elementName}>`
        }

        return `<${elementName}></${elementName}>`
      }

      const xml = jsonToXml(data)
      setOutput(xml)
      toast.success('JSON converted to XML successfully!')
    } catch (error) {
      toast.error('Invalid JSON format')
      setOutput('')
    }
  }

  return (
    <>
      <Helmet>
        <title>JSON to XML - JSON Master Tools</title>
        <meta name="description" content="Convert JSON data to XML format." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              JSON to XML
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Convert JSON data to XML format
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Root Element:
              </label>
              <input
                type="text"
                value={rootElement}
                onChange={(e) => setRootElement(e.target.value)}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm w-20"
              />
            </div>

            <button
              onClick={convertToXml}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              <FiPlay size={16} />
              <span>Convert</span>
            </button>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="space-y-4">
              <Editor
                title="JSON Input"
                value={input}
                onChange={(value) => setInput(value || '')}
                language="json"
                placeholder='{"name": "John", "age": 30, "city": "New York"}'
              />

              <button
                onClick={() => setInput('{"person": {"name": "John Doe", "age": 30, "city": "New York"}}')}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Load Sample Data
              </button>
            </div>

            <div>
              <Editor
                title="XML Output"
                value={output}
                onChange={() => {}}
                language="xml"
                readOnly={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JsonToXml
