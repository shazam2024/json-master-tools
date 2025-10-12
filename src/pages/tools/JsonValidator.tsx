import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiCheckCircle, FiXCircle, FiPlay } from 'react-icons/fi'
import Editor from '@/components/common/Editor'
import toast from 'react-hot-toast'

const JsonValidator: React.FC = () => {
  const [input, setInput] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [error, setError] = useState<string>('')

  const validateJson = () => {
    if (!input.trim()) {
      toast.error('Please enter JSON content to validate')
      return
    }

    try {
      JSON.parse(input)
      setIsValid(true)
      setError('')
      toast.success('Valid JSON!')
    } catch (err) {
      setIsValid(false)
      setError(err instanceof Error ? err.message : 'Invalid JSON')
      toast.error('Invalid JSON format')
    }
  }

  const handleInputChange = (value: string | undefined) => {
    setInput(value || '')
    setIsValid(null)
    setError('')
  }

  return (
    <>
      <Helmet>
        <title>JSON Validator - JSON Master Tools</title>
        <meta name="description" content="Validate JSON syntax and check for errors in your JSON data." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              JSON Validator
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Validate JSON syntax and check for errors
            </p>
          </div>

          <button
            onClick={validateJson}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <FiPlay size={16} />
            <span>Validate</span>
          </button>
        </div>

        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="space-y-4">
              <Editor
                title="JSON Input"
                value={input}
                onChange={handleInputChange}
                language="json"
                placeholder='{"name": "John", "age": 30}'
              />

              <button
                onClick={() => setInput('{"name": "John", "age": 30, "city": "New York"}')}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Load Sample Data
              </button>
            </div>

            <div className="space-y-4">
              <div className="glass rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Validation Result
                </h3>

                {isValid === null && (
                  <div className="text-center py-8">
                    <div className="text-gray-400 dark:text-gray-500">
                      Enter JSON and click validate to see results
                    </div>
                  </div>
                )}

                {isValid === true && (
                  <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <FiCheckCircle className="text-green-500" size={24} />
                    <div>
                      <div className="font-medium text-green-800 dark:text-green-400">
                        Valid JSON
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-500">
                        Your JSON syntax is correct
                      </div>
                    </div>
                  </div>
                )}

                {isValid === false && (
                  <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <FiXCircle className="text-red-500 mt-0.5" size={20} />
                    <div>
                      <div className="font-medium text-red-800 dark:text-red-400">
                        Invalid JSON
                      </div>
                      <div className="text-sm text-red-600 dark:text-red-500 mt-1">
                        {error}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JsonValidator
