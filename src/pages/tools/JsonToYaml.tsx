import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay } from 'react-icons/fi'
import Editor from '@/components/common/Editor'
import toast from 'react-hot-toast'

const JsonToYaml: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const convertToYaml = () => {
    if (!input.trim()) {
      toast.error('Please enter JSON content to convert')
      return
    }

    try {
      const data = JSON.parse(input)

      const jsonToYaml = (obj: any, indent: number = 0): string => {
        const spaces = '  '.repeat(indent)

        if (obj === null || obj === undefined) {
          return 'null'
        }

        if (typeof obj === 'string') {
          return `"${obj}"`
        }

        if (typeof obj === 'number' || typeof obj === 'boolean') {
          return obj.toString()
        }

        if (Array.isArray(obj)) {
          if (obj.length === 0) return '[]'
          return obj.map(item =>
            `${spaces}- ${jsonToYaml(item, indent + 1)}`
          ).join('\n')
        }

        if (typeof obj === 'object') {
          const entries = Object.entries(obj)
          if (entries.length === 0) return '{}'

          return entries.map(([key, value]) => {
            const formattedValue = jsonToYaml(value, indent + 1)
            return `${spaces}${key}: ${formattedValue.startsWith('-') ? '\n' + formattedValue : formattedValue}`
          }).join('\n')
        }

        return obj.toString()
      }

      const yaml = jsonToYaml(data)
      setOutput(yaml)
      toast.success('JSON converted to YAML successfully!')
    } catch (error) {
      toast.error('Invalid JSON format')
      setOutput('')
    }
  }

  return (
    <>
      <Helmet>
        <title>JSON to YAML - JSON Master Tools</title>
        <meta name="description" content="Convert JSON data to YAML format." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              JSON to YAML
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Convert JSON data to YAML format
            </p>
          </div>

          <button
            onClick={convertToYaml}
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
                title="JSON Input"
                value={input}
                onChange={(value) => setInput(value || '')}
                language="json"
                placeholder='{"name": "John", "age": 30, "city": "New York"}'
              />

              <button
                onClick={() => setInput('{"person": {"name": "John Doe", "details": {"age": 30, "city": "New York"}}}')}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Load Sample Data
              </button>
            </div>

            <div>
              <Editor
                title="YAML Output"
                value={output}
                onChange={() => {}}
                language="yaml"
                readOnly={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JsonToYaml
