import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay, FiSearch } from 'react-icons/fi'
import Editor from '@/components/common/Editor'
import toast from 'react-hot-toast'

const JsonPathFinder: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [searchPath, setSearchPath] = useState('')
  const [foundPaths, setFoundPaths] = useState<string[]>([])

  const findPaths = () => {
    if (!input.trim()) {
      toast.error('Please enter JSON content')
      return
    }

    if (!searchPath.trim()) {
      toast.error('Please enter a path to search for')
      return
    }

    try {
      const data = JSON.parse(input)
      const paths: string[] = []

      const findPathsRecursive = (obj: any, currentPath: string = '') => {
        if (obj === null || obj === undefined) return

        if (typeof obj === 'object' && !Array.isArray(obj)) {
          Object.keys(obj).forEach(key => {
            const path = currentPath ? `${currentPath}.${key}` : key
            if (path.includes(searchPath) || key.includes(searchPath)) {
              paths.push(path)
            }
            findPathsRecursive(obj[key], path)
          })
        } else if (Array.isArray(obj)) {
          obj.forEach((item, index) => {
            const path = currentPath ? `${currentPath}[${index}]` : `[${index}]`
            findPathsRecursive(item, path)
          })
        }
      }

      findPathsRecursive(data)
      setFoundPaths(paths)
      setOutput(`Found ${paths.length} path(s):\n\n${paths.join('\n')}`)
      toast.success(`Found ${paths.length} path(s)`)
    } catch (error) {
      toast.error('Invalid JSON format')
      setOutput('')
      setFoundPaths([])
    }
  }

  return (
    <>
      <Helmet>
        <title>JSON Path Finder - JSON Master Tools</title>
        <meta name="description" content="Find JSON paths by clicking on values or searching for keys." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              JSON Path Finder
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Find JSON paths by clicking on values or searching for keys
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FiSearch size={16} className="text-gray-500" />
              <input
                type="text"
                value={searchPath}
                onChange={(e) => setSearchPath(e.target.value)}
                placeholder="Search path..."
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm w-40"
              />
            </div>

            <button
              onClick={findPaths}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              <FiPlay size={16} />
              <span>Find Paths</span>
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
                placeholder='{"user": {"name": "John", "details": {"age": 30, "city": "New York"}}}'
              />

              <button
                onClick={() => setInput('{"user": {"name": "John Doe", "details": {"age": 30, "city": "New York", "email": "john@example.com"}}}')}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Load Sample Data
              </button>
            </div>

            <div className="space-y-4">
              <div className="glass rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Found Paths ({foundPaths.length})
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-64">
                  {foundPaths.length > 0 ? (
                    <div className="space-y-2">
                      {foundPaths.map((path, index) => (
                        <div
                          key={index}
                          className="p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          onClick={() => navigator.clipboard.writeText(path)}
                        >
                          {path}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-400 dark:text-gray-500 text-center py-8">
                      Found paths will appear here
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JsonPathFinder
