import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay, FiCopy } from 'react-icons/fi'
import toast from 'react-hot-toast'

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let charset = ''
    if (includeLowercase) charset += lowercase
    if (includeUppercase) charset += uppercase
    if (includeNumbers) charset += numbers
    if (includeSymbols) charset += symbols

    if (!charset) {
      toast.error('Please select at least one character type')
      return
    }

    let generatedPassword = ''
    for (let i = 0; i < length; i++) {
      generatedPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setPassword(generatedPassword)
    toast.success('Password generated!')
  }

  const copyToClipboard = async () => {
    if (!password) {
      toast.error('No password to copy')
      return
    }

    try {
      await navigator.clipboard.writeText(password)
      toast.success('Password copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy password')
    }
  }

  return (
    <>
      <Helmet>
        <title>Password Generator - JSON Master Tools</title>
        <meta name="description" content="Generate secure passwords with customizable options." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Password Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Generate secure passwords with customizable options
            </p>
          </div>

          <button
            onClick={generatePassword}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <FiPlay size={16} />
            <span>Generate</span>
          </button>
        </div>

        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Password Display */}
            <div className="glass rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Generated Password
                </h2>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  <FiCopy size={14} />
                  <span>Copy</span>
                </button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-20 flex items-center">
                {password ? (
                  <code className="text-lg font-mono text-gray-900 dark:text-gray-100 break-all">
                    {password}
                  </code>
                ) : (
                  <div className="text-gray-400 dark:text-gray-500">
                    Click generate to create a password
                  </div>
                )}
              </div>
            </div>

            {/* Settings */}
            <div className="glass rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Password Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Length: {length}
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="50"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeLowercase}
                      onChange={(e) => setIncludeLowercase(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Lowercase (a-z)
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeUppercase}
                      onChange={(e) => setIncludeUppercase(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Uppercase (A-Z)
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeNumbers}
                      onChange={(e) => setIncludeNumbers(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Numbers (0-9)
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeSymbols}
                      onChange={(e) => setIncludeSymbols(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Symbols (!@#$%)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PasswordGenerator
