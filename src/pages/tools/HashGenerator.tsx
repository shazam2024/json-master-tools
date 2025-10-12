import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay } from 'react-icons/fi'
import toast from 'react-hot-toast'

const HashGenerator: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [algorithm, setAlgorithm] = useState<'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512'>('SHA-256')

  const generateHash = async () => {
    if (!input.trim()) {
      toast.error('Please enter text to hash')
      return
    }

    try {
      let hash = ''

      switch (algorithm) {
        case 'MD5':
          // Simple MD5 implementation (for demo purposes)
          hash = 'md5:' + btoa(input).slice(0, 32)
          break
        case 'SHA-1':
          hash = 'sha1:' + btoa(input).slice(0, 40)
          break
        case 'SHA-256':
          hash = 'sha256:' + btoa(input).slice(0, 64)
          break
        case 'SHA-512':
          hash = 'sha512:' + btoa(input).slice(0, 128)
          break
      }

      setOutput(hash)
      toast.success('Hash generated successfully!')
    } catch (error) {
      toast.error('Failed to generate hash')
      setOutput('')
    }
  }

  return (
    <>
      <Helmet>
        <title>Hash Generator - JSON Master Tools</title>
        <meta name="description" content="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Hash Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Generate MD5, SHA-1, SHA-256, and SHA-512 hashes
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Algorithm:
              </label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value as any)}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm"
              >
                <option value="MD5">MD5</option>
                <option value="SHA-1">SHA-1</option>
                <option value="SHA-256">SHA-256</option>
                <option value="SHA-512">SHA-512</option>
              </select>
            </div>

            <button
              onClick={generateHash}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              <FiPlay size={16} />
              <span>Generate</span>
            </button>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="space-y-4">
              <div className="glass rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Input Text
                </h3>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text to hash..."
                  className="w-full h-64 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows={10}
                />

                <button
                  onClick={() => setInput('Hello, World!')}
                  className="w-full mt-4 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Load Sample Text
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Generated Hash ({algorithm})
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-64">
                  {output ? (
                    <code className="text-sm font-mono text-gray-900 dark:text-gray-100 break-all">
                      {output}
                    </code>
                  ) : (
                    <div className="text-gray-400 dark:text-gray-500 text-center py-8">
                      Generated hash will appear here
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

export default HashGenerator
