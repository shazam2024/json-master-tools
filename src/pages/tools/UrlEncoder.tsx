import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay } from 'react-icons/fi'
import Editor from '@/components/common/Editor'
import toast from 'react-hot-toast'

const UrlEncoder: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const processUrl = () => {
    if (!input.trim()) {
      toast.error('Please enter content to process')
      return
    }

    try {
      if (mode === 'encode') {
        const encoded = encodeURIComponent(input)
        setOutput(encoded)
        toast.success('URL encoded successfully!')
      } else {
        const decoded = decodeURIComponent(input)
        setOutput(decoded)
        toast.success('URL decoded successfully!')
      }
    } catch (error) {
      toast.error(`Failed to ${mode} URL`)
      setOutput('')
    }
  }

  return (
    <>
      <Helmet>
        <title>URL Encoder/Decoder - JSON Master Tools</title>
        <meta name="description" content="Encode and decode URLs." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              URL Encoder/Decoder
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Encode and decode URLs
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setMode('encode')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  mode === 'encode'
                    ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => setMode('decode')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  mode === 'decode'
                    ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                Decode
              </button>
            </div>

            <button
              onClick={processUrl}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              <FiPlay size={16} />
              <span>{mode === 'encode' ? 'Encode' : 'Decode'}</span>
            </button>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="space-y-4">
              <Editor
                title={`${mode === 'encode' ? 'Plain Text' : 'Encoded URL'}`}
                value={input}
                onChange={(value) => setInput(value || '')}
                language="text"
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter URL to decode...'}
              />

              <button
                onClick={() => setInput(mode === 'encode' ? 'Hello, World! How are you?' : 'Hello%2C%20World%21%20How%20are%20you%3F')}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Load Sample Data
              </button>
            </div>

            <div>
              <Editor
                title={`${mode === 'encode' ? 'Encoded URL' : 'Decoded Text'}`}
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

export default UrlEncoder
