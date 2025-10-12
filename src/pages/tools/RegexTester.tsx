import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay } from 'react-icons/fi'
import toast from 'react-hot-toast'

const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('')
  const [text, setText] = useState('')
  const [matches, setMatches] = useState<string[]>([])
  const [isValidRegex, setIsValidRegex] = useState(true)

  const testRegex = () => {
    if (!pattern.trim()) {
      toast.error('Please enter a regex pattern')
      return
    }

    if (!text.trim()) {
      toast.error('Please enter text to test')
      return
    }

    try {
      const regex = new RegExp(pattern, 'g')
      const foundMatches = []
      let match

      while ((match = regex.exec(text)) !== null) {
        foundMatches.push(match[0])
      }

      setMatches(foundMatches)
      setIsValidRegex(true)
      toast.success(`Found ${foundMatches.length} match(es)`)
    } catch (error) {
      setIsValidRegex(false)
      setMatches([])
      toast.error('Invalid regex pattern')
    }
  }

  const highlightMatches = (text: string, pattern: string) => {
    if (!pattern || !isValidRegex) return text

    try {
      const regex = new RegExp(`(${pattern})`, 'g')
      return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>')
    } catch {
      return text
    }
  }

  return (
    <>
      <Helmet>
        <title>Regex Tester - JSON Master Tools</title>
        <meta name="description" content="Test regular expressions with visual explanation." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Regex Tester
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Test regular expressions with visual explanation
            </p>
          </div>

          <button
            onClick={testRegex}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <FiPlay size={16} />
            <span>Test</span>
          </button>
        </div>

        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Pattern Input */}
            <div className="glass rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Regular Expression Pattern
              </h2>
              <div className="space-y-2">
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="Enter regex pattern (e.g., \d+, [a-zA-Z]+, \w+@\w+\.\w+)"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {!isValidRegex && pattern && (
                  <p className="text-red-500 text-sm">Invalid regex pattern</p>
                )}
              </div>
            </div>

            {/* Text Input */}
            <div className="glass rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Test Text
              </h2>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to test your regex pattern against..."
                className="w-full h-32 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows={5}
              />

              <button
                onClick={() => setText("Hello world! My email is john@example.com and I have 123 items.")}
                className="w-full mt-4 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Load Sample Text
              </button>
            </div>

            {/* Results */}
            <div className="glass rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Results
              </h2>

              {matches.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Found {matches.length} match{matches.length !== 1 ? 'es' : ''}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {matches.map((match, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded text-sm"
                      >
                        "{match}"
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-32">
                {text && pattern ? (
                  <div
                    className="text-gray-900 dark:text-gray-100"
                    dangerouslySetInnerHTML={{
                      __html: highlightMatches(text, pattern)
                    }}
                  />
                ) : (
                  <div className="text-gray-400 dark:text-gray-500">
                    Enter a pattern and text to see highlighted matches
                  </div>
                )}
              </div>
            </div>

            {/* Common Patterns */}
            <div className="glass rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Common Regex Patterns
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Email:</span>
                    <button
                      onClick={() => setPattern('\\w+@\\w+\\.\\w+')}
                      className="text-primary-500 hover:text-primary-600"
                    >
                      Use
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                    <button
                      onClick={() => setPattern('\\d{3}-\\d{3}-\\d{4}')}
                      className="text-primary-500 hover:text-primary-600"
                    >
                      Use
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">URL:</span>
                    <button
                      onClick={() => setPattern('https?://\\w+\\.\\w+')}
                      className="text-primary-500 hover:text-primary-600"
                    >
                      Use
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Numbers:</span>
                    <button
                      onClick={() => setPattern('\\d+')}
                      className="text-primary-500 hover:text-primary-600"
                    >
                      Use
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Words:</span>
                    <button
                      onClick={() => setPattern('\\w+')}
                      className="text-primary-500 hover:text-primary-600"
                    >
                      Use
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Whitespace:</span>
                    <button
                      onClick={() => setPattern('\\s+')}
                      className="text-primary-500 hover:text-primary-600"
                    >
                      Use
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegexTester
