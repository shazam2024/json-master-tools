import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay } from 'react-icons/fi'
import Editor from '@/components/common/Editor'
import toast from 'react-hot-toast'

const JsonToCsv: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const convertToCsv = () => {
    if (!input.trim()) {
      toast.error('Please enter JSON content to convert')
      return
    }

    try {
      const data = JSON.parse(input)

      if (!Array.isArray(data)) {
        toast.error('JSON must be an array of objects')
        return
      }

      if (data.length === 0) {
        toast.error('Array cannot be empty')
        return
      }

      // Get headers from first object
      const headers = Object.keys(data[0])

      // Create CSV content
      const csvRows = [
        headers.join(','), // Header row
        ...data.map(row =>
          headers.map(header => {
            const value = row[header]
            // Handle values that contain commas or quotes
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value || ''
          }).join(',')
        )
      ]

      setOutput(csvRows.join('\n'))
      toast.success('JSON converted to CSV successfully!')
    } catch (error) {
      toast.error('Invalid JSON format')
      setOutput('')
    }
  }

  return (
    <>
      <Helmet>
        <title>JSON to CSV - JSON Master Tools</title>
        <meta name="description" content="Convert JSON data to CSV format." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              JSON to CSV
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Convert JSON data to CSV format
            </p>
          </div>

          <button
            onClick={convertToCsv}
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
                placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
              />

              <button
                onClick={() => setInput('[{"name": "John Doe", "age": 30, "city": "New York"}, {"name": "Jane Smith", "age": 25, "city": "Los Angeles"}]')}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Load Sample Data
              </button>
            </div>

            <div>
              <Editor
                title="CSV Output"
                value={output}
                onChange={() => {}}
                language="text"
                readOnly={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JsonToCsv
