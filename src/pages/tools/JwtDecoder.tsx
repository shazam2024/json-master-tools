import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay } from 'react-icons/fi'
import Editor from '@/components/common/Editor'
import toast from 'react-hot-toast'

const JwtDecoder: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const decodeJwt = () => {
    if (!input.trim()) {
      toast.error('Please enter a JWT token')
      return
    }

    try {
      const parts = input.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format')
      }

      // Decode header
      const header = JSON.parse(atob(parts[0]))

      // Decode payload
      const payload = JSON.parse(atob(parts[1]))

      const result = {
        header,
        payload,
        signature: parts[2],
        decoded: {
          header: JSON.stringify(header, null, 2),
          payload: JSON.stringify(payload, null, 2)
        }
      }

      setOutput(JSON.stringify(result, null, 2))
      toast.success('JWT decoded successfully!')
    } catch (error) {
      toast.error('Invalid JWT token')
      setOutput('')
    }
  }

  return (
    <>
      <Helmet>
        <title>JWT Decoder - JSON Master Tools</title>
        <meta name="description" content="Decode and analyze JWT tokens." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              JWT Decoder
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Decode and analyze JWT tokens
            </p>
          </div>

          <button
            onClick={decodeJwt}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <FiPlay size={16} />
            <span>Decode</span>
          </button>
        </div>

        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="space-y-4">
              <Editor
                title="JWT Token"
                value={input}
                onChange={(value) => setInput(value || '')}
                language="text"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              />

              <button
                onClick={() => setInput('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Load Sample Token
              </button>
            </div>

            <div>
              <Editor
                title="Decoded JWT"
                value={output}
                onChange={() => {}}
                language="json"
                readOnly={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JwtDecoder
