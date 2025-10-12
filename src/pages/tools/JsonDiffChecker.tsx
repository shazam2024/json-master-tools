import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay } from 'react-icons/fi'
import Editor from '@/components/common/Editor'
import toast from 'react-hot-toast'

const JsonDiffChecker: React.FC = () => {
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [output, setOutput] = useState('')

  const compareJson = () => {
    if (!input1.trim() || !input2.trim()) {
      toast.error('Please enter JSON content in both editors')
      return
    }

    try {
      const data1 = JSON.parse(input1)
      const data2 = JSON.parse(input2)

      // Simple comparison (for demo purposes)
      const differences: string[] = []

      if (JSON.stringify(data1) === JSON.stringify(data2)) {
        differences.push('No differences found - JSON objects are identical')
      } else {
        differences.push('Differences detected between the two JSON objects')
        differences.push('')
        differences.push('Left JSON structure:')
        differences.push(JSON.stringify(data1, null, 2))
        differences.push('')
        differences.push('Right JSON structure:')
        differences.push(JSON.stringify(data2, null, 2))
      }

      setOutput(differences.join('\n'))
      toast.success('JSON comparison completed!')
    } catch (error) {
      toast.error('Invalid JSON format in one or both editors')
      setOutput('')
    }
  }

  return (
    <>
      <Helmet>
        <title>JSON Diff Checker - JSON Master Tools</title>
        <meta name="description" content="Compare two JSON files side-by-side and highlight differences." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              JSON Diff Checker
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Compare two JSON files side-by-side and highlight differences
            </p>
          </div>

          <button
            onClick={compareJson}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <FiPlay size={16} />
            <span>Compare</span>
          </button>
        </div>

        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div className="space-y-4">
              <Editor
                title="JSON Input 1"
                value={input1}
                onChange={(value) => setInput1(value || '')}
                language="json"
                placeholder='{"name": "John", "age": 30}'
              />

              <button
                onClick={() => setInput1('{"name": "John Doe", "age": 30, "city": "New York"}')}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Load Sample Data 1
              </button>
            </div>

            <div className="space-y-4">
              <Editor
                title="JSON Input 2"
                value={input2}
                onChange={(value) => setInput2(value || '')}
                language="json"
                placeholder='{"name": "Jane", "age": 25}'
              />

              <button
                onClick={() => setInput2('{"name": "Jane Smith", "age": 25, "city": "Los Angeles"}')}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Load Sample Data 2
              </button>
            </div>

            <div>
              <Editor
                title="Comparison Result"
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

export default JsonDiffChecker
