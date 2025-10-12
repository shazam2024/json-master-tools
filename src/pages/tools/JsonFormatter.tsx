import React, { useState, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay, FiSettings } from 'react-icons/fi'
import Editor from '@/components/common/Editor'
import toast from 'react-hot-toast'

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [indentSize, setIndentSize] = useState(2)
  const [isProcessing, setIsProcessing] = useState(false)

  const formatJson = useCallback(async () => {
    if (!input.trim()) {
      toast.error('Please enter JSON content to format')
      return
    }

    setIsProcessing(true)

    try {
      // Validate JSON first
      const parsed = JSON.parse(input)

      // Format with specified indentation
      const formatted = JSON.stringify(parsed, null, indentSize)

      setOutput(formatted)
      toast.success('JSON formatted successfully!')
    } catch (error) {
      toast.error('Invalid JSON format')
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsProcessing(false)
    }
  }, [input, indentSize])

  const handleInputChange = (value: string | undefined) => {
    setInput(value || '')
    // Auto-format if input is valid JSON
    if (value && value.trim()) {
      try {
        JSON.parse(value)
        // Debounce the auto-formatting
        setTimeout(() => formatJson(), 500)
      } catch {
        // Invalid JSON, don't auto-format
      }
    }
  }

  const handleCopyOutput = () => {
    toast.success('Output copied to clipboard!')
  }

  const handleDownloadOutput = () => {
    toast.success('Output downloaded!')
  }

  const handleUploadInput = (content: string) => {
    setInput(content)
  }

  const handleReset = () => {
    setInput('')
    setOutput('')
  }

  return (
    <>
      <Helmet>
        <title>JSON Formatter - JSON Master Tools</title>
        <meta name="description" content="Format and beautify JSON data with syntax highlighting and customizable indentation." />
      </Helmet>

      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              JSON Formatter
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Format and beautify JSON data with syntax highlighting
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Indentation Setting */}
            <div className="flex items-center space-x-2">
              <FiSettings size={16} className="text-gray-500" />
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Indent:
              </label>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={1}>Tabs</option>
              </select>
            </div>

            {/* Format Button */}
            <button
              onClick={formatJson}
              disabled={isProcessing}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              <FiPlay size={16} />
              <span>{isProcessing ? 'Formatting...' : 'Format'}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Input Editor */}
            <div className="space-y-4">
              <Editor
                title="Input JSON"
                value={input}
                onChange={handleInputChange}
                language="json"
                placeholder='{"name": "John", "age": 30, "city": "New York"}'
                onUpload={handleUploadInput}
                onReset={handleReset}
              />

              {/* Sample Data Button */}
              <button
                onClick={() => setInput(JSON.stringify({
                  name: "John Doe",
                  age: 30,
                  email: "john@example.com",
                  address: {
                    street: "123 Main St",
                    city: "New York",
                    country: "USA"
                  },
                  hobbies: ["reading", "coding", "gaming"],
                  active: true
                }, null, 2))}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Load Sample Data
              </button>
            </div>

            {/* Output Editor */}
            <div>
              <Editor
                title="Formatted JSON"
                value={output}
                onChange={() => {}} // Read-only
                language="json"
                readOnly={true}
                onCopy={handleCopyOutput}
                onDownload={handleDownloadOutput}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JsonFormatter
