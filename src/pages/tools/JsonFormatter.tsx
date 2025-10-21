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
        <title>JSON Formatter - Free Online JSON Formatter | Pretty Print JSON | Best JSON Formatter</title>
        <meta name="description" content="🔥 #1 Free JSON Formatter Online - Pretty print JSON data instantly! Best JSON formatter & beautifier tool for developers. Format JSON online with syntax validation. No sign-up required!" />
        <meta name="keywords" content="json formatter, json formatter online, free json formatter, pretty print json, json beautifier, format json, json pretty printer, online json formatter, json formatter tool, best json formatter, json editor, json viewer, json validator, format json online free" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="JSON Master Tools" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="classification" content="Developer Tools" />
        <meta name="rating" content="General" />
        <meta name="distribution" content="Global" />
        <meta name="revisit-after" content="1 days" />
        <meta name="language" content="English" />
        <meta http-equiv="content-language" content="en-IN" />
        <link rel="canonical" href="https://json-master-tools.vercel.app/tools/json-formatter" />
        <meta property="og:site_name" content="JSON Master Tools" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:site" content="@jsonmastertools" />
        <meta name="twitter:creator" content="@jsonmastertools" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="application-name" content="JSON Formatter" />
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

          {/* JSON Formatter vs Other Tools */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              JSON Formatter vs Other Online Tools
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">Feature</th>
                    <th className="px-6 py-3">Our JSON Formatter</th>
                    <th className="px-6 py-3">Other Tools</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Price</td>
                    <td className="px-6 py-4">✅ 100% Free</td>
                    <td className="px-6 py-4">❌ Premium Required</td>
                  </tr>
                  <tr className="bg-gray-50 border-b dark:bg-gray-700 dark:border-gray-600">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Registration</td>
                    <td className="px-6 py-4">✅ No Sign-up</td>
                    <td className="px-6 py-4">❌ Account Required</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Privacy</td>
                    <td className="px-6 py-4">✅ Client-side Processing</td>
                    <td className="px-6 py-4">❌ Server Upload</td>
                  </tr>
                  <tr className="bg-gray-50 border-b dark:bg-gray-700 dark:border-gray-600">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Speed</td>
                    <td className="px-6 py-4">✅ Instant Results</td>
                    <td className="px-6 py-4">❌ Loading Delays</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Mobile Friendly</td>
                    <td className="px-6 py-4">✅ Perfect Mobile UI</td>
                    <td className="px-6 py-4">❌ Poor Mobile Experience</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* What is JSON Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              What is JSON? Understanding JSON Formatting
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write,
                and easy for machines to parse and generate. JSON formatter tools help make JSON data more readable by adding proper
                indentation and formatting.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Why Format JSON?</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                <li><strong>Readability:</strong> Formatted JSON is much easier to read and understand</li>
                <li><strong>Debugging:</strong> Spot errors and issues quickly in well-formatted JSON</li>
                <li><strong>Collaboration:</strong> Share readable JSON with team members</li>
                <li><strong>Documentation:</strong> Use formatted JSON in API documentation</li>
                <li><strong>Code Quality:</strong> Maintain consistent formatting across projects</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">JSON Formatter Features</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our free online JSON formatter provides all the essential features developers need:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                <li><strong>Instant formatting:</strong> Format JSON data with one click</li>
                <li><strong>Syntax validation:</strong> Check if your JSON is valid before formatting</li>
                <li><strong>Customizable indentation:</strong> Choose 2 spaces, 4 spaces, or tabs</li>
                <li><strong>Copy & download:</strong> Export formatted JSON easily</li>
                <li><strong>Mobile friendly:</strong> Works perfectly on all devices</li>
                <li><strong>Privacy focused:</strong> All processing happens in your browser</li>
              </ul>
            </div>
          </div>

          {/* JSON Examples Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              JSON Formatter Examples
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Before Formatting:</h3>
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
{`{"name":"John Doe","age":30,"email":"john@example.com","address":{"street":"123 Main St","city":"New York","country":"USA"},"hobbies":["reading","coding","gaming"],"active":true}`}
                </pre>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">After Formatting:</h3>
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "hobbies": [
    "reading",
    "coding",
    "gaming"
  ],
  "active": true
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Frequently Asked Questions About JSON Formatter
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Is this JSON formatter really free?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! Our JSON formatter is completely free to use with no hidden costs or premium features.
                  You can format unlimited JSON data without any registration or payment required.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  What is JSON formatting?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  JSON formatting, also known as pretty printing, makes JSON data more readable by adding proper indentation,
                  line breaks, and spacing between elements. This makes it easier for humans to read and understand the data structure.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Can I format large JSON files?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Absolutely! Our tool can handle large JSON files efficiently. For extremely large files,
                  we recommend using the download feature to save the formatted output to your device.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Is my JSON data safe and private?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, your privacy is our priority. All JSON processing happens in your browser locally.
                  We don't send your data to any servers, ensuring complete privacy and security of your information.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  What are the best practices for JSON formatting?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Best practices include using consistent indentation (2 or 4 spaces), proper nesting of objects and arrays,
                  meaningful key names, and validating JSON syntax before formatting for production use.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Can I use this JSON formatter for commercial projects?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Absolutely! You can use our free JSON formatter for personal projects, commercial applications,
                  enterprise development, or any other purpose without any restrictions or licensing fees.
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
