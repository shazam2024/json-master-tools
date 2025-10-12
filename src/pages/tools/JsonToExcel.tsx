import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay, FiDownload } from 'react-icons/fi'
import Editor from '@/components/common/Editor'
import toast from 'react-hot-toast'

const JsonToExcel: React.FC = () => {
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const convertToExcel = async () => {
    if (!input.trim()) {
      toast.error('Please enter JSON content to convert')
      return
    }

    setIsProcessing(true)

    try {
      const data = JSON.parse(input)

      if (!Array.isArray(data)) {
        toast.error('JSON must be an array of objects')
        return
      }

      // For demo purposes, we'll create a CSV representation
      // In a real implementation, you would use a library like xlsx
      if (data.length === 0) {
        toast.error('Array cannot be empty')
        return
      }

      const headers = Object.keys(data[0])
      const csvRows = [
        headers.join(','), // Header row
        ...data.map(row =>
          headers.map(header => {
            const value = row[header]
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value || ''
          }).join(',')
        )
      ]

      const csvContent = csvRows.join('\n')

      // Create download link for CSV (as Excel alternative for demo)
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'data.csv'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success('File downloaded successfully!')
    } catch (error) {
      toast.error('Invalid JSON format')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>JSON to Excel - JSON Master Tools</title>
        <meta name="description" content="Convert JSON data to Excel format (XLSX)." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              JSON to Excel
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Convert JSON data to Excel format (XLSX)
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full">
              Premium
            </span>
            <button
              onClick={convertToExcel}
              disabled={isProcessing}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              <FiDownload size={16} />
              <span>{isProcessing ? 'Converting...' : 'Download Excel'}</span>
            </button>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Premium Feature
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  This tool requires a premium subscription to convert JSON data to Excel format.
                  The free version allows you to preview the conversion as CSV format.
                </p>
              </div>

              <Editor
                title="JSON Input"
                value={input}
                onChange={(value) => setInput(value || '')}
                language="json"
                placeholder='[{"name": "John", "age": 30, "city": "New York"}, {"name": "Jane", "age": 25, "city": "Los Angeles"}]'
              />

              <button
                onClick={() => setInput('[{"name": "John Doe", "age": 30, "city": "New York", "salary": 50000}, {"name": "Jane Smith", "age": 25, "city": "Los Angeles", "salary": 60000}]')}
                className="w-full mt-4 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Load Sample Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JsonToExcel
