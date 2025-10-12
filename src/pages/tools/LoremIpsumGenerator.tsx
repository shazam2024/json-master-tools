import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay, FiCopy } from 'react-icons/fi'
import toast from 'react-hot-toast'

const LoremIpsumGenerator: React.FC = () => {
  const [output, setOutput] = useState('')
  const [paragraphs, setParagraphs] = useState(3)
  const [words, setWords] = useState(0)

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea',
    'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit',
    'voluptate', 'velit', 'esse', 'cillum', 'eu', 'fugiat', 'nulla', 'pariatur',
    'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt',
    'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ]

  const generateLoremIpsum = () => {
    let result = ''

    if (words > 0) {
      // Generate specific number of words
      for (let i = 0; i < words; i++) {
        const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)]
        result += (i === 0 ? randomWord.charAt(0).toUpperCase() + randomWord.slice(1) : randomWord)
        result += (i < words - 1) ? ' ' : '.'
      }
    } else {
      // Generate paragraphs
      for (let p = 0; p < paragraphs; p++) {
        const paragraphLength = Math.floor(Math.random() * 50) + 30 // 30-80 words per paragraph
        for (let i = 0; i < paragraphLength; i++) {
          const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)]
          result += (p === 0 && i === 0 ? randomWord.charAt(0).toUpperCase() + randomWord.slice(1) : randomWord)
          result += ' '
        }
        result += '\n\n'
      }
    }

    setOutput(result.trim())
    toast.success('Lorem ipsum generated!')
  }

  const copyToClipboard = async () => {
    if (!output) {
      toast.error('No text to copy')
      return
    }

    try {
      await navigator.clipboard.writeText(output)
      toast.success('Text copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy text')
    }
  }

  return (
    <>
      <Helmet>
        <title>Lorem Ipsum Generator - JSON Master Tools</title>
        <meta name="description" content="Generate placeholder text for your designs and documents." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Lorem Ipsum Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Generate placeholder text for your designs and documents
            </p>
          </div>

          <button
            onClick={generateLoremIpsum}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <FiPlay size={16} />
            <span>Generate</span>
          </button>
        </div>

        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Settings */}
            <div className="glass rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Generation Settings
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Paragraphs: {paragraphs}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={paragraphs}
                    onChange={(e) => setParagraphs(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Or specific words:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={words}
                    onChange={(e) => setWords(parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="w-20 px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Output */}
            <div className="glass rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Generated Text
                </h2>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  <FiCopy size={14} />
                  <span>Copy</span>
                </button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-64">
                {output ? (
                  <div className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                    {output}
                  </div>
                ) : (
                  <div className="text-gray-400 dark:text-gray-500 text-center py-8">
                    Generated text will appear here
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

export default LoremIpsumGenerator
