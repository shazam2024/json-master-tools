import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay } from 'react-icons/fi'
import Editor from '@/components/common/Editor'
import toast from 'react-hot-toast'

const SqlFormatter: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const formatSql = () => {
    if (!input.trim()) {
      toast.error('Please enter SQL to format')
      return
    }

    try {
      // Basic SQL formatting (simplified)
      let formatted = input
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/\s*,\s*/g, ',\n    ') // Add newlines after commas
        .replace(/\s+(SELECT|FROM|WHERE|JOIN|ORDER BY|GROUP BY|HAVING|LIMIT)\s+/gi, '\n$1 ')
        .replace(/^\s+/, '') // Remove leading whitespace
        .trim()

      setOutput(formatted)
      toast.success('SQL formatted successfully!')
    } catch (error) {
      toast.error('Failed to format SQL')
      setOutput('')
    }
  }

  return (
    <>
      <Helmet>
        <title>SQL Formatter - JSON Master Tools</title>
        <meta name="description" content="Format and beautify SQL queries." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              SQL Formatter
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Format and beautify SQL queries
            </p>
          </div>

          <button
            onClick={formatSql}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <FiPlay size={16} />
            <span>Format</span>
          </button>
        </div>

        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="space-y-4">
              <Editor
                title="SQL Input"
                value={input}
                onChange={(value) => setInput(value || '')}
                language="sql"
                placeholder="SELECT u.name, u.email, p.title FROM users u JOIN posts p ON u.id = p.user_id WHERE u.active = 1 ORDER BY u.name"
              />

              <button
                onClick={() => setInput("SELECT u.name, u.email, p.title FROM users u JOIN posts p ON u.id = p.user_id WHERE u.active = 1 ORDER BY u.name")}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Load Sample Query
              </button>
            </div>

            <div>
              <Editor
                title="Formatted SQL"
                value={output}
                onChange={() => {}}
                language="sql"
                readOnly={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SqlFormatter
