import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay } from 'react-icons/fi'
import toast from 'react-hot-toast'

const TimestampConverter: React.FC = () => {
  const [timestamp, setTimestamp] = useState('')
  const [humanDate, setHumanDate] = useState('')
  const [mode, setMode] = useState<'to-human' | 'to-timestamp'>('to-human')

  const convertTimestamp = () => {
    if (!timestamp.trim()) {
      toast.error('Please enter a timestamp or date')
      return
    }

    try {
      if (mode === 'to-human') {
        // Convert timestamp to human readable date
        const date = new Date(parseInt(timestamp) * 1000)
        if (isNaN(date.getTime())) {
          throw new Error('Invalid timestamp')
        }
        setHumanDate(date.toLocaleString())
        toast.success('Timestamp converted!')
      } else {
        // Convert human date to timestamp
        const date = new Date(timestamp)
        if (isNaN(date.getTime())) {
          throw new Error('Invalid date format')
        }
        setHumanDate(Math.floor(date.getTime() / 1000).toString())
        toast.success('Date converted to timestamp!')
      }
    } catch (error) {
      toast.error('Invalid input format')
      setHumanDate('')
    }
  }

  return (
    <>
      <Helmet>
        <title>Timestamp Converter - JSON Master Tools</title>
        <meta name="description" content="Convert Unix timestamps to human readable dates and vice versa." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Timestamp Converter
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Convert Unix timestamps to human readable dates and vice versa
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setMode('to-human')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  mode === 'to-human'
                    ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                To Date
              </button>
              <button
                onClick={() => setMode('to-timestamp')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  mode === 'to-timestamp'
                    ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                To Timestamp
              </button>
            </div>

            <button
              onClick={convertTimestamp}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              <FiPlay size={16} />
              <span>Convert</span>
            </button>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="space-y-4">
              <div className="glass rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {mode === 'to-human' ? 'Unix Timestamp' : 'Human Date'}
                </h3>
                <input
                  type={mode === 'to-human' ? 'number' : 'datetime-local'}
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder={mode === 'to-human' ? 'Enter Unix timestamp...' : 'Select date and time...'}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />

                <button
                  onClick={() => {
                    const now = Math.floor(Date.now() / 1000)
                    setTimestamp(mode === 'to-human' ? now.toString() : new Date(now * 1000).toISOString().slice(0, 16))
                  }}
                  className="w-full mt-4 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Use Current Time
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {mode === 'to-human' ? 'Human Readable Date' : 'Unix Timestamp'}
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-32 flex items-center">
                  {humanDate ? (
                    <div className="text-gray-900 dark:text-gray-100">
                      {humanDate}
                    </div>
                  ) : (
                    <div className="text-gray-400 dark:text-gray-500">
                      Converted value will appear here
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

export default TimestampConverter
