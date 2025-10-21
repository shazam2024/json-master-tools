import React, { useState, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay, FiSettings, FiCheck, FiStar, FiZap, FiCode, FiDownload, FiShare2 } from 'react-icons/fi'
import Editor from '@/components/common/Editor'
import toast from 'react-hot-toast'

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [indentSize, setIndentSize] = useState(2)
  const [isProcessing, setIsProcessing] = useState(false)

  const formatJson = useCallback(async () => {
    if (!input.trim()) {
      toast.error('Please enter JSON content to format')
      return
    }

    setIsProcessing(true)

    try {
      // Validate JSON first
      const parsed = JSON.parse(input)

      // Format with specified indentation
      const formatted = JSON.stringify(parsed, null, indentSize)

      setOutput(formatted)
      toast.success('JSON formatted successfully!')
    } catch (error) {
      toast.error('Invalid JSON format')
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsProcessing(false)
    }
  }, [input, indentSize])

  const handleInputChange = (value: string | undefined) => {
    setInput(value || '')
    // Auto-format if input is valid JSON
    if (value && value.trim()) {
      try {
        JSON.parse(value)
        // Debounce the auto-formatting
        setTimeout(() => formatJson(), 500)
      } catch {
        // Invalid JSON, don't auto-format
      }
    }
  }

  const handleCopyOutput = () => {
    toast.success('Output copied to clipboard!')
  }

  const handleDownloadOutput = () => {
    toast.success('Output downloaded!')
  }

  const handleUploadInput = (content: string) => {
    setInput(content)
  }

  const handleReset = () => {
    setInput('')
    setOutput('')
  }

  return (
    <>
      <Helmet>
        <title>Free JSON Formatter Online - Pretty Print JSON | Best JSON Beautifier 2024</title>
        <meta name="description" content="🚀 Best free online JSON formatter and beautifier tool. Pretty print JSON data instantly with syntax highlighting, validation, and customizable indentation. No registration required!" />
        <meta name="keywords" content="json formatter, json beautifier, pretty print json, format json online, json validator, json pretty printer, free json formatter, online json formatter, json editor, json viewer" />
        <link rel="canonical" href="https://json-master-tools.vercel.app/tools/json-formatter" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Free JSON Formatter Online
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Pretty print and beautify your JSON data instantly with our advanced JSON formatter
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-white/20 px-4 py-2 rounded-full">✨ No Registration</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">⚡ Instant Results</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">🔒 100% Free</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">📱 Mobile Friendly</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main Tool */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    JSON Formatter Tool
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Format, validate, and beautify your JSON data with advanced options
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Indentation Setting */}
                  <div className="flex items-center space-x-2">
                    <FiSettings size={16} className="text-gray-500" />
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      Indent:
                    </label>
                    <select
                      value={indentSize}
                      onChange={(e) => setIndentSize(Number(e.target.value))}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm"
                    >
                      <option value={2}>2 spaces</option>
                      <option value={4}>4 spaces</option>
                      <option value={1}>Tabs</option>
                    </select>
                  </div>

                  {/* Format Button */}
                  <button
                    onClick={formatJson}
                    disabled={isProcessing}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:bg-gray-400 text-white rounded-lg transition-all duration-200 font-medium"
                  >
                    <FiPlay size={16} />
                    <span>{isProcessing ? 'Formatting...' : 'Format JSON'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Editor */}
                <div className="space-y-4">
                  <Editor
                    title="Input JSON"
                    value={input}
                    onChange={handleInputChange}
                    language="json"
                    placeholder='Paste your JSON here... Example: {"name": "John", "age": 30, "city": "New York"}'
                    onUpload={handleUploadInput}
                    onReset={handleReset}
                  />

                  {/* Sample Data Button */}
                  <button
                    onClick={() => setInput(JSON.stringify({
                      name: "John Doe",
                      age: 30,
                      email: "john@example.com",
                      address: {
                        street: "123 Main St",
                        city: "New York",
                        country: "USA"
                      },
                      hobbies: ["reading", "coding", "gaming"],
                      active: true
                    }, null, 2))}
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Load Sample JSON Data
                  </button>
                </div>

                {/* Output Editor */}
                <div>
                  <Editor
                    title="Formatted JSON"
                    value={output}
                    onChange={() => {}} // Read-only
                    language="json"
                    readOnly={true}
                    onCopy={handleCopyOutput}
                    onDownload={handleDownloadOutput}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <FiZap className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Instant Formatting
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Format your JSON data instantly with one click. No waiting, no loading times.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <FiCheck className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Syntax Validation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Automatically validates your JSON and shows clear error messages for invalid syntax.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <FiSettings className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Customizable Indentation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose between 2 spaces, 4 spaces, or tabs for your preferred formatting style.
              </p>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Why Choose Our JSON Formatter?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <FiStar className="text-yellow-400 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold mb-2">100% Free Forever</h3>
                  <p className="opacity-90">No hidden costs, no premium features locked behind paywalls. Everything is completely free.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FiCode className="text-blue-400 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold mb-2">Developer Friendly</h3>
                  <p className="opacity-90">Built by developers for developers. Clean interface, keyboard shortcuts, and intuitive design.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FiDownload className="text-green-400 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold mb-2">Export Options</h3>
                  <p className="opacity-90">Copy to clipboard or download formatted JSON files for your projects.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FiShare2 className="text-purple-400 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold mb-2">Share & Collaborate</h3>
                  <p className="opacity-90">Easily share formatted JSON with your team members or use in presentations.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Common Use Cases for JSON Formatter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCode className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">API Development</h3>
                <p className="text-gray-600 dark:text-gray-400">Format API responses and requests for better debugging and documentation.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSettings className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Configuration Files</h3>
                <p className="text-gray-600 dark:text-gray-400">Pretty print configuration files for better readability and maintenance.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiDownload className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data Analysis</h3>
                <p className="text-gray-600 dark:text-gray-400">Format large JSON datasets for analysis and visualization purposes.</p>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              How to Use JSON Formatter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Paste JSON</h3>
                <p className="text-gray-600 dark:text-gray-400">Copy and paste your JSON data into the input field above.</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Choose Format</h3>
                <p className="text-gray-600 dark:text-gray-400">Select your preferred indentation (2 spaces, 4 spaces, or tabs).</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Get Result</h3>
                <p className="text-gray-600 dark:text-gray-400">Click format and get beautifully formatted JSON instantly.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Is this JSON formatter really free?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! Our JSON formatter is completely free to use with no hidden costs or premium features.
                  You can format unlimited JSON data without any registration or payment.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  What is JSON formatting?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  JSON formatting, also known as pretty printing, makes JSON data more readable by adding proper indentation,
                  line breaks, and spacing between elements. This makes it easier for humans to read and understand.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Can I format large JSON files?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Absolutely! Our tool can handle large JSON files efficiently. For extremely large files,
                  we recommend using the download feature to save the formatted output.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Is my JSON data safe and private?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, your privacy is important to us. All JSON processing happens in your browser locally.
                  We don't send your data to any servers, ensuring complete privacy and security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JsonFormatter
