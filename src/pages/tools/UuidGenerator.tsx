import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay, FiCopy } from 'react-icons/fi'
import toast from 'react-hot-toast'

const UuidGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([])
  const [version, setVersion] = useState<'v1' | 'v4'>('v4')
  const [count, setCount] = useState(5)

  const generateUuids = () => {
    const newUuids: string[] = []

    for (let i = 0; i < count; i++) {
      if (version === 'v4') {
        // Generate UUID v4
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0
          const v = c === 'x' ? r : (r & 0x3 | 0x8)
          return v.toString(16)
        })
        newUuids.push(uuid)
      } else {
        // Generate UUID v1 (simplified)
        const timestamp = Date.now()
        const uuid = 'xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0
          const v = c === 'x' ? r : (r & 0x3 | 0x8)
          return v.toString(16)
        }).replace('xxxxxxxx', timestamp.toString(16).padStart(8, '0'))
        newUuids.push(uuid)
      }
    }

    setUuids(newUuids)
    toast.success(`${count} UUID${count > 1 ? 's' : ''} generated!`)
  }

  const copyToClipboard = async (uuid: string) => {
    try {
      await navigator.clipboard.writeText(uuid)
      toast.success('UUID copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy UUID')
    }
  }

  return (
    <>
      <Helmet>
        <title>UUID Generator - JSON Master Tools</title>
        <meta name="description" content="Generate UUID v1 and v4 identifiers." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              UUID Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Generate UUID v1 and v4 identifiers
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Version:
              </label>
              <select
                value={version}
                onChange={(e) => setVersion(e.target.value as 'v1' | 'v4')}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm"
              >
                <option value="v1">v1 (Timestamp)</option>
                <option value="v4">v4 (Random)</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Count:
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                className="w-16 px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm"
              />
            </div>

            <button
              onClick={generateUuids}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              <FiPlay size={16} />
              <span>Generate</span>
            </button>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {uuids.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  No UUIDs generated yet
                </div>
                <button
                  onClick={generateUuids}
                  className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                  Generate UUIDs
                </button>
              </div>
            )}

            {uuids.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Generated UUIDs ({uuids.length})
                  </h2>
                  <button
                    onClick={() => setUuids([])}
                    className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-2">
                  {uuids.map((uuid, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                        {uuid}
                      </code>
                      <button
                        onClick={() => copyToClipboard(uuid)}
                        className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                        title="Copy UUID"
                      >
                        <FiCopy size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default UuidGenerator
